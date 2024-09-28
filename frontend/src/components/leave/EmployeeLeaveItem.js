import React from "react";
import Dropdown from "../common/Dropdown";
import DraggableItem from "../common/DraggableItem";
import { useDrag } from "react-dnd";

const EmployeeLeaveItem = React.forwardRef(
  (
    { employee, leave, editLeave, deleteLeave, leaveDays, leaveDateToStr },
    ref
  ) => {
    const [{ isDragging }, drag] = useDrag({
      type: "leave",
      item: { id: leave._id, leave },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <DraggableItem
        ref={drag(ref)}
        type="leave"
        item={{ id: leave._id, leave }}
        className={`shadow-md rounded flex self-start ${employee.color}`}
      >
        <div className="p-2">
          <div>
            <span>
              {employee.lastName} {employee.firstName}
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
      </DraggableItem>
    );
  }
);

export default EmployeeLeaveItem;
