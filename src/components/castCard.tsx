import React, { use } from "react";
import { getFormattedTime } from "../../utils/getFormattedTime";
import ShortenName from "../../utils/nameShortner";

interface cardProps {
  pfpImg: string;
  username: string;
  displayName: string;
  castText: string;
  timestamp: string;
  likesCount: number;
  recastCount: number;
}

const CastCard = ({
  pfpImg,
  username,
  displayName,
  castText,
  timestamp,
  likesCount,
  recastCount,
}: cardProps) => {
  const formattedTime = getFormattedTime(timestamp);

  return (
    // <div className=" rounded-xl flex items-center w-full justify-center">
    <div className="p-4 rounded-xl !pb-2 border h-[200px] border-[#382a3d] bg-[#E3E8EF] w-full max-w-xl flex flex-col items-start justify-between">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          {/* profile img */}
          <img className="h-8 w-8 rounded-full object-cover" src={pfpImg} />
          <div className="ml-1.5 text-xs leading-tight">
            {/* display name */}
            <span className="text-slate-500 font-bold block ">
              {displayName}
            </span>
            {/* username */}
            <span className="text-[#5b616e] font-normal block">
              @{username}
            </span>
          </div>
        </div>
        {/* warpcast icon */}
        <img
          src="https://play-lh.googleusercontent.com/cRcdfJ01plmO9AhusWRZ1uyrjcYbbMMiyqTakPEHatoNVEzxtFt-78GJ7IZX-1cd2Vz2"
          alt=""
          className="w-6 h-6 rounded-sm"
        />
      </div>
      <div className="max-w-full w-full flex items-start justify-center">
        <p className="text-slate-800 block text-xs w-full mt-1 max-w-full whitespace-break-spaces text-ellipsis">
          {ShortenName(castText, 80)}
        </p>
      </div>
      <div className="">
        {/* time of cast */}
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 ">
          {formattedTime}
        </p>
        <div className="text-gray-500 dark:text-gray-400 flex ">
          <div className="flex items-center mr-3">
            {/* recasts */}
            <div className="group cursor-pointer flex flex-row items-center justify-center rounded-full p-1.5 transition-colors hover:bg-gray-200/20 group-hover:bg-gray-200/20 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-green text-faint">
              <svg width="12" height="12" viewBox="0 0 19 18" fill="none">
                <path
                  d="M2.41813 9.00562C2.5282 8.99243 2.63979 9.00106 2.74652 9.03101C2.85326 9.06096 2.95305 9.11166 3.04018 9.18019C3.12732 9.24873 3.20009 9.33377 3.25434 9.43044C3.3086 9.52712 3.34327 9.63354 3.35638 9.74362C3.49975 10.9294 3.98324 12.0483 4.7485 12.9653C5.51375 13.8823 6.52806 14.5583 7.669 14.9115C8.80994 15.2648 10.0287 15.2803 11.1783 14.9562C12.3279 14.632 13.359 13.9821 14.1474 13.0849L12.7929 11.7304C12.7534 11.691 12.7266 11.6409 12.7157 11.5863C12.7048 11.5316 12.7104 11.475 12.7317 11.4235C12.753 11.3721 12.7891 11.3281 12.8355 11.2972C12.8818 11.2663 12.9363 11.2499 12.992 11.25H17.0938C17.1683 11.25 17.2399 11.2796 17.2926 11.3324C17.3454 11.3851 17.375 11.4567 17.375 11.5312V15.633C17.3751 15.6887 17.3587 15.7432 17.3278 15.7895C17.2969 15.8359 17.2529 15.872 17.2014 15.8933C17.15 15.9146 17.0934 15.9202 17.0387 15.9093C16.9841 15.8984 16.934 15.8716 16.8946 15.8321L15.3421 14.2796C14.3288 15.3996 13.0148 16.2046 11.5568 16.5988C10.0988 16.993 8.55817 16.9597 7.11854 16.5029C5.67891 16.0461 4.40095 15.1851 3.43693 14.0224C2.47291 12.8597 1.86348 11.4443 1.68125 9.945C1.66806 9.83493 1.67668 9.72333 1.70664 9.6166C1.73659 9.50986 1.78729 9.41008 1.85582 9.32294C1.92436 9.23581 2.0094 9.16303 2.10607 9.10878C2.20275 9.05452 2.30917 9.01985 2.41925 9.00675L2.41813 9.00562ZM9.5 2.8125C8.62026 2.81157 7.75049 2.99869 6.94897 3.36132C6.14745 3.72396 5.4327 4.25372 4.85263 4.91512L6.20713 6.26962C6.24656 6.30896 6.27343 6.35912 6.28432 6.41374C6.29522 6.46836 6.28965 6.52499 6.26832 6.57644C6.24699 6.6279 6.21086 6.67186 6.16452 6.70276C6.11817 6.73366 6.0637 6.7501 6.008 6.75H1.90625C1.83166 6.75 1.76012 6.72037 1.70738 6.66762C1.65463 6.61488 1.625 6.54334 1.625 6.46875V2.367C1.6249 2.3113 1.64134 2.25682 1.67224 2.21048C1.70314 2.16414 1.7471 2.12801 1.79855 2.10668C1.85001 2.08535 1.90663 2.07978 1.96126 2.09068C2.01588 2.10157 2.06604 2.12844 2.10538 2.16787L3.65788 3.72037C4.67122 2.6004 5.98518 1.79536 7.4432 1.40118C8.90122 1.00699 10.4418 1.04029 11.8815 1.49708C13.3211 1.95388 14.5991 2.81493 15.5631 3.97763C16.5271 5.14033 17.1365 6.55566 17.3187 8.055C17.3453 8.27728 17.2825 8.50101 17.1441 8.67697C17.0057 8.85292 16.803 8.96669 16.5807 8.99325C16.3585 9.0198 16.1347 8.95697 15.9588 8.81856C15.7828 8.68016 15.6691 8.47753 15.6425 8.25525C15.4605 6.75419 14.7352 5.37173 13.6035 4.36895C12.4718 3.36617 11.0121 2.8125 9.5 2.8125Z"
                  fill="#9FA3AF"
                ></path>
              </svg>
            </div>
            <span className=" text-[10px]">{recastCount}</span>
          </div>

          {/* likes */}
          <div className="flex items-center mr-6">
            <div className="group flex w-6 flex-row items-center text-sm text-faint cursor-pointer">
              <div className="group flex flex-row items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200/20 group-hover:bg-gray-200/20 dark:hover:bg-overlay-medium dark:group-hover:bg-overlay-medium text-action-red text-faint">
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 16.0312L9.38813 16.7805C9.26819 16.8426 9.13508 16.8751 9 16.8751C8.86492 16.8751 8.73182 16.8426 8.61188 16.7805L8.60287 16.776L8.58263 16.7648C8.46482 16.7039 8.34853 16.6401 8.23387 16.5735C6.86271 15.7931 5.56911 14.8838 4.37063 13.8577C2.30062 12.0724 0 9.39375 0 6.1875C0 3.1905 2.34675 1.125 4.78125 1.125C6.52163 1.125 8.04712 2.02725 9 3.3975C9.95288 2.02725 11.4784 1.125 13.2188 1.125C15.6532 1.125 18 3.1905 18 6.1875C18 9.39375 15.6994 12.0724 13.6294 13.8577C12.3293 14.9693 10.9178 15.9434 9.41738 16.7648L9.39712 16.776L9.39038 16.7794H9.38813L9 16.0312ZM4.78125 2.8125C3.27825 2.8125 1.6875 4.122 1.6875 6.1875C1.6875 8.60625 3.465 10.8495 5.47312 12.5798C6.56874 13.5169 7.74949 14.3496 9 15.0671C10.2505 14.3496 11.4313 13.5169 12.5269 12.5798C14.535 10.8495 16.3125 8.60625 16.3125 6.1875C16.3125 4.122 14.7218 2.8125 13.2188 2.8125C11.6741 2.8125 10.2836 3.92175 9.81112 5.5755C9.76137 5.75232 9.6552 5.90804 9.50877 6.01895C9.36235 6.12986 9.18369 6.18989 9 6.18989C8.81631 6.18989 8.63765 6.12986 8.49123 6.01895C8.3448 5.90804 8.23863 5.75232 8.18888 5.5755C7.71637 3.92175 6.32587 2.8125 4.78125 2.8125Z"
                    fill="#9FA3AF"
                  ></path>
                </svg>
              </div>
            </div>

            <span className=" text-[10px]">{likesCount}</span>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CastCard;
