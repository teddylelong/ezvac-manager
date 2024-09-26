import React, { useState, useEffect } from "react";
import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apis from "../../services/api";
import Modal from "../common/Modal.js";
import Button from "../common/Button.js";
import SettingsForm from "./SettingsForm.js";

const SettingsOverview = () => {
  const [settings, setSettings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSettings, setSelectedSettings] = useState(null);

  const fetchSettings = async () => {
    const response = await apis.getSettings();
    const settings = response.data.sort((a, b) => a.year - b.year);
    setSettings(settings);
  };

  const addSettings = () => {
    setSelectedSettings(null);
    setIsModalOpen(true);
  };

  const handleSaveSetting = async (settingsData) => {
    try {
      selectedSettings
        ? await apis.updateSettings(selectedSettings._id, settingsData)
        : await apis.createSettings(settingsData);
      fetchSettings();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save setting", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="overflow-y-scroll h-[calc(100vh-4rem)] dark:text-gray-200 dark:bg-gray-800">
      <header className="p-4 text-xl font-bold dark:text-gray-200">
        <FontAwesomeIcon icon={faCog} className="mr-2" />
        Settings
        <Button
          onClick={addSettings}
          variant="transparent"
          size="sm"
          label={<FontAwesomeIcon icon={faPlus} />}
          title="Add new settings"
        />
      </header>
      <section className="settings-container p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            Loading settings...
          </p>
        ) : (
          settings.map((setting) => (
            <div
              key={setting._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 overflow-hidden"
            >
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
          ))
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        title={selectedSettings ? "Edit Settings" : "Add Settings"}
        onClose={() => setIsModalOpen(false)}
        minWidth="500px"
      >
        <SettingsForm
          onSave={handleSaveSetting}
          onClose={() => setIsModalOpen(false)}
          setting={selectedSettings}
          existingYears={settings.map((s) => s.year)} // Pass existing years
        />
      </Modal>
    </div>
  );
};

export default SettingsOverview;
