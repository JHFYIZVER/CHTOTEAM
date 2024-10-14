import React from "react";

type PropsType = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
};

const Input = ({ placeholder, value, onChange, type }: PropsType) => {
  return (
    <input
      className="max-w-[400px] w-full text-center bg-input font-bold text-white py-3 outline-none rounded-bigBtn"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default Input;
