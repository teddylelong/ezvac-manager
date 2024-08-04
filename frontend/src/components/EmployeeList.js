import React, { useEffect, useState } from "react";
import apis from "../services/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await apis.getEmployees();
    setEmployees(response.data);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold dark:text-gray-200">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Employees
      </h2>
      <ul className="dark:text-gray-200">
        {employees.map((employee) => (
          <li
            className="mb-2 p-4 rounded-md shadow-md bg-gray-200 dark:bg-gray-600"
            key={employee._id}
          >
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
