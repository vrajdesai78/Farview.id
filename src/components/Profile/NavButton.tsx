"use client";

import {
  usePrivy,
  useLogin,
  useLinkAccount,
  useLogout,
} from "@privy-io/react-auth";

const NavButton = () => {
  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount
    ) => {
      console.log(
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        linkedAccount
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { logout } = useLogout();

  const { authenticated, user } = usePrivy();

  console.log("user", user?.farcaster?.username);

  return (
    <div className='rounded-full bg-[#FAFAFA] p-2 flex gap-2 absolute top-0 right-2 mt-4 mr-4'>
      <button
        className='bg-[#F5F5F5] hover:bg-slate-200 p-2 rounded-l-full'
        onClick={authenticated ? logout : login}
      >
        Personalise
      </button>
      <button className='rounded-r-full bg-violet-600 hover:bg-violet-500 p-2 text-white'>
        Share
      </button>
    </div>
  );
};

export default NavButton;
