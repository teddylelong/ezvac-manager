import React from "react";
import Dropdown from "../common/Dropdown";
import { useDrag } from "react-dnd";

const EmployeeLeaveItem = ({
  employee,
  leave,
  leaveDays,
  leaveDateToStr,
  editLeave,
  deleteLeave,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "leave",
    item: { id: leave._id, leave },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`mr-4 shadow-md rounded flex self-start ${employee.color} ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="p-2 cursor-grab">
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
};

export default EmployeeLeaveItem;
