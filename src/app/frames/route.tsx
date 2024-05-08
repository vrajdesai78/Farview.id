import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  // dummy tags
  const tags = [
    {
      title: `40+ txns on Base`,
      icon: "💸",
    },
    {
      title: `First txn on Base - 20 October 2023`,
      icon: "🥇",
    },
    {
      title: `200 D since First Base txn`,
      icon: "⌛️",
    },
  ];
  const activeChannels = [
    {
      title: `fbi`,
      icon: "/images/fbiChannel.svg",
    },
    {
      title: `higher`,
      icon: "/images/higherChannel.svg",
    },
    {
      title: `degen`,
      icon: "/images/degenChannel.svg",
    },
  ];

  return {
    image: (
      <div tw="flex gap-3 flex-col items-center justify-start p-8 py-10 w-full h-full bg-[#7F5FC6]">
        {/* info and channels */}
        <div tw="w-full flex justify-between items-center">
          {/* user info */}
          <div tw="flex flex-col gap-4">
            <div tw="flex gap-4">
              <img
                style={{
                  objectFit: "cover",
                }}
                tw="h-12 w-12 rounded-full "
                src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/85687246-d19f-4cc1-3987-f4e5a9ad4b00/rectcrop3"
              />
              <div tw="flex flex-col gap-2 text-white ">
                <span tw="font-bold text-base">@vrajdesai</span>
                <div tw="flex gap-2  font-semibold text-sm">
                  <span>Followers: 43</span>
                  <span>Following: 28</span>
                </div>
              </div>
            </div>
            <div tw="flex-col flex items-start justify-start gap-2">
              {tags.map(({ icon, title }: any, id: number) => (
                <div tw="px-4 py-3 bg-[#6440B4] rounded-full border border-[#543696] justify-center items-center gap-2.5 inline-flex">
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
            <div tw="flex-col justify-start items-center lg:items-start gap-5 inline-flex w-full">
              {activeChannels.length === 0 ? (
                <span tw=" text-[10px] md:text-xs  text-primary-grey font-normal max-w-[100px] text-center ">
                  This user is not active in any channels
                </span>
              ) : (
                <>
                  {activeChannels.map(({ title, icon }: any, id: number) => (
                    <div tw="justify-center items-center gap-2 flex lg:flex-row flex-col">
                      {/* not using Next Image here bcq we are getting pfp url hosted on different domain i.imgur.com and next doesn't allow this */}
                      <img
                        tw="rounded-full max-w-9 max-h-9 object-cover"
                        height={36}
                        width={36}
                        alt="icon"
                        // loader={() => channelIcon}
                        src={icon}
                      />
                      <div tw=" text-white text-base font-semibold leading-tight">
                        /{title}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <span tw="text-center text-white text-xs font-normal tracking-tight">
              {"Active Caster"}
            </span>
          </div>
        </div>

        <div tw="text-center text-white">
          <span tw="text-sm font-normal ">Frame via</span>{" "}
          <span tw="text-sm font-semibold ">Farview.id</span>
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
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
