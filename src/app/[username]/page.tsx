import Profile from "@/components/Profile";
import {
  fetchActiveChannels,
  getTopNFTs,
  fetchMostEngagedPeople,
  fetchTopCasts,
  getUserData,
} from "../_actions/queries";

const Page = async ({ params }: { params: { username: string } }) => {
  const profileData = await getUserData(params.username);

  const [nfts, activeChannels, mostEngagedPeople, topCasts] = await Promise.all(
    [
      getTopNFTs(profileData.Socials.Social[0].userAssociatedAddresses[1]),
      fetchActiveChannels(profileData.Socials.Social[0].userId),
      fetchMostEngagedPeople(profileData.Socials.Social[0].userId),
      fetchTopCasts(profileData.Socials.Social[0].userId),
    ]
  );

  const firstCastDate = new Date(
    profileData.Socials.Social[0].userCreatedAtBlockTimestamp
  ).toISOString();

  // calculate days since first cast
  const today = new Date().toISOString();
  const diff = new Date(today).getTime() - new Date(firstCastDate).getTime();
  const daysSinceFirstCast = Math.floor(diff / (1000 * 60 * 60 * 24));

  console.log("days since first cast", daysSinceFirstCast);
  console.log("firstCastDate", firstCastDate);

  return (
    <Profile
      userData={{
        bio: profileData.Socials.Social[0].profileBio,
        pfp_url: profileData.Socials.Social[0].profileImage,
        follower_count: profileData.Socials.Social[0].followerCount,
        following_count: profileData.Socials.Social[0].followingCount,
        username: profileData.Socials.Social[0].profileName,
        display_name: profileData.Socials.Social[0].profileDisplayName,
      }}
      fid={profileData.Socials.Social[0].userId}
    />
  );
};

export default Page;
