import React, { useState, useEffect } from "react";
import {
  getWeeksInMonth,
  getWeek,
  startOfWeek,
  endOfWeek,
  eachWeekOfInterval,
} from "date-fns";
import apis from "../services/api.js";
import "./LeaveOverview.css";

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

  return (
    <div className="leave-overview">
      <div className="header">
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(year, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
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
      <div className="weeks-container">
        <div className="weeks-column">
          <div className="weeks-header">Week</div>
          {weeks.map((weekStart, i) => (
            <div key={i} className="week-number">
              {getWeek(weekStart)}
            </div>
          ))}
        </div>
        <div className="employees-column">
          <div className="employees-header">Employees</div>
          {weeks.map((weekStart, i) => {
            const employees = getEmployeesForWeek(weekStart);
            return (
              <div key={i} className="employee-names">
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
