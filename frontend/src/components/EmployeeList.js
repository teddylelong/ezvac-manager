import React, { useEffect, useState } from "react";
import apis from "../services/api.js";
import Button from "./common/Button.js";
import Modal from "./common/Modal";
import EmployeeForm from "./EmployeeForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await apis.getEmployees();
    setEmployees(response.data);
  };

  const addEmployee = () => {
    setIsModalOpen(true);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      await apis.createEmployee(employeeData);
      fetchEmployees(); // Refresh the employee list after adding a new employee
    } catch (error) {
      console.error("Failed to add employee", error);
    }
  };

  return (
    <div>
      <h2 className="flex items-center mb-4 text-xl font-bold dark:text-gray-200">
        <div className="w-2/3">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Employees
        </div>
        <div className="w-1/3 text-end">
          <Button
            onClick={addEmployee}
            variant="transparent"
            size="sm"
            label={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
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

      <Modal
        isOpen={isModalOpen}
        title={"Add new Employee"}
        onClose={() => setIsModalOpen(false)}
      >
        <EmployeeForm
          onSave={handleSaveEmployee}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeList;
