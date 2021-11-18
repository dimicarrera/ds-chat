import React from "react";

export interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  value: string;
  label: string;
  placeholder: string;
  name: string;
}

export const Input: React.FC<Props> = ({
  onChange,
  onBlur,
  error,
  value,
  label,
  placeholder,
  name,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div>{error}</div>}
    </div>
  );
};
