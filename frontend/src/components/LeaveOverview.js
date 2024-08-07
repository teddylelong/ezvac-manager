import React, { useState, useEffect } from "react";
import {
  getWeeksInMonth,
  getWeek,
  startOfWeek,
  endOfWeek,
  eachWeekOfInterval,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import apis from "../services/api.js";

const LeaveOverview = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [weeks, setWeeks] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    updateWeeks();
    fetchLeaves();
  }, [year, month]);

  const updateWeeks = () => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const weeksInMonth = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 }
    );
    setWeeks(weeksInMonth);
  };

  const fetchLeaves = async () => {
    const response = await apis.getLeaves();
    setLeaves(response.data);
  };

  const getEmployeesForWeek = (weekStart) => {
    return leaves
      .filter((leave) => {
        const leaveStart = new Date(leave.startDate);
        const leaveEnd = new Date(leave.endDate);
        return (
          leaveStart <= endOfWeek(weekStart, { weekStartsOn: 1 }) &&
          leaveEnd >= startOfWeek(weekStart, { weekStartsOn: 1 })
        );
      })
      .map((leave) => leave.employee);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="leave-overview">
      <div className="header flex justify-between dark:text-gray-200 p-4 border-b border-gray-200 dark:border-gray-600">
        <div class="input-group">
          <button
            className="btn btn-secondary rounded-l"
            onClick={handlePrevMonth}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <select
            className="w-32"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(year, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <button
            className="btn btn-secondary rounded-r"
            onClick={handleNextMonth}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={i} value={currentYear - 5 + i}>
                {currentYear - 5 + i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="weeks-container flex dark:text-gray-200">
        <div className="weeks-column w-1/5">
          <div className="weeks-header font-bold p-2 bg-gray-200 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            Week
          </div>
          {weeks.map((weekStart, i) => (
            <div
              key={i}
              className="week-number p-2 border-b border-gray-200 dark:border-gray-600"
            >
              {getWeek(weekStart)}
            </div>
          ))}
        </div>
        <div className="employees-column w-4/5">
          <div className="employees-header font-bold p-2 bg-gray-200 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            Employees
          </div>
          {weeks.map((weekStart, i) => {
            const employees = getEmployeesForWeek(weekStart);
            return (
              <div
                key={i}
                className="employee-names p-2 border-b border-gray-200 dark:border-gray-600"
              >
                {employees.length > 0 ? (
                  employees.map((employee, j) => (
                    <div key={j}>
                      {employee.firstName} {employee.lastName}
                    </div>
                  ))
                ) : (
                  <div className="no-employees">&nbsp;</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaveOverview;
