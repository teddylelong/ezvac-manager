import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HelpText = ({ text, showIcon = true }) => {
  return (
    <p className="mb-2 italic text-sm">
      {showIcon && (
        <span className="mr-1 text-sky-600 dark:text-sky-400">
          <FontAwesomeIcon icon={faInfoCircle} />
        </span>
      )}
      <span className="text-gray-700 dark:text-gray-300">{text}</span>
    </p>
  );
};

export default HelpText;
