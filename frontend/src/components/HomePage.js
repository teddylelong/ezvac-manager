import React from "react";
import EmployeeList from "./EmployeeList.js";
import LeaveCalendar from "./LeaveCalendar.js";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="employee-list">
        <EmployeeList />
      </div>
      <div className="leave-calendar">
        <LeaveCalendar />
      </div>
    </div>
  );
};

export default HomePage;
