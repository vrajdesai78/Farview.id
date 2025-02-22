import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";
import {
  getFCDetails,
  getFarcasterDetails,
  getUserData,
  getWalletWorth,
} from "@/app/_actions/queries";

const frames = createFrames({
  middleware: [
    farcasterHubContext({
      hubHttpUrl: "https://hubs.airstack.xyz",
      hubRequestOptions: {
        headers: {
          "x-airstack-hubs": process.env.AIRSTACK_API_KEY as string,
        },
      },
    }),
  ],
});
const handleRequest = frames(async (ctx) => {
  const { searchParams } = new URL(ctx.url);
  const fname = searchParams.get("fname");
  let name = "";
  if (!fname) {
    if (ctx.message && ctx.message.requesterFid) {
      const data = await getFarcasterDetails(
        ctx.message.requesterFid.toString()
      );
      name = data.Socials.Social[0].profileName;
    }
  }

  const profileData = await getFCDetails(fname ?? name);

  const wallet = profileData?.address;

  const walletWorth = (await getWalletWorth(wallet)) ?? "0";

  return {
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/roast-gif.gif`,
    buttons: [
      <Button
        action='post'
        key={0}
        target={`${process.env.NEXT_PUBLIC_BASE_URL}/roast/getRoast?fname=${
          fname ?? name
        }&img=${profileData?.pfp}&followers=${
          profileData?.followers
        }&following=${profileData?.following}&bio=${
          profileData?.bio
        }&walletWorth=${walletWorth}`}
      >
        Get your roast
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
