import React from "react";

const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
