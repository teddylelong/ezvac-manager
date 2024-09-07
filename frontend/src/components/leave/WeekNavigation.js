import React from "react";
import Button from "../common/Button";
import ToggleSwitch from "../common/ToggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const WeekNavigation = ({
  month,
  year,
  viewMode,
  setMonth,
  setYear,
  handlePrevMonth,
  handleNextMonth,
  handleToggleChange,
}) => (
  <div className="flex justify-between px-4 dark:text-gray-200 dark:border-gray-600">
    {/* Date select */}
    <div className="input-group">
      {/* Prev */}
      <Button
        onClick={handlePrevMonth}
        className="btn btn-secondary rounded-l"
        label={<FontAwesomeIcon icon={faChevronLeft} />}
        disabled={viewMode === "year"}
      />

      {/* Month */}
      <select
        className="w-32"
        value={month}
        onChange={(e) => setMonth(parseInt(e.target.value, 10))}
        disabled={viewMode === "year"}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <option key={`month-${i}`} value={i}>
            {new Date(year, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Next */}
      <Button
        onClick={handleNextMonth}
        className="btn btn-secondary rounded-r"
        label={<FontAwesomeIcon icon={faChevronRight} />}
        disabled={viewMode === "year"}
      />

      {/* Year */}
      <select
        value={year}
        className="ml-4 rounded-md"
        onChange={(e) => setYear(parseInt(e.target.value, 10))}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <option key={`year-${i}`} value={new Date().getFullYear() - 5 + i}>
            {new Date().getFullYear() - 5 + i}
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
);

export default WeekNavigation;
