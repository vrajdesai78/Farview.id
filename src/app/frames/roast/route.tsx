import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import {
  fetchActiveChannels,
  getFarcasterDetails,
  getTxnCount,
  getUserData,
} from "../../_actions/queries";
import { getFormattedDate } from "@/lib/utils";
import { TActiveChannels } from "@/types/types";
import ShortenName from "../../../../utils/nameShortner";
import { farcasterHubContext } from "frames.js/middleware";
import {
  formatScore,
  getOrdinalIndicator,
  getTopRank,
} from "../../../../utils/getScore";
import { getFontBuffer } from "../../../../utils/getFontBuffer";
import { RegukarB64 } from "../../../../utils/RegularB64";
import { SemiboldB64 } from "../../../../utils/SemiBoldB64";
import { BoldB64 } from "../../../../utils/Bold";

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
  // if (!fname) {
  //     if (ctx.message && ctx.message.requesterFid) {
  //         const data = await getFarcasterDetails(
  //             ctx.message.requesterFid.toString()
  //         );
  //         name = data.Socials.Social[0].profileName;
  //     }
  // }

  // const profileData = await getUserData(fname ?? name);
  // const txnCount = await getTxnCount(
  //     profileData?.Socials?.Social?.[0]?.userAssociatedAddresses[1]
  // );

  // const score =
  //     profileData?.Socials?.Social[0]?.socialCapital?.socialCapitalScoreRaw;

  // const rank = await getTopRank(
  //     Number(profileData?.Socials?.Social[0]?.socialCapital?.socialCapitalScore)
  // );

  // let date = new Date();
  // if (profileData?.Wallet?.tokenTransfers?.[0]) {
  //     date = new Date(profileData.Wallet.tokenTransfers[0].blockTimestamp);
  // }

  // const { formattedDateWithSuffix, diffDays } = getFormattedDate(date);

  // const tags = [
  //     {
  //         title: `${txnCount ?? 0}+ txns on Base`,
  //         icon: "💸",
  //     },
  //     {
  //         title: `First txn on Base - ${formattedDateWithSuffix ?? 0}`,
  //         icon: "🥇",
  //     },
  //     {
  //         title: `${diffDays ?? 0} D since First Base txn`,
  //         icon: "⌛️",
  //     },
  // ];

  // const activeChannels = await fetchActiveChannels(
  //     profileData.Socials.Social[0].userId
  // );

  return {
    image: (
      <div
        style={{
          display: "flex",
          gap: "12px",
          background: `url("https://i.ibb.co/xY2H94r/roast-bg.png")`,
          backgroundSize: "570px 320px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        tw='flex  flex-col items-center justify-center p-8  w-full h-full'
      >
        <div className='flex flex-col p-4 rounded-[8px] shadow-sm backdrop-blur-[10.5px] bg-[#FFE7C1] bg-opacity-20 max-w-[475px]'>
          <img
            loading='lazy'
            // src={profileData.Socials.Social[0].profileImage}
            src={
              "https://s3-alpha-sig.figma.com/img/8f1f/ea3f/73a9bf25e113c6f0f20d3712550db87c?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fzbYrP6j6y6etmRcssEEADTHFED7yw6foarBGlp~Q~dTIXwWtg3~anUQdx-R5RA43G7uA8WtYd6yQZalGY46i08Vv~S8wiTtUvbn9ZoF12clipupbV3QZ8iKG7C6~OxXm9M0KsXt89E9rEGCejRDp1SYw0pcO5QmGz86TaNqFEmV2-LicD3lps9AyyKHum7OnbFzb0ttc-hWQ0pCVd9a8ll0QvSnxwjV4qWs-TciKu-hjEkSK~NVIYZI~INnheDiueSAeOABoFXC8yW7m0dYha16DWoWumRK-X7XXRz4~AJsZyHt2bLhdeIt3nBf1ryn6gIp~rfhXgqKuC~hu9MKlw__"
            }
            className='w-8 rounded-full aspect-square'
          />
          <span
            style={{ fontFamily: "Rubik SemiBold" }}
            className='mt-1 text-lg font-semibold  leading-6 text-[#FFE4A0]'
          >
            {/* @{profileData.Socials.Social[0].profileName} */}
            @kushal
          </span>
          <span
            style={{ fontFamily: "Rubik" }}
            className='mt-2.5 text-base font-normal leading-6 text-[#FFEDC0] capitalize'
          >
            Sodales sit nam molestie nisl at accumsan vitae molestie pretium.
            Consequat tortor sit quis eu. Velit et a scelerisque commodo non
            molestie feugiat vitae pretium. Nisi in diam ultricies aliquam amet
            bibendum ultricies tellus. Tellus sit non in et et dapibus aliquam.
            Adipiscing fames pulvinar tellus volutpat ut.
          </span>
        </div>

        <span
          style={{ display: "flex" }}
          tw='text-center flex text-[#FFE4A0] mt-2'
        >
          <span style={{ fontFamily: "Rubik" }} tw='text-sm font-normal '>
            Frame via
          </span>{" "}
          <span
            style={{ fontFamily: "Rubik Bold", fontWeight: 800 }}
            tw='text-sm ml-1'
          >
            Farview.id
          </span>
        </span>
      </div>
    ),
    buttons: [
      <Button
        action='link'
        target={`https://farview.id/${fname ?? name}`}
        key={"profile"}
      >
        View Full Profile
      </Button>,
      fname ? (
        <Button
          action='post'
          target={`${process.env.NEXT_PUBLIC_BASE_URL}/frames`}
          key={"myframe"}
        >
          See My Frame
        </Button>
      ) : (
        <Button
          action='link'
          key={"share"}
          target={`https://warpcast.com/~/compose?embeds[]=https://www.farview.id/frames?fname=${name}`}
        >
          Share on Warpcast
        </Button>
      ),
    ],
    imageOptions: {
      aspectRatio: "1.91:1",
      width: 570,
      height: 320,
      fonts: [
        {
          name: "Rubik",
          weight: 400,
          data: getFontBuffer(RegukarB64),
        },
        {
          name: "Rubik SemiBold",
          weight: 600,
          data: getFontBuffer(SemiboldB64),
        },
        {
          name: "Rubik Bold",
          weight: 800,
          data: getFontBuffer(BoldB64),
        },
      ],
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
