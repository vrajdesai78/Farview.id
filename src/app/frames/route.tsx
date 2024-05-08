import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import {
  fetchActiveChannels,
  getFarcasterDetails,
  getTxnCount,
  getUserData,
} from "../_actions/queries";
import { getFormattedDate } from "@/lib/utils";
import { TActiveChannels } from "@/types/types";
import ShortenName from "../../../utils/nameShortner";
import { farcasterHubContext } from "frames.js/middleware";

export const runtime = "edge";

const soraRegular = fetch(
  new URL("../../../public/fonts/Sora-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const soraSemiBold = fetch(
  new URL("../../../public/fonts/Sora-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const soraBold = fetch(
  new URL("../../../public/fonts/Sora-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

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
  const [soraRegularFont, soraSemiBoldFont, soraBoldFont] = await Promise.all([
    soraRegular,
    soraSemiBold,
    soraBold,
  ]);

  const { searchParams } = new URL(ctx.url);
  const fname = searchParams.get("fname");
  let name = "";
  if (!fname) {
    if (ctx.message && ctx.message.requesterFid) {
      const data = await getFarcasterDetails(
        ctx.message.requesterFid.toString()
      );
      name = data.Socials.Social[0].profileName;
      console.log("Name", name);
    }
  }

  const profileData = await getUserData(fname ?? name);
  const txnCount = await getTxnCount(
    profileData.Socials.Social[0].userAssociatedAddresses[1]
  );

  let date = new Date();
  if (profileData.Wallet.tokenTransfers[0]) {
    date = new Date(profileData.Wallet.tokenTransfers[0].blockTimestamp);
  }

  const { formattedDateWithSuffix, diffDays } = getFormattedDate(date);

  const tags = [
    {
      title: `${txnCount}+ txns on Base`,
      icon: "💸",
    },
    {
      title: `First txn on Base - ${formattedDateWithSuffix}`,
      icon: "🥇",
    },
    {
      title: `${diffDays} D since First Base txn`,
      icon: "⌛️",
    },
  ];

  const activeChannels = await fetchActiveChannels(
    profileData.Socials.Social[0].userId
  );

  const follower_count = profileData.Socials.Social[0].followerCount;
  const following_count = profileData.Socials.Social[0].followingCount;

  return {
    image: (
      <div
        style={{
          gap: "12px",
        }}
        tw='flex  flex-col items-center justify-start p-8 py-10 w-full h-full bg-[#7F5FC6]'
      >
        {/* info and channels */}
        <div tw='w-full flex justify-between items-center'>
          {/* user info */}
          <div
            style={{
              gap: "16px",
            }}
            tw='flex flex-col '
          >
            <div
              style={{
                gap: "16px",
              }}
              tw='flex '
            >
              <img
                style={{
                  objectFit: "cover",
                }}
                tw='h-12 w-12 rounded-full '
                src={profileData.Socials.Social[0].profileImage}
              />
              <div
                style={{
                  gap: "2px",
                }}
                tw='flex flex-col text-white '
              >
                <span tw='font-bold text-base'>@{fname}</span>
                <div
                  style={{
                    gap: "6px",
                  }}
                  tw='flex   font-semibold text-sm'
                >
                  <span>
                    Followers:{" "}
                    {follower_count >= 1000
                      ? `${Number(follower_count / 1000).toFixed(2)}k`
                      : follower_count}
                  </span>
                  <span>
                    Following:{" "}
                    {following_count >= 1000
                      ? `${Number(following_count / 1000).toFixed(2)}k`
                      : following_count}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                gap: "8px",
              }}
              tw='flex-col flex items-start justify-start '
            >
              {tags.map(({ icon, title }: any, id: number) => (
                <div
                  style={{
                    gap: "10px",
                  }}
                  key={id}
                  tw='px-4 py-3 flex bg-[#6440B4] rounded-full border border-[#543696] justify-center items-center flex'
                >
                  <div tw='rounded-3xl justify-center items-center flex font-normal'>
                    {/* tag icon */}
                    <span tw='text-sm'>{icon}</span>
                  </div>

                  {/* tag title */}
                  <span tw='text-center text-white text-sm font-normal tracking-tight'>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* active channels */}
          <div
            tw={`bg-[#6440B4] border relative border-[#543696] rounded-3xl flex flex-col  items-center w-[188px] gap-6 justify-between h-[230px] p-6`}
          >
            <div
              style={{
                gap: "20px",
                flexDirection: "column",
                flexWrap: "wrap",
                display: "flex",
              }}
              tw=' justify-start items-start w-full'
            >
              {activeChannels.length === 0 ? (
                <span tw=' text-[10px] md:text-xs  text-primary-grey font-normal max-w-[100px] text-center '>
                  This user is not active in any channels
                </span>
              ) : (
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: 16,
                  }}
                >
                  {activeChannels.map(
                    ({ name, imageUrl }: TActiveChannels, id: number) => (
                      <div
                        style={{
                          gap: "8px",
                        }}
                        key={id}
                        tw='justify-start items-center gap-2 flex flex-row '
                      >
                        {/* not using Next Image here bcq we are getting pfp url hosted on different domain i.imgur.com and next doesn't allow this */}
                        <img
                          tw='rounded-full max-w-9 max-h-9 object-cover'
                          height={36}
                          width={36}
                          alt='icon'
                          // loader={() => channelIcon}
                          src={imageUrl}
                        />
                        <div tw=' text-white flex text-base font-semibold leading-tight'>
                          /{ShortenName(name, 8)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <span tw='text-center text-white text-xs font-normal tracking-tight'>
              {"Active Caster"}
            </span>
          </div>
        </div>

        <div tw='text-center flex text-white'>
          <span tw='text-sm font-normal '>Frame via</span>{" "}
          <span tw='text-sm font-semibold ml-1'>Farview.id</span>
        </div>
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
          name: "Sora",
          weight: 400,
          data: soraRegularFont,
        },
        {
          name: "Sora",
          weight: 600,
          data: soraSemiBoldFont,
        },
        {
          name: "Sora",
          weight: 700,
          data: soraBoldFont,
        },
      ],
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
