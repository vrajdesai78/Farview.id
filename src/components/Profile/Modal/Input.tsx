import React from "react";

const Input = ({
  type,
  value,
  handleChange,
  placeholder,
}: {
  type: string;
  value: string;
  handleChange: (e: any) => void;
  placeholder: string;
}) => {
  return (
    <input
      type={type}
      className='bg-[#F5F5F5] px-[16px] py-[12px] w-full rounded-[12px] focus:outline-none '
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;
