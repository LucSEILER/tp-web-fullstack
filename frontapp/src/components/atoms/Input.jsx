import React, { useState } from "react";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;

    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val && !emailRegex.test(val)) {
        setError("Email address is invalid");
      } else {
        setError("");
      }
    }

    onChange(e);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
