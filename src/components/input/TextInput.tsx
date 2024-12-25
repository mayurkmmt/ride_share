import React from "react";

type TextInputPropsT = {
  name: string;
  label: string | React.ReactElement;
  placeholder?: string;
  value: undefined | string | number;
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  [restProps: string]: any;
};

const TextInput: React.FC<TextInputPropsT> = ({
  name = "",
  label = "",
  placeholder = "",
  value,
  handleChange,
  ...restProps
}) => {
  return (
    <div>
      {label && (
        <label className="flex items-center text-lg mb-2">{label}</label>
      )}
      <input
        className="input-field"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...restProps}
      />
    </div>
  );
};

export default TextInput;
