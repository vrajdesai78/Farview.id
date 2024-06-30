import React from "react";

const Button = ({
  text,
  buttonStyles,
  onClick,
}: {
  text: string;
  buttonStyles: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`px-[18px] py-[8px] w-[74px]  text-[16px]  rounded-[12px] ${buttonStyles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
