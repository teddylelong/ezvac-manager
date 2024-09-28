import React from "react";
import PropTypes from "prop-types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({
  isOpen,
  onClose,
  title = null,
  children,
  closeOnOutsideClick = true,
  minWidth = "auto",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:text-gray-200 overflow-auto"
      onClick={handleOverlayClick}
    >
      <div
        className="min-w-96 bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg"
        style={{ minWidth: minWidth }}
      >
        <div className="text-end">
          <button onClick={onClose} className="hover:text-red-600">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  closeOnOutsideClick: PropTypes.bool,
};

export default Modal;
