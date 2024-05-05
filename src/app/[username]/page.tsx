import Profile from "@/components/Profile";
import {
  fetchActiveChannels,
  getTopNFTs,
  fetchMostEngagedPeople,
  fetchTopCasts,
  getUserData,
} from "../_actions/queries";

const Page = async ({ params }: { params: { username: string } }) => {
  console.log("params", params.username);

  const profileData = await getUserData(params.username);

  const nfts = await getTopNFTs(
    profileData.Socials.Social[0].userAssociatedAddresses[1]
  );

  const activeChannels = await fetchActiveChannels(
    profileData.Socials.Social[0].userId
  );
  // const activeChannels = await fetchActiveChannels(
  //   profileData.Socials.Social[0].userId
  // );
  // const mostEngagedPeople = await fetchMostEngagedPeople(
  //   profileData.Socials.Social[0].userId
  // );
  // const topCasts = await fetchTopCasts(profileData.Socials.Social[0].userId);

  // console.log("profile", profileData);
  // console.log("activeChannels", activeChannels);
  // console.log("Most Engaged people", mostEngagedPeople);
  // console.log("topCasts", topCasts);
  return (
    <Profile
      username={params.username}
      fid={profileData.Socials.Social[0].userId}
    />
  );
};

export default Page;
