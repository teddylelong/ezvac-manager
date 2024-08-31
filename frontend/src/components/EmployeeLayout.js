import React from "react";
import EmployeeList from "./EmployeeList";

const EmployeeLayout = ({ children }) => {
  return (
    <div
      className="flex dark:bg-gray-800"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="w-1/4 border-r dark:border-gray-700 overflow-y-auto">
        <EmployeeList />
      </div>
      <div className="w-3/4 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default EmployeeLayout;
