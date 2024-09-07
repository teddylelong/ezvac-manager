import React from "react";
import { useDrop } from "react-dnd";
import EmployeeLeaveItem from "./EmployeeLeaveItem";
import { getWeek } from "date-fns";

const WeekRow = ({
  weekStart,
  employeesWithLeaves,
  editLeave,
  handleDeleteLeave,
  handleDropLeave,
  isEven,
}) => {
  const [, drop] = useDrop({
    accept: "leave",
    drop: (item) => handleDropLeave(item.leave, weekStart),
  });

  return (
    <>
      {/* Week Column */}
      <div
        className={`week-number col-span-1 flex items-center p-4 border-b border-gray-200 dark:border-gray-600 ${
          isEven ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
        }`}
      >
        {getWeek(weekStart)}
      </div>

      {/* Employee Column */}
      <div
        ref={drop}
        className={`employee-names col-span-11 p-4 border-b border-gray-200 dark:border-gray-600 ${
          isEven ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
        }`}
      >
        {employeesWithLeaves.length > 0 ? (
          <div className="flex flex-wrap">
            {employeesWithLeaves.map(
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
        ) : (
          <div className="no-employees p-2">&nbsp;</div>
        )}
      </div>
    </>
  );
};

export default WeekRow;
