// src/components/InputField.js
import React, { useState } from "react";
import { useField } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id || props.name} className="text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type={props.type === "password" && showPassword ? "text" : props.type}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <AiFillEye size={20} />
            ) : (
              <AiFillEyeInvisible size={20} />
            )}
          </button>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
