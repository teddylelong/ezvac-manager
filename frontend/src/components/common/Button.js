import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const buttonClass = classNames(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    className,
    { disabled: disabled }
  );

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
