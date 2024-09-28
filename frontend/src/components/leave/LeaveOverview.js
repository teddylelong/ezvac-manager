import React, { useState, useEffect } from "react";
import { eachWeekOfInterval, startOfWeek, endOfWeek, addDays } from "date-fns";
import apis from "../../services/api";
import LeaveHeader from "./LeaveHeader";
import WeekNavigation from "./WeekNavigation";
import WeekRow from "./WeekRow";
import Modal from "../common/Modal";
import LeaveForm from "./LeaveForm";
import { countLeaveDays } from "../../helpers/leave";

const LeaveOverview = ({ leaves, fetchLeaves }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [viewMode, setViewMode] = useState("month");
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [weeks, setWeeks] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excludedDates, setExcludedDates] = useState([]);
  const [excludedDateIntervals, setExcludedDateIntervals] = useState([]);

  // Fetch excluded dates once based on the year
  useEffect(() => {
    const fetchExcludedDates = async () => {
      try {
        const response = await apis.getSettingsByYear(year);
        const settings = response.data;
        const excludedDates = settings.excludedDates || [];
        const excludedDateIntervals = settings.excludedDateIntervals || [];
        setExcludedDates(excludedDates);
        setExcludedDateIntervals(excludedDateIntervals);
      } catch (error) {
        console.error("Failed to fetch excluded dates", error);
      }
    };

    fetchExcludedDates();
  }, [year]);

  useEffect(() => {
    fetchLeaves();
    updateWeeks();
  }, [viewMode, year, month]);

  const handleToggleChange = () => {
    setViewMode(viewMode === "month" ? "year" : "month");
  };

  const updateWeeks = () => {
    const startDate =
      viewMode === "year" ? new Date(year, 0, 1) : new Date(year, month, 1);
    const endDate =
      viewMode === "year"
        ? new Date(year, 11, 31)
        : new Date(year, month + 1, 0);
    const weeksInInterval = eachWeekOfInterval(
      { start: startDate, end: endDate },
      { weekStartsOn: 1 }
    );
    setWeeks(weeksInInterval);
  };

  const handleDropLeave = async (leave, newWeekStart) => {
    const oldWeekStart = startOfWeek(new Date(leave.startDate), {
      weekStartsOn: 1,
    });

    const dayDifference =
      new Date(newWeekStart).getTime() - oldWeekStart.getTime();

    const weekDifferenceInDays = Math.floor(dayDifference / (1000 * 3600 * 24));

    const newStartDate = addDays(
      new Date(leave.startDate),
      weekDifferenceInDays
    );
    const newEndDate = addDays(new Date(leave.endDate), weekDifferenceInDays);

    const updatedLeave = {
      ...leave,
      startDate: newStartDate,
      endDate: newEndDate,
      employee: leave.employee._id,
    };

    try {
      await apis.updateLeave(leave._id, updatedLeave);
      fetchLeaves();
    } catch (error) {
      console.error("Failed to update leave", error);
    }
  };

  const handleDropEmployee = async (newLeave) => {
    try {
      await apis.createLeave({
        employee: newLeave.employee._id,
        startDate: newLeave.startDate,
        endDate: newLeave.endDate,
      });
      fetchLeaves();
    } catch (error) {
      console.error("Failed to create leave", error);
    }
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
        leave,
        leaveDays: countLeaveDays(
          leave.startDate,
          leave.endDate,
          excludedDates
        ),
        leaveDateToStr:
          new Date(leave.startDate).toLocaleDateString() ===
          new Date(leave.endDate).toLocaleDateString()
            ? new Date(leave.startDate).toLocaleDateString()
            : `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(
                leave.endDate
              ).toLocaleDateString()}`,
      }));
  };

  const handlePrevMonth = () => {
    setMonth(month === 0 ? 11 : month - 1);
    if (month === 0) setYear(year - 1);
  };

  const handleNextMonth = () => {
    setMonth(month === 11 ? 0 : month + 1);
    if (month === 11) setYear(year + 1);
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

  const handleDeleteLeave = async (leaveId) => {
    try {
      await apis.deleteLeave(leaveId);
      fetchLeaves();
    } catch (error) {
      console.error("Failed to delete leave", error);
    }
  };

  return (
    <div className="leave-overview">
      <div className="pb-4 bg-white dark:bg-gray-800">
        <LeaveHeader addLeave={addLeave} />
        <WeekNavigation
          month={month}
          year={year}
          viewMode={viewMode}
          setMonth={setMonth}
          setYear={setYear}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleToggleChange={handleToggleChange}
        />
      </div>
      <div className="weeks-container overflow-y-scroll h-[calc(100vh-12rem)] grid grid-cols-12 auto-rows-min gap-0 px-4 dark:text-gray-200">
        {weeks.map((weekStart, i) => (
          <WeekRow
            key={`row-${i}`}
            weekStart={weekStart}
            employeesWithLeaves={getEmployeesForWeek(weekStart)}
            editLeave={editLeave}
            handleDeleteLeave={handleDeleteLeave}
            handleDropLeave={handleDropLeave}
            handleDropEmployee={handleDropEmployee}
            isEven={i % 2 === 0}
            excludedDateIntervals={excludedDateIntervals}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        title={selectedLeave ? "Edit Leave" : "Add New Leave"}
        onClose={() => setIsModalOpen(false)}
        minWidth="400px"
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
