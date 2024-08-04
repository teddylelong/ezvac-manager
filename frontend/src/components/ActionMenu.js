import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const ActionMenu = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white dark:text-gray-200 text-lg font-bold">
          <h1>EZVac Manager</h1>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/employees"
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Employees
          </Link>
          <Link
            to="/leaves"
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Leaves
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              className="mr-2"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ActionMenu;
