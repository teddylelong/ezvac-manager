import React, { useState, useEffect } from "react";
import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apis from "../../services/api";
import Modal from "../common/Modal.js";
import Button from "../common/Button.js";
import SettingsForm from "./SettingsForm.js";
import Spinner from "../common/Spinner.js";
import SettingItem from "./SettingItem.js";

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
          <Spinner />
        ) : (
          settings.map((setting) => (
            <SettingItem key={setting._id} setting={setting} />
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
