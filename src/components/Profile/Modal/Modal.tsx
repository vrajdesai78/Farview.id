"use client";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { TUserDetail } from "@/types/types";
import { addUserDetails } from "@/app/_actions/queries";
import { usePrivy } from "@privy-io/react-auth";
import toast from "react-hot-toast";

interface ModalProps {
  open: boolean;
  closeModal: () => void;
  userData: TUserDetail;
}

const Modal = ({ closeModal, open, userData }: ModalProps) => {
  const [formData, setFormData] = useState<TUserDetail>(userData);

  const { user } = usePrivy();

  return (
    <>
      {open && (
        <>
          <div className='fixed z-50 inset-0 bg-black/[0.4] backdrop-blur-sm flex justify-center items-center'>
            <div className='max-w-[502px] w-full max-h-screen'>
              {/* upper containter*/}
              <div className='bg-white rounded-[16px] p-[24px]'>
                <div className='w-full border-b border-[#E5E5E5] pb-[24px]'>
                  <div className='pb-[16px] gap-[4px]'>
                    <h2 className='text-black text-[18px] font-semibold'>
                      Pin Cast
                    </h2>
                    <p className='text-[#737373] text-[16px] font-regular'>
                      Enter the cast link you want to pin
                    </p>
                  </div>
                  <Input
                    type=''
                    value={formData.cast ?? ""}
                    handleChange={(e: any) =>
                      setFormData({ ...formData, cast: e.target.value })
                    }
                    placeholder='Enter your cast URL'
                  />
                </div>
                {/* middle containter*/}
                <div className='w-full border-b border-[#E5E5E5] py-[24px]'>
                  <h2 className='text-black text-[18px] font-semibold'>
                    Socials
                  </h2>

                  <div className='flex flex-col gap-[8px]'>
                    <h3 className='text-[#737373] text-[16px] font-regular pb-[4px]'>
                      GitHub
                    </h3>
                    <Input
                      type=''
                      value={formData.github ?? ""}
                      handleChange={(e: any) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      placeholder='https://github.com/vrajdesai78'
                    />
                    <h3 className='text-[#737373] text-[16px] font-regular pb-[4px]'>
                      X (Twitter)
                    </h3>
                    <Input
                      type=''
                      value={formData.twitter ?? ""}
                      handleChange={(e: any) =>
                        setFormData({ ...formData, twitter: e.target.value })
                      }
                      placeholder='https://twitter.com/farviewid'
                    />
                    <h3 className='text-[#737373] text-[16px] font-regular pb-[4px]'>
                      Telegram{" "}
                    </h3>
                    <Input
                      type=''
                      value={formData.telegram ?? ""}
                      handleChange={(e: any) =>
                        setFormData({ ...formData, telegram: e.target.value })
                      }
                      placeholder='https://t.me/farview.id'
                    />
                    <h3 className='text-[#737373] text-[16px] font-regular pb-[4px]'>
                      LinkedIn
                    </h3>
                    <Input
                      type=''
                      value={formData.linkedin ?? ""}
                      handleChange={(e: any) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                      placeholder='https://linkedin.com/kuxshl'
                    />
                    <h3 className='text-[#737373] text-[16px] font-regular pb-[4px]'>
                      Instagram
                    </h3>
                    <Input
                      type=''
                      value={formData.instagram ?? ""}
                      handleChange={(e: any) =>
                        setFormData({ ...formData, instagram: e.target.value })
                      }
                      placeholder='https://instagram.com/farview.id'
                    />
                  </div>
                </div>
                <div className='flex flex-row p-[12px] items-end justify-end gap-[8px]'>
                  <Button
                    text='Back'
                    buttonStyles='bg-[#E5E5E5] text-black'
                    onClick={closeModal}
                  />
                  <Button
                    text='Save'
                    buttonStyles='text-white bg-slate-600'
                    onClick={async () => {
                      if (!user?.farcaster?.username) return;
                      await addUserDetails({
                        ...formData,
                        fname: user?.farcaster?.username,
                      });
                      toast.success("Details saved successfully");
                      closeModal();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
