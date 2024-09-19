import React from "react";

const Label = ({ variant = "primary", label, className = "text-xs" }) => {
  const variantClasses = (variant) => {
    switch (variant) {
      case "danger":
        return "text-red-800 bg-red-200 dark:bg-red-700 dark:text-red-200";
      case "secondary":
        return "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200";
      case "primary":
      default:
        return "text-sky-800 bg-sky-200 dark:bg-sky-700 dark:text-sky-200";
    }
  };
  return (
    <span
      className={`${className} ${variantClasses(
        variant
      )} font-semibold inline-block py-1 px-2 uppercase rounded-full last:mr-0 mr-1`}
    >
      {label}
    </span>
  );
};

export default Label;
