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
import ToggleSwitch from "./common/ToggleSwitch";

const LeaveOverview = ({ leaves, fetchLeaves }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [viewMode, setViewMode] = useState("month");
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [weeks, setWeeks] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLeaves();
    updateWeeks();
  }, [viewMode, year, month]);

  const handleToggleChange = () => {
    setViewMode(viewMode === "month" ? "year" : "month");
  };

  const updateWeeks = () => {
    let startDate, endDate;

    if (viewMode === "year") {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    } else {
      startDate = new Date(year, month, 1);
      endDate = new Date(year, month + 1, 0);
    }

    const weeksInInterval = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 }
    );
    setWeeks(weeksInInterval);
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
        leaveDays: countLeaveDays(leave.startDate, leave.endDate),
        leaveDateToStr:
          new Date(leave.startDate).toLocaleDateString() ===
          new Date(leave.endDate).toLocaleDateString()
            ? new Date(leave.startDate).toLocaleDateString()
            : new Date(leave.startDate).toLocaleDateString() +
              " - " +
              new Date(leave.endDate).toLocaleDateString(),
      }));
  };

  const countLeaveDays = (date1, date2) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
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
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800">
        <div className="flex items-center p-4 text-xl font-bold dark:text-gray-200">
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
        <div className="flex justify-between px-4 dark:text-gray-200 dark:border-gray-600">
          {/* Date select */}
          <div className="input-group">
            {/* Prev */}
            <Button
              onClick={handlePrevMonth}
              className="btn btn-secondary rounded-l"
              label={<FontAwesomeIcon icon={faChevronLeft} />}
              disabled={viewMode === "year"}
            ></Button>

            {/* Month */}
            <select
              className="w-32"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value, 10))}
              disabled={viewMode === "year"}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={`month-${i}`} value={i}>
                  {new Date(year, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>

            {/* Next */}
            <Button
              onClick={handleNextMonth}
              className="btn btn-secondary rounded-r"
              label={<FontAwesomeIcon icon={faChevronRight} />}
              disabled={viewMode === "year"}
            ></Button>

            {/* Year */}
            <select
              value={year}
              className="ml-4 rounded-md"
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={`year-${i}`} value={currentYear - 5 + i}>
                  {currentYear - 5 + i}
                </option>
              ))}
            </select>
          </div>

          {/* ViewMode select */}
          <div className="input-group">
            <div className="flex items-center">
              <ToggleSwitch
                checked={viewMode === "year"}
                onChange={handleToggleChange}
                labelOn="Yearly"
                labelOff="Monthly"
              />
            </div>
          </div>
        </div>

        {/* Colums Header */}
        <div className="px-4 flex mt-4 dark:text-gray-200">
          <div className="weeks-column w-1/12">
            <div className="weeks-header font-bold p-2 bg-gray-200 border-y border-gray-200 rounded-l-md dark:bg-gray-700 dark:border-gray-600">
              Week
            </div>
          </div>
          <div className="employees-column w-11/12">
            <div className="employees-header font-bold p-2 bg-gray-200 border-y border-gray-200 rounded-r-md dark:bg-gray-700 dark:border-gray-600">
              Employees
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="weeks-container grid grid-cols-12 gap-0 px-4 dark:text-gray-200">
        {/* Weeks and Employees Container */}
        {weeks.map((weekStart, i) => {
          const employeesWithLeaves = getEmployeesForWeek(weekStart);

          return (
            <React.Fragment key={`row-${i}`}>
              {/* Week Column */}
              <div className="week-number col-span-1 flex items-center p-4 border-b border-gray-200 dark:border-gray-600">
                {getWeek(weekStart)}
              </div>

              {/* Employee Column */}
              <div className="employee-names col-span-11 p-4 border-b border-gray-200 dark:border-gray-600">
                {employeesWithLeaves.length > 0 ? (
                  <div className="flex flex-wrap">
                    {employeesWithLeaves.map(
                      ({ employee, leave, leaveDays, leaveDateToStr }) => (
                        <div
                          className="mr-4 shadow-md rounded bg-gray-200 dark:bg-gray-700 flex self-start"
                          key={`leave-${leave._id}`}
                        >
                          <div className="p-2">
                            <div>
                              <span>
                                {employee.firstName} {employee.lastName}
                              </span>
                              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                {leaveDays} day{leaveDays > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {leaveDateToStr}
                            </div>
                          </div>
                          <div className="self-start">
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
                    )}
                  </div>
                ) : (
                  <div className="no-employees p-2">&nbsp;</div>
                )}
              </div>
            </React.Fragment>
          );
        })}
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
