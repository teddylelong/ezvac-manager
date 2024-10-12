import React from "react";
import { useDrop } from "react-dnd";
import EmployeeLeaveItem from "./EmployeeLeaveItem";
import {
  getWeek,
  addHours,
  addDays,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";
import Label from "../common/Label";
import apis from "../../services/api";

const WeekRow = ({
  weekStart,
  employeesWithLeaves,
  editLeave,
  handleDeleteLeave,
  handleDropLeave,
  handleDropEmployee,
  isEven,
  excludedDateIntervals,
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

  const weekRange = {
    start: startOfWeek(weekStart, { weekStartsOn: 1 }),
    end: endOfWeek(weekStart, { weekStartsOn: 1 }),
  };

  const isExcludedWeek = excludedDateIntervals.some(
    (interval) =>
      isWithinInterval(weekRange.start, {
        start: new Date(interval.startDate),
        end: new Date(interval.endDate),
      }) ||
      isWithinInterval(weekRange.end, {
        start: new Date(interval.startDate),
        end: new Date(interval.endDate),
      })
  );

  const handleSaveComment = async (leaveId, comment) => {
    try {
      const leaveToUpdate = employeesWithLeaves.find(
        (l) => l.leave._id === leaveId
      );

      if (
        !leaveToUpdate ||
        !leaveToUpdate.leave ||
        !leaveToUpdate.leave.employee._id
      ) {
        console.error("Invalid Employee ID");
        return;
      }

      await apis.updateLeave(leaveId, {
        employee: leaveToUpdate.leave.employee._id,
        startDate: leaveToUpdate.leave.startDate,
        endDate: leaveToUpdate.leave.endDate,
        comment: comment,
      });
    } catch (error) {
      console.error("Error while saving comment :", error);
    }
  };

  return (
    <>
      {/* Week Column */}
      <div
        className={`week-number min-h-24 col-span-1 flex flex-none items-center p-4 border-b border-gray-200 dark:border-gray-600 ${
          isOver ? "bg-sky-100 dark:bg-blue-900" : ""
        } ${
          isEven ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
        } transition-colors duration-200 ease-in-out`}
      >
        <Label
          variant={isExcludedWeek ? "primary" : "secondary"}
          label={getWeek(weekStart)}
          className="text-base shadow-sm w-10 text-center"
        />
      </div>

      {/* Employee Column */}
      <div
        ref={drop}
        className={`employee-names min-h-24 col-span-11 flex flex-none p-4 border-b border-gray-200 dark:border-gray-600 ${
          isOver ? "bg-sky-100 dark:bg-blue-900" : ""
        } ${
          isEven ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
        } transition-colors duration-200 ease-in-out`}
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
                  onSaveComment={handleSaveComment}
                />
              )
            )}
        </div>
      </div>
    </>
  );
};

export default WeekRow;
