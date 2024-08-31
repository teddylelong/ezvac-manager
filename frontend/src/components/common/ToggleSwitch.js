import React from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({ checked, onChange, labelOn, labelOff }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-700 dark:text-gray-300">{labelOff}</span>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div
          className="relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 
                        peer-focus:outline-none peer-checked:after:translate-x-full 
                        rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] 
                        after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600"
        ></div>
      </label>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{labelOn}</span>
    </div>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  labelOn: PropTypes.string,
  labelOff: PropTypes.string,
};

export default ToggleSwitch;
