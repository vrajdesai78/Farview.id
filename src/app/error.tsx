"use client"; // Error components must be Client Components

import Lottie from "lottie-react";
import { useEffect } from "react";
import ErrorAnimation from "../../public/Animation/ErrorAnimation.json";
import Link from "next/link";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='w-full min-h-screen flex items-center justify-start flex-col gap-10 py-20 px-3  bg-[#F8FAFC]'>
      <Lottie animationData={ErrorAnimation} className='w-11/12 max-w-xl' />

      <span className='text-[1.5rem] sm:text-[2rem] lg:text-[2.60rem] text-black font-semibold text-center'>
        User Not Found on Farcaster
      </span>

      <span className='text-[1rem] lg:text-[1.20rem] text-primary-grey font-semibold text-center'>
        Try searching another profile{" "}
        <Link href='/' className='text-primary-violet'>
          here
        </Link>
      </span>
    </div>
  );
}
