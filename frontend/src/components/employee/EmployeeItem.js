import React from "react";
import { useDrag } from "react-dnd";
import Dropdown from "../common/Dropdown";

const EmployeeItem = ({ employee, editEmployee, handleDeleteEmployee }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "employee",
    item: { id: employee._id, employee },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      className={`employee-list-item flex mb-4 p-4 rounded-md shadow-md ${
        employee.color
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
      ref={drag}
    >
      <div className="w-2/3">
        {employee.lastName} {employee.firstName}
      </div>
      <div className="w-1/3 text-end">
        <Dropdown
          options={[
            {
              label: "Edit",
              onClick: () => editEmployee(employee._id),
            },
            {
              label: "Delete",
              onClick: () => handleDeleteEmployee(employee._id),
              danger: true,
            },
          ]}
        />
      </div>
    </li>
  );
};

export default EmployeeItem;
