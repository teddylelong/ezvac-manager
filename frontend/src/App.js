import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ActionMenu from "./components/ActionMenu";
import LeaveCalendar from "./components/LeaveCalendar";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <Router>
      <div className="text-gray-800">
        <ActionMenu toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<LeaveCalendar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
