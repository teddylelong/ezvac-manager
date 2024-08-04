import React from "react";
import EmployeeList from "./EmployeeList";
import LeaveCalendar from "./LeaveCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar } from "@fortawesome/free-regular-svg-icons";

const HomePage = () => {
  return (
    <div className="flex dark:bg-gray-800">
      <div className="w-1/4 p-4 border-r dark:border-gray-700">
        <h2 className="mb-4 text-xl font-bold dark:text-gray-200">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Employees
        </h2>
        <EmployeeList />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="mb-4 text-xl font-bold dark:text-gray-200">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          Leave Calendar
        </h2>
        <LeaveCalendar />
      </div>
    </div>
  );
};

export default HomePage;
