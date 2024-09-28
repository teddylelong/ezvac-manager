import React, { useState, useEffect } from "react";
import EmployeeList from "./EmployeeList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const EmployeeLayout = ({
  children,
  toggleSidebar,
  isCollapsed,
  fetchLeaves,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(!isCollapsed);

  useEffect(() => {
    if (!isCollapsed) {
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setIsContentVisible(false);
    }
  }, [isCollapsed]);

  return (
    <div className="employee-layout flex dark:bg-gray-800">
      <div
        className={`drawer relative border-r dark:border-gray-700 transition-all duration-300 ${
          isCollapsed ? "w-0 opened" : "w-2/12 closed"
        }`}
      >
        <div
          className={`transition-opacity duration-300 ${
            isContentVisible ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <DndProvider backend={HTML5Backend}>
            <EmployeeList fetchLeaves={fetchLeaves} />
          </DndProvider>
        </div>
        <button
          onClick={toggleSidebar}
          className={`btn-transparent btn-sm bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md z-10 cursor-pointer h-1/6
                        absolute top-1/2 -right-3 transform -translate-y-1/2
                        transition-transform ease-in-out delay-150 ${
                          isCollapsed ? "hover:translate-x-2" : ""
                        }`}
        >
          <FontAwesomeIcon
            icon={isCollapsed ? faChevronRight : faChevronLeft}
          />
        </button>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default EmployeeLayout;
