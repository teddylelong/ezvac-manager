import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const EmployeeForm = ({ onSave, onClose, employee }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState(
    employee ? `${employee.color}` : "bg-gray-200 dark:bg-gray-700"
  );

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
    onSave({ firstName, lastName, color });
    onClose();
  };

  const colors = [
    { name: "none", light: "", dark: "" },
    { name: "Gray", light: "bg-gray-200", dark: "dark:bg-gray-700" },
    { name: "Red", light: "bg-red-200", dark: "dark:bg-red-700" },
    { name: "Yellow", light: "bg-yellow-200", dark: "dark:bg-yellow-700" },
    { name: "Green", light: "bg-green-200", dark: "dark:bg-green-700" },
    { name: "Orange", light: "bg-orange-200", dark: "dark:bg-orange-700" },
    { name: "Blue", light: "bg-sky-200", dark: "dark:bg-sky-700" },
    { name: "Indigo", light: "bg-indigo-200", dark: "dark:bg-indigo-700" },
    { name: "Purple", light: "bg-purple-200", dark: "dark:bg-purple-700" },
    { name: "Pink", light: "bg-pink-200", dark: "dark:bg-pink-700" },
  ];

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
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="color"
          className="block text-gray-700 dark:text-gray-300"
        >
          Select Color
        </label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          {colors.map((colorOption) => (
            <option
              key={colorOption.light}
              value={`${colorOption.light} ${colorOption.dark}`}
            >
              {colorOption.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <div
          className={`h-6 w-6 rounded-full ${color.split(" ").join(" ")}`}
        ></div>
        <span className="ml-2 text-gray-700 dark:text-gray-300">
          Selected Color
        </span>
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
