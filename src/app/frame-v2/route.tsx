import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import {
  addUser,
  fetchTopFollowers,
  getFCDetails,
  getFarcasterDetails,
  getTxnCount,
  getUserData,
  getWalletWorth,
} from "../_actions/queries";
import { farcasterHubContext } from "frames.js/middleware";
import { getFontBuffer } from "../../../utils/getFontBuffer";
import { RegukarB64 } from "../../../utils/RegularB64";
import { SemiboldB64 } from "../../../utils/SemiBoldB64";
import { BoldB64 } from "../../../utils/Bold";
import { getFormattedDate } from "@/lib/utils";
import { formatScore } from "../../../utils/getScore";

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

const ActiveCasterContainer = ({
  title,
  icon,
  text,
  isMain,
  isRight,
  url,
}: {
  title: string;
  icon: string;
  text?: string;
  isMain?: boolean;
  isRight?: boolean;
  url?: string;
}) => {
  return (
    <div
      style={{
        gap: "12px",
      }}
      tw={`p-3 flex items-center justify-start min-h-12 ${
        isMain
          ? "w-full  border-b border-[#E5E5E5] rounded-t-2xl"
          : !isRight
          ? "w-1/2 border-r border-[#E5E5E5] rounded-bl-2xl"
          : "w-1/2 rounded-br-2xl"
      } ${url ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (url) {
          window.open(url, "_blank");
        }
      }}
    >
      <img
        src={icon}
        tw={`${isMain ? "w-8 h-8" : "w-6 h-6"} rounded-full`}
        alt=""
      />

      <div tw="flex flex-col justify-start !items-start gap-0.5 w-full text-nowrap">
        <span tw="text-[#262626] font-medium text-sm text-ellipsis text-nowrap w-4/5 overflow-hidden">
          {title.length > 8 ? `${title.slice(0, 8)}...` : title}
        </span>
        {text && (
          <span tw="text-[#737373] font-normal text-[10px]">{text}</span>
        )}
      </div>
    </div>
  );
};
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

  const [topFollowers, txnCount, userAdd, networth, airstackData] =
    await Promise.all([
      fetchTopFollowers(profileData?.fid),
      getTxnCount(profileData?.address),
      addUser(fname ?? name),
      getWalletWorth(profileData?.address),
      getUserData(fname ?? name),
    ]);

  let date = new Date();
  if (airstackData.Wallet.tokenTransfers[0]) {
    date = new Date(airstackData?.Wallet?.tokenTransfers[0]?.blockTimestamp);
  }

  const { formattedDateWithSuffix } = getFormattedDate(date);

  const stats = [
    {
      title: "Net Worth",
      val: `$${networth?.toFixed(2) ?? "Not found"}`,
      isIcon: false,
    },
    {
      title: "Txns on Base",
      val: txnCount?? "Not found",
      isIcon: false,
    },
    {
      title: "First txn on Base",
      val: formattedDateWithSuffix,
      isIcon: false,
    },
    {
      title: "Social Score",
      val: formatScore(
        Number(
          airstackData.Socials.Social[0].socialCapital.socialCapitalScoreRaw
        )
      ),
      isIcon: false,
    },
  ];

  return {
    image: (
      <div
        style={{
          background: `url("https://i.ibb.co/Ksvtf8X/frame-bg.png")`,
          backgroundSize: "570px 320px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
        }}
        tw="flex items-center justify-between p-6 w-full h-full"
      >
        <div
          style={{
            display: "flex",
            backdropFilter: "blur(20px)",
            gap: "20px",
          }}
          tw="flex flex-col max-w-[40%] items-start justify-between"
        >
          <div tw="flex flex-col items-start justify-start gap-0.5">
            <span tw="text-[#814C9F] font-normal text-xs">
              POWERED BY
              <br />
            </span>
            <span
              style={{ fontFamily: "Rubik Bold" }}
              tw="text-lg text-[#814C9F] font-bold"
            >
              FARVIEW
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "6px",
            }}
            tw=" w-full max-w-full flex flex-col items-start gap-4"
          >
            <img
              loading="lazy"
              style={{
                objectFit: "cover",
                boxShadow: "0px 1.271px 5.082px 0px rgba(0, 0, 0, 0.25)",
              }}
              src={profileData.pfp}
              tw="w-20 h-20 rounded-[8px] "
            />
            <div
              style={{
                display: "flex",
                gap: "2px",
              }}
              tw=" w-full max-w-full flex flex-col items-start gap-2"
            >
              <span
                style={{
                  fontFamily: "Rubik SemiBold",
                  margin: 0,
                }}
                tw="text-lg font-semibold text-black"
              >
                {profileData.name}
              </span>
              <span
                style={{ fontFamily: "Rubik SemiBold", margin: 0 }}
                tw="text-sm font-semibold text-[#737373]"
              >
                @{profileData.username}
              </span>
              <p
                style={{
                  margin: 0,
                }}
                tw="text-[#737373] font-normal text-sm text-start max-w-full "
              >
                {profileData.bio.length > 25
                  ? `${profileData.bio.slice(0, 25) + "..."}.`
                  : `${profileData.bio}`}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                }}
                tw="flex items-center justify-start w-full  gap-4"
              >
                <span tw="text-sm text-[#737373] font-normal">
                  Followers
                  <span tw="text-[#7F56D9] font-semibold ml-1">
                    {profileData.followers >= 1000
                      ? `${Number(profileData.followers / 1000).toFixed(2)}k`
                      : profileData.followers}
                  </span>
                </span>

                {/* following count */}
                <span tw="text-sm text-[#737373] font-normal ml-5">
                  Following
                  <span tw="text-[#7F56D9] font-semibold ml-1">
                    {profileData.following >= 1000
                      ? `${Number(profileData.following / 1000).toFixed(2)}k`
                      : profileData.following}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
          tw="flex-col flex items-center justify-start gap-10 w-[50%] "
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
            tw="w-full flex items-center justify-between gap-2 flex-wrap "
          >
            {stats.map(({ title, isIcon, val }) => {
              return (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                  tw="flex flex-col justify-start bg-white !items-start px-2 py-2 gap-1 border h-16 border-[#E5E5E5] rounded-lg w-[120px] h-auto"
                >
                  <span tw="text-[#737373] font-normal text-xs sm:text-sm  ">
                    {title}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                    }}
                    tw="flex items-center justify-start gap-1"
                  >
                    <span tw="text-[#171717] font-medium text-sm sm:text-base">
                      {val}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
            tw="flex flex-col justify-start w-full !items-start gap-2"
          >
            <span tw="text-[#737373] text-sm font-semibold uppercase">
              TOP followers
            </span>
            <div
              tw="flex flex-col justify-start w-full bg-white rounded-2xl"
              style={{
                display: "flex",
                boxShadow:
                  "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
              }}
            >
              <ActiveCasterContainer
                text={`${
                  topFollowers[0].val >= 1000
                    ? `${Number(topFollowers[0].val / 1000).toFixed(2)}k`
                    : topFollowers[0].val.toFixed(2)
                } Followers`}
                key={"main channel"}
                icon={topFollowers[0].icon}
                title={`/${topFollowers[0].title}`}
                isMain={true}
              />

              <div
                style={{
                  display: "flex",
                }}
                tw="flex items-center justify-between w-full"
              >
                {topFollowers.slice(1, 3).map(({ icon, title, val }, index) => {
                  return (
                    <ActiveCasterContainer
                      text={
                        val >= 1000
                          ? `${Number(val / 1000).toFixed(2)}k`
                          : val.toFixed(2)
                      }
                      key={index}
                      icon={icon}
                      title={`/${title}`}
                      isMain={false}
                      isRight={index === 1}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    buttons: [
      <Button
        action="link"
        target={`https://farview.id/${fname}`}
        key={"profile"}
      >
        View Full Profile
      </Button>,
      fname ? (
        <Button
          action="link"
          target={`https://warpcast.com/~/channel/farview`}
          key={"myframe"}
        >
          Follow Farview
        </Button>
      ) : (
        <Button
          action="link"
          key={"share"}
          target={`https://warpcast.com/~/compose?embeds[]=${process.env.NEXT_PUBLIC_BASE_URL}/roast/getRoast?fname=${fname}&roast=&img=${profileData.pfp}`}
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
