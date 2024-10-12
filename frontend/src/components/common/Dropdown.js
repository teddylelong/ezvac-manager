import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ options, children, icon, title = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmingOption, setConfirmingOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setConfirmingOption(null);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (option.danger && !confirmingOption) {
      setConfirmingOption(option);
    } else if (confirmingOption && confirmingOption === option) {
      option.onClick();
      closeDropdown();
    } else {
      option.onClick();
      closeDropdown();
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        title={title}
        onClick={toggleDropdown}
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-sky-400 dark:text-gray-200 dark:hover:text-sky-400"
      >
        {icon ? (
          <FontAwesomeIcon icon={icon} />
        ) : (
          <FontAwesomeIcon icon={faEllipsis} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white dark:bg-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {children ? (
              <div>{children}</div>
            ) : (
              options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    option.danger
                      ? "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 dark:hover:text-gray-200"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500"
                  }`}
                >
                  {confirmingOption === option
                    ? `Are you sure? Click again to confirm.`
                    : option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      danger: PropTypes.bool,
    })
  ),
  children: PropTypes.node,
  icon: PropTypes.object,
};

export default Dropdown;
