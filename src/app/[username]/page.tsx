import Profile from "@/components/Profile";
import {
  fetchActiveChannels,
  getTopNFTs,
  fetchMostEngagedPeople,
  fetchTopCasts,
  getUserData,
  getTxnCount,
} from "../_actions/queries";
import { getFormattedDate } from "@/lib/utils";

const Page = async ({ params }: { params: { username: string } }) => {
  const profileData = await getUserData(params.username);

  const [nfts, activeChannels, mostEngagedPeople, topCasts, txnCount] =
    await Promise.all([
      getTopNFTs(profileData.Socials.Social[0].userAssociatedAddresses[1]),
      fetchActiveChannels(profileData.Socials.Social[0].userId),
      fetchMostEngagedPeople(profileData.Socials.Social[0].userId),
      fetchTopCasts(profileData.Socials.Social[0].userId),
      getTxnCount(profileData.Socials.Social[0].userAssociatedAddresses[1]),
    ]);

  const date = new Date(profileData.Wallet.tokenTransfers[0].blockTimestamp);

  const { formattedDateWithSuffix, diffDays } = getFormattedDate(date);
  getFormattedDate;
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
    />
  );
};

export default Page;
