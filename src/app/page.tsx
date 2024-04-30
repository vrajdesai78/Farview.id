"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [fcName, setFcName] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFcName(e.target.value);
  };

  const handleClick = (name: string) => {
    router.push(`/${fcName}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24 bg-black">
      <div className="flex items-center justify-start w-full flex-col gap-1">
        <h1 className="text-white/90 font-bold text-2xl font-mono">
          Welcome to TIP ME DEGEN
        </h1>

        <p className="text-white/70 font-medium text-lg font-mono">
          Search for any username below
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 w-full">
        <div className=" max-w-sm ">
          <input
            type="text"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter fc username ..."
            value={fcName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <button
          onClick={() => handleClick(fcName)}
          className="bg-white p-2 rounded-lg flex items-center justify-center"
        >
          <span className="text-sm text-black font-semibold">View</span>
        </button>
      </div>
    </main>
  );
}
