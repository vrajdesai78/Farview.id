"use client";

import { usePrivy, useLogin } from "@privy-io/react-auth";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface NavButtonProps {
  openModal: () => void;
  fid: string;
}

const NavButton = ({ openModal, fid }: NavButtonProps) => {
  const { login } = useLogin({
    onError: (error) => {
      console.log(error);
      toast.error("Error logging in");
    },
  });

  const { authenticated, user, logout } = usePrivy();

  const pathname = usePathname();

  return (
    <div className='rounded-full bg-[#FAFAFA] p-2 flex gap-2 absolute top-0 right-2 mt-4 mr-4'>
      <button
        className='bg-[#F5F5F5] hover:bg-slate-200 p-2 rounded-l-full'
        onClick={() => {
          if (authenticated) {
            if (user?.farcaster?.fid === Number(fid)) {
              openModal();
            } else {
              toast.error("You are not authorized to personalize this profile");
              logout();
            }
          } else {
            login();
          }
        }}
      >
        {authenticated ? "Personalize" : "Login"}
      </button>
      <button
        className='rounded-r-full bg-violet-600 hover:bg-violet-500 p-2 text-white'
        onClick={() =>
          window.open(
            `https://warpcast.com/~/compose?embeds[]=https://www.farview.id/frames?fname=${pathname?.slice(
              1
            )}`,
            "_blank"
          )
        }
      >
        Share
      </button>
    </div>
  );
};

export default NavButton;
