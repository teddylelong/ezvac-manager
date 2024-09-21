import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SettingsOverview = () => {
  return (
    <div className="overflow-y-scroll h-[calc(100vh-4rem)] dark:text-gray-200 dark:bg-gray-800">
      <header className="p-4 text-xl font-bold dark:text-gray-200">
        <FontAwesomeIcon icon={faCog} className="mr-2" />
        Settings
      </header>
      <section className="settings-container flex p-4">
        <div className=""></div>
        <div className=""></div>
      </section>
    </div>
  );
};

export default SettingsOverview;
