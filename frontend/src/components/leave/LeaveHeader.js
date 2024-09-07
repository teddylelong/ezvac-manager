import React from "react";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const LeaveHeader = ({ addLeave }) => (
  <div className="flex items-center p-4 text-xl font-bold dark:text-gray-200">
    <h2>Leaves Overview</h2>
    <Button
      onClick={addLeave}
      variant="transparent"
      size="sm"
      label={<FontAwesomeIcon icon={faCalendarPlus} />}
      title="Add new leave"
    />
  </div>
);

export default LeaveHeader;
