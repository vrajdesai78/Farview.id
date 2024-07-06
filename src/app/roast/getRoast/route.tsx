import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import { getRoast } from "../../_actions/queries";
import { farcasterHubContext } from "frames.js/middleware";
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
  const img = searchParams.get("img") ?? "";
  const followers = Number(searchParams.get("followers")) ?? 0;
  const following = Number(searchParams.get("following")) ?? 0;
  const bio = searchParams.get("bio") ?? "";
  const walletWorth = searchParams.get("walletWorth") ?? "";

  const roast = await getRoast({
    walletWorth,
    followers,
    following,
    bio,
  });

  console.log("roast", roast);

  return {
    image: (
      <div
        style={{
          background: `url("https://i.ibb.co/xY2H94r/roast-bg.png")`,
          backgroundSize: "570px 320px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
        }}
        tw='flex  flex-col items-center justify-center p-8  w-full h-full'
      >
        <div
          style={{
            display: "flex",
            backdropFilter: "blur(20px)",
            boxShadow: "nset 0 0 10px #FFE4A0",
          }}
          tw='flex flex-col p-4 rounded-[8px] shadow-sm bg-[#FFE7C1] bg-opacity-20 max-w-[475px]'
        >
          <img
            loading='lazy'
            style={{
              objectFit: "cover",
            }}
            src={img}
            tw='w-8 rounded-full '
          />
          <span
            style={{ fontFamily: "Rubik SemiBold" }}
            tw='mt-1 text-lg font-semibold  leading-6 text-[#FFE4A0]'
          >
            @{fname}
          </span>
          <span
            style={{ fontFamily: "Rubik" }}
            tw='mt-2 text-base font-normal leading-6 text-[#FFEDC0] capitalize'
          >
            {roast}
          </span>
        </div>

        <span
          style={{ display: "flex" }}
          tw='text-center flex text-[#FFE4A0] mt-2'
        >
          <span style={{ fontFamily: "Rubik" }} tw='text-sm font-normal '>
            Powered By
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
          Follow Farview
        </Button>
      ) : (
        <Button
          action='link'
          key={"share"}
          target={`https://warpcast.com/~/compose?embeds[]=https://www.farview.id/frames?fname=${fname}`}
        >
          Share your roast
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
