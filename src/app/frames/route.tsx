import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import {
  fetchActiveChannels,
  getFarcasterName,
  getTxnCount,
  getUserData,
} from "../_actions/queries";
import { getFormattedDate } from "@/lib/utils";
import { TActiveChannels } from "@/types/types";

export const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  // dummy tags
  // const tags = [
  //   {
  //     title: `40+ txns on Base`,
  //     icon: "💸",
  //   },
  //   {
  //     title: `First txn on Base - 20 October 2023`,
  //     icon: "🥇",
  //   },
  //   {
  //     title: `200 D since First Base txn`,
  //     icon: "⌛️",
  //   },
  // ];
  // const activeChannels = [
  //   {
  //     title: `fbi`,
  //     icon: "/images/fbiChannel.svg",
  //   },
  //   {
  //     title: `higher`,
  //     icon: "/images/higherChannel.svg",
  //   },
  //   {
  //     title: `degen`,
  //     icon: "/images/degenChannel.svg",
  //   },
  // ];

  const { searchParams } = new URL(ctx.url);
  const fname = searchParams.get("fname");

  if (!fname) {
    throw new Error("No fname provided");
  }

  const profileData = await getUserData(fname);
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
        tw="flex  flex-col items-center justify-start p-8 py-10 w-full h-full bg-[#7F5FC6]"
      >
        {/* info and channels */}
        <div tw="w-full flex justify-between items-center">
          {/* user info */}
          <div
            style={{
              gap: "16px",
            }}
            tw="flex flex-col "
          >
            <div
              style={{
                gap: "16px",
              }}
              tw="flex "
            >
              <img
                style={{
                  objectFit: "cover",
                }}
                tw="h-12 w-12 rounded-full "
                src={profileData.Socials.Social[0].profileImage}
              />
              <div
                style={{
                  gap: "2px",
                }}
                tw="flex flex-col text-white "
              >
                <span tw="font-bold text-base">@{fname}</span>
                <div
                  style={{
                    gap: "6px",
                  }}
                  tw="flex   font-semibold text-sm"
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
              tw="flex-col flex items-start justify-start "
            >
              {tags.map(({ icon, title }: any, id: number) => (
                <div
                  style={{
                    gap: "10px",
                  }}
                  tw="px-4 py-3 flex bg-[#6440B4] rounded-full border border-[#543696] justify-center items-center flex"
                >
                  <div tw="rounded-3xl justify-center items-center flex font-normal">
                    {/* tag icon */}
                    <span tw="text-sm">{icon}</span>
                  </div>

                  {/* tag title */}
                  <span tw="text-center text-white text-sm font-normal tracking-tight">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* active channels */}
          <div
            tw={`bg-[#6440B4] border relative border-[#543696] rounded-3xl flex flex-col  items-center w-[188px]  gap-6 justify-between h-[230px] p-6`}
          >
            <div
              style={{
                gap: "20px",
                flexDirection: "column",
                flexWrap: "wrap",
                display: "flex",
              }}
              tw=" justify-start items-start w-full"
            >
              {activeChannels.length === 0 ? (
                <span tw=" text-[10px] md:text-xs  text-primary-grey font-normal max-w-[100px] text-center ">
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
                        tw="justify-start items-center gap-2 flex flex-row "
                      >
                        {/* not using Next Image here bcq we are getting pfp url hosted on different domain i.imgur.com and next doesn't allow this */}
                        <img
                          tw="rounded-full max-w-9 max-h-9 object-cover"
                          height={36}
                          width={36}
                          alt="icon"
                          // loader={() => channelIcon}
                          src={imageUrl}
                        />
                        <div tw=" text-white flex text-base font-semibold leading-tight">
                          /{name}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <span tw="text-center text-white text-xs font-normal tracking-tight">
              {"Active Caster"}
            </span>
          </div>
        </div>

        <div tw="text-center flex text-white">
          <span tw="text-sm font-normal ">Frame via</span>{" "}
          <span tw="text-sm font-semibold ml-1">Farview.id</span>
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target={{ query: { value: "Yes" } }}>
        View Full Profile
      </Button>,
      <Button action="post" target={{ query: { value: "No" } }}>
        See My Frame
      </Button>,
    ],
    imageOptions: {
      aspectRatio: "1.91:1",
      width: "570",
      height: "320",
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
