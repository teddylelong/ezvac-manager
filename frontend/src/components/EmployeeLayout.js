import React from "react";
import EmployeeList from "./EmployeeList";

const EmployeeLayout = ({ children }) => {
  return (
    <div className="flex dark:bg-gray-800">
      <div className="w-1/4 p-4 border-r dark:border-gray-700">
        <EmployeeList />
      </div>
      <div className="w-3/4 p-4">{children}</div>
    </div>
  );
};

export default EmployeeLayout;
