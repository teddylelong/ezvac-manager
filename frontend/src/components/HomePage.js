import React from "react";
import EmployeeList from "./EmployeeList";
import LeaveCalendar from "./LeaveCalendar";

const HomePage = () => {
  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold">Employees</h2>
        <EmployeeList />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold">Leave Calendar</h2>
        <LeaveCalendar />
      </div>
    </div>
  );
};

export default HomePage;
