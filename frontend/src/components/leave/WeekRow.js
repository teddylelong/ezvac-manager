import React from "react";
import { useDrop } from "react-dnd";
import EmployeeLeaveItem from "./EmployeeLeaveItem";
import { getWeek, addHours, addDays } from "date-fns";
import Label from "../common/Label";

const WeekRow = ({
  weekStart,
  employeesWithLeaves,
  editLeave,
  handleDeleteLeave,
  handleDropLeave,
  handleDropEmployee,
  isEven,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ["leave", "employee"],
    drop: (item) => {
      if (item.leave) {
        handleDropLeave(item.leave, weekStart);
      } else if (item.employee) {
        const newLeave = {
          employee: item.employee,
          startDate: addHours(weekStart, 9), // Start Monday at 9:00
          endDate: addHours(addDays(weekStart, 4), 18), // End Friday at 18:00
        };
        handleDropEmployee(newLeave);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <>
      {/* Week Column */}
      <div
        className={`week-number min-h-24 col-span-1 flex flex-none items-center p-4 border-b border-gray-200 dark:border-gray-600 ${
          isEven ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
        }`}
      >
        <Label
          variant="secondary"
          label={getWeek(weekStart)}
          className="text-base shadow-sm w-10 text-center"
        />
      </div>

      {/* Employee Column */}
      <div
        ref={drop}
        className={`employee-names min-h-24 col-span-11 flex flex-none p-4 border-b border-gray-200 dark:border-gray-600 ${
          isEven ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
        }`}
      >
        <div className="flex flex-wrap gap-4">
          {employeesWithLeaves.length > 0 &&
            employeesWithLeaves.map(
              ({ employee, leave, leaveDays, leaveDateToStr }) => (
                <EmployeeLeaveItem
                  key={leave._id}
                  employee={employee}
                  leave={leave}
                  leaveDays={leaveDays}
                  leaveDateToStr={leaveDateToStr}
                  editLeave={() => editLeave(leave._id)}
                  deleteLeave={() => handleDeleteLeave(leave._id)}
                />
              )
            )}
        </div>
      </div>
    </>
  );
};

export default WeekRow;
