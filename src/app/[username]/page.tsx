import Profile from "@/components/Profile";
import {
  fetchActiveChannels,
  getTopNFTs,
  fetchTopCasts,
  getUserData,
  getTxnCount,
  fetchTopFollowers,
  getFarcasterName,
  addUser,
} from "../_actions/queries";
import { getFormattedDate } from "@/lib/utils";
import { TCast, TokenBalances } from "@/types/types";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const { name, pfp } = await getFarcasterName(params.username);
  return {
    title: `${name}'s Profile`,
    description: `Check out ${name}'s profile on Farview!`,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDynamicOg?fname=${params.username}`,
        },
      ],
    },
    icons: [
      {
        rel: "icon",
        url: pfp,
      },
      {
        rel: "favicon",
        url: pfp,
      },
    ],
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDynamicOg?fname=${params.username}`,
      "fc:frame:image:aspect_ratio": "1:1",
    },
  };
}

const Page = async ({ params }: { params: { username: string } }) => {
  try {
    const profileData = await getUserData(params.username);

    const [nfts, topFollowers, topCasts, txnCount, addUserForAnalytics] =
      await Promise.all([
        getTopNFTs(profileData.Socials.Social[0].userAssociatedAddresses[1]),
        fetchTopFollowers(profileData.Socials.Social[0].userId),
        fetchTopCasts(profileData.Socials.Social[0].userId),
        getTxnCount(profileData.Socials.Social[0].userAssociatedAddresses[1]),
        addUser(profileData.Socials.Social[0].profileName),
      ]);

    const activeChannels =
      profileData?.FarcasterChannelParticipants?.FarcasterChannelParticipant?.map(
        ({ channelId, channel }: any) => ({
          name: channelId as string,
          imageUrl: channel.imageUrl as string,
          url: `https://warpcast.com/~/channel/${channelId}`,
        })
      );

    let date = new Date();
    if (profileData.Wallet.tokenTransfers[0]) {
      date = new Date(profileData.Wallet.tokenTransfers[0].blockTimestamp);
    }

    const { formattedDateWithSuffix, diffDays } = getFormattedDate(date);

    return (
      <Profile
        userData={{
          bio: profileData.Socials.Social[0].profileBio,
          pfp_url: profileData.Socials.Social[0].profileImage,
          follower_count: profileData.Socials.Social[0].followerCount,
          following_count: profileData.Socials.Social[0].followingCount,
          username: profileData.Socials.Social[0].profileName,
          display_name: profileData.Socials.Social[0].profileDisplayName,
          firstTxn: formattedDateWithSuffix,
          daysSinceFirstTxn: diffDays,
          txnCount: txnCount,
        }}
        fid={profileData.Socials.Social[0].userId}
        nfts={nfts}
        activeChannels={activeChannels}
        topFollowers={topFollowers!}
        topCast={topCasts as TCast}
        Tokens={profileData.TokenBalances as TokenBalances}
      />
    );
  } catch (error) {
    redirect("/");
  }
};

export default Page;
