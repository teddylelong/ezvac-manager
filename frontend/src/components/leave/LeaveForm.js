import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import apis from "../../services/api";
import Button from "../common/Button";

const LeaveForm = ({ onSave, onClose, leave }) => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchEmployees();
    if (leave) {
      setEmployee(leave.employee._id);
      setStartDate(formatDateForInput(leave.startDate));
      setEndDate(formatDateForInput(leave.endDate));
    } else {
      setEmployee("");
      setStartDate("");
      setEndDate("");
    }
  }, [leave]);

  const fetchEmployees = async () => {
    const response = await apis.getEmployees();

    const sortedEmployees = response.data.sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );

    setEmployees(sortedEmployees);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ employee, startDate, endDate });
    onClose();
  };

  const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().substring(0, 16); // Format datetime-local
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="employee"
          className="block text-gray-700 dark:text-gray-300"
        >
          Select an Employee
        </label>
        <select
          id="employee"
          onChange={(e) => setEmployee(e.target.value)}
          value={employee}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">---</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-gray-700 dark:text-gray-300"
        >
          Start date
        </label>
        <input
          type="datetime-local"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="endDate"
          className="block text-gray-700 dark:text-gray-300"
        >
          End date
        </label>
        <input
          type="datetime-local"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="rounded-md mr-2"
          onClick={onClose}
          label="Cancel"
          variant="secondary"
        ></Button>

        <Button
          className="rounded-md"
          type="submit"
          variant="primary"
          label="Save"
        ></Button>
      </div>
    </form>
  );
};

LeaveForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  leave: PropTypes.object,
};

export default LeaveForm;
