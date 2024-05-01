import Profile from "@/components/Profile";
import { fetchActiveChannels, getUserData } from "../_actions/queries";

const Page = async ({ params }: { params: { username: string } }) => {
  console.log("params", params.username);

  const profileData = await getUserData(params.username);

  const activeChannels = await fetchActiveChannels(
    profileData.Socials.Social[0].userId
  );
  console.log("profile", profileData);
  console.log("activeChannels", activeChannels);
  return <Profile username={params.username} />;
};

export default Page;
