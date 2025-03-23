"use client";
import React from "react";

function Input({ name, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-gray-700 font-medium cursor-pointer"
      >
        {name}*
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="h-12 px-4 bg-gray-50 border-b-2 border-gray-300 focus:outline-none focus:border-appColor focus:ring-2 focus:ring-blue-300 text-gray-700 rounded-md shadow-sm transition-all duration-200"
      />
    </div>
  );
}

export default Input;
