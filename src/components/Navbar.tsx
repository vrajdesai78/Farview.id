import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-between items-center px-6 max-w-[1200px]">
      {/* Farento */}
      <Link href={"/"} className="text-2xl font-semibold text-[#7F5FC6]">
        Farento
      </Link>

      {/* share */}
      {pathname !== "/" && (
        <a className="w-24 h-11 px-6 py-3 bg-white rounded-full border border-slate-200 justify-center items-center gap-2.5 inline-flex">
          <button
            className="text-center text-slate-500 text-base font-normal tracking-tight"
            onClick={async () => {
              await navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard");
            }}
          >
            Share
          </button>
        </a>
      )}
    </div>
  );
};

export default Navbar;
