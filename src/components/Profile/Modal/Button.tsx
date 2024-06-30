import React from "react";

const Button = ({
  text,
  buttonStyles,
}: {
  text: string;
  buttonStyles: string;
}) => {
  return (
    <button
      className={`px-[18px] py-[8px] w-[74px]  text-[16px]  rounded-[12px] ${buttonStyles}`}
    >
      {text}
    </button>
  );
};

export default Button;
