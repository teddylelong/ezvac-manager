import React, { useEffect, useState } from "react";
import apis from "../services/api.js";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await apis.getEmployees();
    console.log(response);

    setEmployees(response.data);
  };

  return (
    <div>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
