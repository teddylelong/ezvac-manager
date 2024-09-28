import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const SettingsForm = ({ onSave, onClose, setting, existingYears }) => {
  const [year, setYear] = useState("");
  const [excludedDates, setExcludedDates] = useState([]);
  const [excludedDateIntervals, setExcludedDateIntervals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const currentYear = new Date().getFullYear();

  const availableYears = Array.from(
    { length: 11 },
    (_, i) => currentYear - 5 + i
  ).filter((y) => !existingYears.includes(y) || setting?.year === y);

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (setting) {
      setYear(setting.year);
      setExcludedDates(
        (setting.excludedDates || []).map((date) => formatDate(date))
      );
      setExcludedDateIntervals(
        (setting.excludedDateIntervals || []).map((interval) => ({
          startDate: formatDate(interval.startDate),
          endDate: formatDate(interval.endDate),
        }))
      );
    } else {
      setYear("");
      setExcludedDates([]);
      setExcludedDateIntervals([]);
    }
  }, [setting]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingYears.includes(year) && setting?.year !== year) {
      setErrorMessage("This year already has settings.");
      return;
    }

    onSave({ year, excludedDates, excludedDateIntervals });
    onClose();
  };

  const handleAddExcludedDate = () => {
    setExcludedDates([...excludedDates, ""]);
  };

  const handleRemoveExcludedDate = (index) => {
    const updatedDates = excludedDates.filter((_, i) => i !== index);
    setExcludedDates(updatedDates);
  };

  const handleExcludedDateChange = (index, value) => {
    const updatedDates = [...excludedDates];
    updatedDates[index] = value;
    setExcludedDates(updatedDates);
  };

  const handleAddInterval = () => {
    setExcludedDateIntervals([
      ...excludedDateIntervals,
      { startDate: "", endDate: "" },
    ]);
  };

  const handleIntervalChange = (index, field, value) => {
    const updatedIntervals = [...excludedDateIntervals];
    updatedIntervals[index] = {
      ...updatedIntervals[index],
      [field]: value,
    };
    setExcludedDateIntervals(updatedIntervals);
  };

  const handleRemoveInterval = (index) => {
    const updatedIntervals = excludedDateIntervals.filter(
      (_, i) => i !== index
    );
    setExcludedDateIntervals(updatedIntervals);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="mb-4">
        <label
          htmlFor="year"
          className="block text-gray-700 dark:text-gray-300"
        >
          Year
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">-- Select a year --</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">
          Excluded Dates
        </label>
        {excludedDates.map((date, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="date"
              value={date}
              onChange={(e) => handleExcludedDateChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white mr-2"
            />
            <Button
              type="button"
              variant="danger"
              className="rounded-md"
              onClick={() => handleRemoveExcludedDate(index)}
              label={<FontAwesomeIcon icon={faTrash} />}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          className="rounded-md"
          onClick={handleAddExcludedDate}
          label={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">
          Excluded Date Intervals
        </label>
        {excludedDateIntervals.map((interval, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center mb-2">
              <input
                type="date"
                value={interval.startDate}
                onChange={(e) =>
                  handleIntervalChange(index, "startDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white mr-2"
              />
              <input
                type="date"
                value={interval.endDate}
                onChange={(e) =>
                  handleIntervalChange(index, "endDate", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white mr-2"
              />
              <Button
                type="button"
                variant="danger"
                className="rounded-md"
                onClick={() => handleRemoveInterval(index)}
                label={<FontAwesomeIcon icon={faTrash} />}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          className="rounded-md"
          onClick={handleAddInterval}
          label={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      <div className="flex justify-end">
        <Button
          className="rounded-md mr-2"
          onClick={onClose}
          label="Cancel"
          variant="secondary"
        />
        <Button
          className="rounded-md"
          type="submit"
          variant="primary"
          label="Save"
        />
      </div>
    </form>
  );
};

SettingsForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  setting: PropTypes.object,
  existingYears: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SettingsForm;
