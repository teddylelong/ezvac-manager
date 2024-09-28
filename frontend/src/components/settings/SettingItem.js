import React from "react";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import HelpText from "../common/HelpText";

const SettingItem = ({ setting, onEdit, onDelete }) => {
  const confirmDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the settings for the year ${setting.year} ?`
      )
    ) {
      onDelete(setting._id);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-300 dark:bg-gray-700 p-4 flex justify-between items-center">
        <h2 className="text-2xl text-gray-800 dark:text-white font-semibold text-center">
          {setting.year}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="transparent"
            size="sm"
            onClick={() => onEdit(setting)}
            label={<FontAwesomeIcon icon={faEdit} />}
            title="Edit setting"
          />
          <Button
            variant=""
            className="hover:text-red-600"
            size="sm"
            onClick={confirmDelete}
            label={<FontAwesomeIcon icon={faTrash} />}
            title="Delete setting"
          />
        </div>
      </div>

      <div className="p-4 flex gap-4">
        <div className="w-1/2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Excluded Dates
          </h3>
          <HelpText
            showIcon={false}
            text="These dates do not count as leave day."
          />
          <ul className="list-disc list-inside text-gray-800 dark:text-white space-y-1">
            {setting.excludedDates.length > 0 ? (
              setting.excludedDates.map((excludedDate, index) => (
                <li key={index}>
                  {new Date(excludedDate).toLocaleDateString()}
                </li>
              ))
            ) : (
              <p className="italic text-gray-500 dark:text-gray-400">
                No excluded dates
              </p>
            )}
          </ul>
        </div>

        <div className="w-1/2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Excluded Date Intervals
          </h3>
          <HelpText
            showIcon={false}
            text="These dates will be highlighted on week number."
          />
          <ul className="list-disc list-inside text-gray-800 dark:text-white space-y-1">
            {setting.excludedDateIntervals.length > 0 ? (
              setting.excludedDateIntervals.map((interval, index) => (
                <li key={index}>
                  {`${new Date(
                    interval.startDate
                  ).toLocaleDateString()} → ${new Date(
                    interval.endDate
                  ).toLocaleDateString()}`}
                </li>
              ))
            ) : (
              <p className="italic text-gray-500 dark:text-gray-400">
                No excluded intervals
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingItem;
