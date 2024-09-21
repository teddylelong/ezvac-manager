import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const ActionMenu = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white dark:text-gray-200 text-lg font-bold">
          <h1>
            <FontAwesomeIcon icon={faMugHot}></FontAwesomeIcon> EZVac Manager
          </h1>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Overview
          </Link>
          <Link
            to="/calendar"
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Calendar
          </Link>
          <Link
            to="/settings"
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Settings
          </Link>
          <Button
            onClick={toggleDarkMode}
            variant={false}
            label={
              <div className="flex items-center justify-center w-5 h-5">
                <FontAwesomeIcon
                  icon={darkMode ? faSun : faMoon}
                  className="text-sm"
                />
              </div>
            }
            className="text-gray-300 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          ></Button>
        </div>
      </div>
    </nav>
  );
};

export default ActionMenu;
