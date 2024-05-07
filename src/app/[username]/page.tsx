import Profile from "@/components/Profile";
import {
  fetchActiveChannels,
  getTopNFTs,
  fetchTopCasts,
  getUserData,
  getTxnCount,
  fetchTopFollowers,
  getFollowingFollowers,
} from "../_actions/queries";
import { getFormattedDate } from "@/lib/utils";
import { TCast, TokenBalances } from "@/types/types";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { username: string } }) => {
  try {
    const profileData = await getUserData(params.username);

    const [
      nfts,
      activeChannels,
      topFollowers,
      topCasts,
      txnCount,
      followingFollowers,
    ] = await Promise.all([
      getTopNFTs(profileData.Socials.Social[0].userAssociatedAddresses[1]),
      fetchActiveChannels(profileData.Socials.Social[0].userId),
      fetchTopFollowers(profileData.Socials.Social[0].userId),
      fetchTopCasts(profileData.Socials.Social[0].userId),
      getTxnCount(profileData.Socials.Social[0].userAssociatedAddresses[1]),
      getFollowingFollowers(profileData.Socials.Social[0].profileName),
    ]);

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
          follower_count: followingFollowers.followers,
          following_count: followingFollowers.followings,
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
