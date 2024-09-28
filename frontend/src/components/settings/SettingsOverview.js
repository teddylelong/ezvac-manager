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
  const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSettings, setSelectedSettings] = useState(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await apis.getSettings();
      const settings = response.data.sort((a, b) => a.year - b.year);
      setSettings(settings);
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSettings = () => {
    setSelectedSettings(null);
    setIsModalOpen(true);
  };

  const handleEditSetting = (setting) => {
    setSelectedSettings(setting);
    setIsModalOpen(true);
  };

  const handleDeleteSetting = async (settingId) => {
    try {
      await apis.deleteSettings(settingId);
      fetchSettings();
    } catch (error) {
      console.error("Failed to delete setting", error);
    }
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
        {isLoading ? (
          <Spinner />
        ) : settings.length === 0 ? (
          <div>
            <p className="text-gray-500 dark:text-gray-300 mb-2">
              No settings found. You can add a new setting below.
            </p>
            <Button
              onClick={addSettings}
              variant="primary"
              size="md"
              label="Create your first setting"
              className="rounded-md"
            />
          </div>
        ) : (
          settings.map((setting) => (
            <SettingItem
              key={setting._id}
              setting={setting}
              onEdit={handleEditSetting}
              onDelete={handleDeleteSetting}
            />
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
          existingYears={settings.map((s) => s.year)}
        />
      </Modal>
    </div>
  );
};

export default SettingsOverview;
