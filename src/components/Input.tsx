import React from 'react';

interface FilterInputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<FilterInputProps> = ({
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="filter-input">
      <input
        className="input is-info is-small"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

