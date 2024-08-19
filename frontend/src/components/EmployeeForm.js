import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const EmployeeForm = ({ onSave, onClose, employee }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstName, lastName });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 dark:text-gray-300"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 dark:text-gray-300"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="bw-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 btn btn-secondary rounded-md"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary rounded-md">
          Save
        </button>
      </div>
    </form>
  );
};

EmployeeForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  employee: PropTypes.object,
};

export default EmployeeForm;
