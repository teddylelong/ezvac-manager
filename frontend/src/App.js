import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ActionMenu from "./components/ActionMenu";
import LeaveCalendar from "./components/leave/LeaveCalendar";
import SettingsOverview from "./components/settings/SettingsOverview";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // État pour la sidebar

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <div className="text-gray-800">
        <ActionMenu
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          toggleSidebar={toggleSidebar}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isCollapsed={isCollapsed}
                toggleSidebar={toggleSidebar}
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <LeaveCalendar
                isCollapsed={isCollapsed}
                toggleSidebar={toggleSidebar}
              />
            }
          />
          <Route
            path="/settings"
            element={<SettingsOverview></SettingsOverview>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
