"use client";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";


interface ModalProps {
  open: boolean;
  closeModal: () => void
}

const Modal = ({ closeModal, open }: ModalProps) => {
  const [form, setForm] = useState({
    username: "",
    Instagram: "",
    X: "",
    Telegram: "",
    LinkedIn: "",
    Discord: "",
  });
  return (
    <>
      {open &&
        <>
          <div className="fixed  inset-0 bg-black/[0.4] backdrop-blur-sm flex justify-center items-center">
            <div className="max-w-[502px] w-full max-h-screen">
              {/* upper containter*/}
              <div className="bg-white rounded-[16px] p-[24px]">
                <div className="w-full border-b border-[#E5E5E5] pb-[24px]">
                  <div className="pb-[16px] gap-[4px]">
                    <h2 className="text-black text-[18px] font-semibold">Pin Cast</h2>
                    <p className="text-[#737373] text-[16px] font-regular">
                      Enter the cast link you want to pin
                    </p>
                  </div>
                  <Input
                    type=""
                    value=""
                    handleChange={() => { }}
                    placeholder="Enter your FC username"
                  />
                </div>
                {/* middle containter*/}
                <div className="w-full border-b border-[#E5E5E5] py-[24px]">
                  <h2 className="text-black text-[18px] font-semibold">Socials</h2>

                  <div className="flex flex-col gap-[8px]">
                    <h3 className="text-[#737373] text-[16px] font-regular pb-[4px]">
                      Instagram URL
                    </h3>
                    <Input
                      type=""
                      value=""
                      handleChange={() => { }}
                      placeholder="instagram.com/kuxshl"
                    />
                    <h3 className="text-[#737373] text-[16px] font-regular pb-[4px]">
                      X URL{" "}
                    </h3>
                    <Input
                      type=""
                      value=""
                      handleChange={() => { }}
                      placeholder="x.com/kuxshl"
                    />
                    <h3 className="text-[#737373] text-[16px] font-regular pb-[4px]">
                      Telegram URL{" "}
                    </h3>
                    <Input
                      type=""
                      value=""
                      handleChange={() => { }}
                      placeholder="t.me/kuxshl"
                    />
                    <h3 className="text-[#737373] text-[16px] font-regular pb-[4px]">
                      LinkedIn URL
                    </h3>
                    <Input
                      type=""
                      value=""
                      handleChange={() => { }}
                      placeholder="linkedin.com/kuxshl"
                    />
                    <h3 className="text-[#737373] text-[16px] font-regular pb-[4px]">
                      Discord ID
                    </h3>
                    <Input
                      type=""
                      value=""
                      handleChange={() => { }}
                      placeholder="kuxshl#2345"
                    />
                  </div>
                </div>
                <div className="flex flex-row p-[12px] items-end justify-end gap-[8px]">
                  <Button
                    text="Back"
                    buttonStyles="bg-[#E5E5E5] text-black"
                  />
                  <Button
                    text="Save"
                    buttonStyles="tilted-gradient text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Modal;
