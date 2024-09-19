import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Dropdown from "../common/Dropdown";
import DraggableItem from "../common/DraggableItem";

const EmployeeItem = ({ employee, editEmployee, handleDeleteEmployee }) => {
  return (
    <DraggableItem
      type="employee"
      item={{ id: employee._id, employee }}
      className={`employee-list-item flex mb-4 p-4 rounded-md shadow-md ${employee.color}`}
    >
      <div className="w-2/3">
        {employee.lastName} {employee.firstName}
      </div>
      <div className="w-1/3 text-end">
        <Dropdown
          options={[
            { label: "Edit", onClick: () => editEmployee(employee._id) },
            {
              label: "Delete",
              onClick: () => handleDeleteEmployee(employee._id),
              danger: true,
            },
          ]}
        />
      </div>
    </DraggableItem>
  );
};

export default EmployeeItem;
