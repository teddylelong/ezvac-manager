import React from "react";
import Dropdown from "../common/Dropdown";

const EmployeeLeaveItem = ({
  employee,
  leaveDays,
  leaveDateToStr,
  editLeave,
  deleteLeave,
}) => (
  <div className={`mr-4 shadow-md rounded flex self-start ${employee.color}`}>
    <div className="p-2">
      <div>
        <span>
          {employee.firstName} {employee.lastName}
        </span>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
          {leaveDays} day{leaveDays > 1 ? "s" : ""}
        </span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        {leaveDateToStr}
      </div>
    </div>
    <div className="self-start">
      <Dropdown
        options={[
          { label: "Edit", onClick: editLeave },
          { label: "Delete", onClick: deleteLeave, danger: true },
        ]}
      />
    </div>
  </div>
);

export default EmployeeLeaveItem;
