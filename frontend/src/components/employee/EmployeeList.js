import React, { useEffect, useState } from "react";
import apis from "../../services/api.js";
import Button from "../common/Button.js";
import Modal from "../common/Modal.js";
import EmployeeForm from "./EmployeeForm.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../common/Dropdown.js";

const EmployeeList = ({ fetchLeaves }) => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await apis.getEmployees();
    const employees = response.data.sort((a, b) =>
      a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
    );
    setEmployees(employees);
  };

  const addEmployee = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const editEmployee = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      selectedEmployee
        ? await apis.updateEmployee(selectedEmployee._id, employeeData)
        : await apis.createEmployee(employeeData);
      fetchEmployees();
      fetchLeaves();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save employee", error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await apis.deleteEmployee(employeeId);
      fetchEmployees();
      fetchLeaves();
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  return (
    <div className="employee-list dark:text-gray-200 overflow-y-scroll h-[calc(100vh-4rem)]">
      <div className="employee-list-header flex items-center p-4 text-xl font-bold bg-white dark:bg-gray-800 sticky top-0 z-10">
        <h2 className="w-2/3">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Employees
        </h2>
        <div className="w-1/3 text-end">
          <Button
            onClick={addEmployee}
            variant="transparent"
            size="sm"
            label={<FontAwesomeIcon icon={faUserPlus} />}
            title="Add new employee"
          />
        </div>
      </div>
      <ul className="px-4">
        {employees.map((employee) => (
          <li
            className={`flex mb-4 p-4 rounded-md shadow-md ${employee.color}`}
            key={employee._id}
          >
            <div className="w-2/3">
              {employee.lastName} {employee.firstName}
            </div>
            <div className="w-1/3 text-end">
              <Dropdown
                options={[
                  {
                    label: "Edit",
                    onClick: () => editEmployee(employee._id),
                  },
                  {
                    label: "Delete",
                    onClick: () => handleDeleteEmployee(employee._id),
                    danger: true,
                  },
                ]}
              />
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
        onClose={() => setIsModalOpen(false)}
      >
        <EmployeeForm
          onSave={handleSaveEmployee}
          onClose={() => setIsModalOpen(false)}
          employee={selectedEmployee}
        />
      </Modal>
    </div>
  );
};

export default EmployeeList;
