import Profile from "@/components/Profile";
import {
  fetchActiveChannels,
  getTopNFTs,
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
  console.log("profile", profileData);
  console.log("activeChannels", activeChannels);
  return <Profile username={params.username} />;
};

export default Page;
