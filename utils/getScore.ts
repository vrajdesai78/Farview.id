import { allScore } from "./SCS";

export const getTopRank = async (score: number) => {
  const index = allScore.data.Socials.Social.findIndex((user: any) => {
    console.log("check", user.socialCapital.socialCapitalScore, score);
    return user.socialCapital.socialCapitalScore === score;
  });

  return index !== -1 ? index + 1 : 0;
};

export function getOrdinalIndicator(number: number): string {
  let j = number % 10,
    k = number % 100;
  if (j == 1 && k != 11) {
    return number + "st";
  }
  if (j == 2 && k != 12) {
    return number + "nd";
  }
  if (j == 3 && k != 13) {
    return number + "rd";
  }
  return number + "th";
}

export function formatScore(score: number): string {
  if (score >= 1e12) {
    return (score / 1e12).toFixed(2) + "T";
  } else if (score >= 1e9) {
    return (score / 1e9).toFixed(2) + "B";
  } else if (score >= 1e6) {
    return (score / 1e6).toFixed(2) + "M";
  } else {
    return score.toString();
  }
}
