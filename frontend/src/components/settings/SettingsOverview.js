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
      <section className="settings-container p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settings.length === 0 ? (
          <p>Loading settings...</p>
        ) : (
          settings.map((setting) => (
            <div
              key={setting._id}
              className="p-2 rounded-md shadow-md bg-gray-100 dark:bg-gray-700"
            >
              <h1 className="text-xl p-2 border-b border-gray-200 dark:border-gray-600">
                {setting.year}
              </h1>
              <div className="p-2">
                Excluded dates:{" "}
                {setting.excludedDates.map((excludedDate) => (
                  <p>{`${new Date(excludedDate).toLocaleDateString()}`}</p>
                ))}
              </div>
              <div className="p-2">
                Excluded dates intervals:
                {setting.excludedDateIntervals.map((excludedDateInterval) => (
                  <p>
                    {`${new Date(
                      excludedDateInterval.startDate
                    ).toLocaleDateString()}`}
                    -&gt;
                    {`${new Date(
                      excludedDateInterval.endDate
                    ).toLocaleDateString()}`}
                  </p>
                ))}
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
