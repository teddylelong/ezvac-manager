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
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import apis from "../services/api.js";
import Button from "./common/Button.js";
import Modal from "./common/Modal";
import LeaveForm from "./LeaveForm.js";
import Dropdown from "./common/Dropdown.js";

const LeaveOverview = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [weeks, setWeeks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      .map((leave) => ({
        employee: leave.employee,
        leave: leave,
        leaveDateToStr:
          new Date(leave.startDate).toLocaleDateString() ===
          new Date(leave.endDate).toLocaleDateString()
            ? new Date(leave.startDate).toLocaleDateString()
            : new Date(leave.startDate).toLocaleDateString() +
              " - " +
              new Date(leave.endDate).toLocaleDateString(),
      }));
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

  const addLeave = () => {
    setSelectedLeave(null);
    setIsModalOpen(true);
  };

  const editLeave = (leaveId) => {
    const leave = leaves.find((l) => l._id === leaveId);
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleDeleteLeave = async (leaveId) => {
    try {
      await apis.deleteLeave(leaveId);
      fetchLeaves();
    } catch (error) {
      console.error("Failed to delete leave", error);
    }
  };

  const handleSaveLeave = async (leaveData) => {
    try {
      selectedLeave
        ? await apis.updateLeave(selectedLeave._id, leaveData)
        : await apis.createLeave(leaveData);
      fetchLeaves();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save leave", error);
    }
  };

  return (
    <div className="leave-overview">
      {/* Header */}
      <div className="flex items-center mb-4 text-xl font-bold dark:text-gray-200">
        <h2>Leaves Overview</h2>
        <Button
          onClick={addLeave}
          variant="transparent"
          size="sm"
          label={<FontAwesomeIcon icon={faCalendarPlus} />}
          title="Add new leave"
        />
      </div>
      {/* Action Menu */}
      <div className="flex justify-between dark:text-gray-200 pb-4 dark:border-gray-600">
        {/* Date select */}
        <div className="input-group">
          <Button
            onClick={handlePrevMonth}
            className="btn btn-secondary rounded-l"
            label={<FontAwesomeIcon icon={faChevronLeft} />}
          ></Button>
          <select
            className="w-32"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={`month-${i}`} value={i}>
                {new Date(year, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <Button
            onClick={handleNextMonth}
            className="btn btn-secondary rounded-r"
            label={<FontAwesomeIcon icon={faChevronRight} />}
          ></Button>
        </div>
        {/* Year select */}
        <div>
          <select
            value={year}
            className="rounded-md"
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={`year-${i}`} value={currentYear - 5 + i}>
                {currentYear - 5 + i}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Overview */}
      <div className="weeks-container flex dark:text-gray-200">
        {/* Weeks Column */}
        <div className="weeks-column w-1/5">
          <div className="weeks-header font-bold p-2 bg-gray-200 border-y border-gray-200 rounded-l-md dark:bg-gray-700 dark:border-gray-600">
            Week
          </div>
          {weeks.map((weekStart, i) => (
            <div
              key={`week-${i}`}
              className="week-number p-4 border-b border-gray-200 dark:border-gray-600"
            >
              {getWeek(weekStart)}
            </div>
          ))}
        </div>
        {/* Employee Column */}
        <div className="employees-column w-4/5">
          <div className="employees-header font-bold p-2 bg-gray-200 border-y border-gray-200 rounded-r-md dark:bg-gray-700 dark:border-gray-600">
            Employees
          </div>
          {weeks.map((weekStart, i) => {
            const employeesWithLeaves = getEmployeesForWeek(weekStart);

            return (
              <div
                key={`employee-${i}`}
                className="employee-names flex p-2 border-b border-gray-200  dark:border-gray-600"
              >
                {employeesWithLeaves.length > 0 ? (
                  employeesWithLeaves.map(
                    ({ employee, leave, leaveDateToStr }) => (
                      <div
                        className="flex mr-2 rounded bg-gray-200 dark:bg-gray-700"
                        key={`leave-${leave._id}`}
                      >
                        <div className="p-2">
                          <span>
                            {employee.firstName} {employee.lastName}
                          </span>
                          <span className="ml-2 text-gray-500 dark:text-gray-400">
                            ({leaveDateToStr})
                          </span>
                        </div>
                        <div className="self-center">
                          <Dropdown
                            options={[
                              {
                                label: "Edit",
                                onClick: () => editLeave(leave._id),
                              },
                              {
                                label: "Delete",
                                onClick: () => handleDeleteLeave(leave._id),
                                danger: true,
                              },
                            ]}
                          />
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="no-employees p-2">&nbsp;</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={selectedLeave ? "Edit Leave" : "Add New Leave"}
        onClose={() => setIsModalOpen(false)}
      >
        <LeaveForm
          onSave={handleSaveLeave}
          onClose={() => setIsModalOpen(false)}
          leave={selectedLeave}
        />
      </Modal>
    </div>
  );
};

export default LeaveOverview;
