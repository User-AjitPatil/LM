import React from 'react';

const FormInput = ({ type, id, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
