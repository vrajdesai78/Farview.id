import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (date: Date) => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const options = {
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const day = date.getDate();
  const ordinalSuffix =
    ["th", "st", "nd", "rd"][((day / 10) | 0) !== 1 ? day % 10 : 0] || "th";
  const formattedDateWithSuffix = formattedDate.replace(
    /^\d+/,
    `${day}${ordinalSuffix}`
  );
  return {
    formattedDateWithSuffix,
    diffDays,
  };
};
