import React from "react";

const SettingItem = ({ setting }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-300 dark:bg-gray-700 p-4">
        <h2 className="text-2xl text-gray-800 dark:text-white font-semibold text-center">
          {setting.year}
        </h2>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Excluded Dates
          </h3>
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

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Excluded Date Intervals
          </h3>
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
