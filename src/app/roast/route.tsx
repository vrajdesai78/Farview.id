import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";

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
  return {
    image: "https://i.imgur.com/BjXHJu0.png",
    buttons: [
      <Button
        action='post'
        key={1}
        target={`${process.env.NEXT_PUBLIC_BASE_URL}/roast/loading`}
      >
        Roast Me
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
