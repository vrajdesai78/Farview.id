import {
  fetchActiveChannels,
  getTopNFTs,
  fetchTopCasts,
  getUserData,
  getTxnCount,
  fetchTopFollowers,
  addUser,
  getWalletWorth,
  getVisits,
  findTags,
  getUserDetails,
  fetchCastFromUrl,
  getFCDetails,
} from "../_actions/queries";
import { getFormattedDate } from "@/lib/utils";
import { TCast } from "@/types/types";
import PageContainer from "@/components/PageContainer";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

const Page = async ({ params }: { params: { username: string } }) => {
  revalidatePath("/[username]", "page");

  try {
    const profileData = await getFCDetails(params.username);
    const [
      nfts,
      topFollowers,
      topCasts,
      txnCount,
      userAdd,
      networth,
      visits,
      userData,
      airstackData,
    ] = await Promise.all([
      getTopNFTs(profileData?.address),
      fetchTopFollowers(profileData?.fid),
      fetchTopCasts(profileData?.fid),
      getTxnCount(profileData?.address),
      addUser(params.username),
      getWalletWorth(profileData?.address),
      getVisits(params.username),
      getUserDetails(params.username),
      getUserData(params.username),
    ]);

    const activeChannels = await fetchActiveChannels(profileData?.fid);

    let cast = null;

    if (userData?.cast) {
      cast = await fetchCastFromUrl(userData.cast);
    }

    const tags = await findTags(networth, txnCount, Number(profileData?.fid));

    let date = new Date();
    if (airstackData.Wallet.tokenTransfers[0]) {
      date = new Date(airstackData.Wallet.tokenTransfers[0].blockTimestamp);
    }

    const { formattedDateWithSuffix } = getFormattedDate(date);

    const filteredNfts = nfts.filter((nft) => nft.imageUrl && nft.name);

    return (
      <PageContainer
        stats={[
          {
            title: "Networth (Base)",
            val: networth.toFixed(2) + " USD",
            isIcon: false,
          },
          {
            title: "Txns on Base",
            val: txnCount,
            isIcon: false,
          },
          {
            title: "First txn on Base",
            val: formattedDateWithSuffix,
            isIcon: false,
          },
          {
            title: "Profile Visits",
            val: visits,
            isIcon: false,
          },
        ]}
        nfts={filteredNfts}
        tokenBalances={airstackData.TokenBalances.TokenBalance}
        userInfo={{
          bio: profileData.bio,
          follower_count: profileData.followers,
          following_count: profileData.following,
          name: profileData.name,
          pfp: profileData.pfp,
          username: params.username,
        }}
        fid={profileData.fid}
        socials={[
          {
            type: "github",
            link: userData?.github,
          },
          {
            type: "linkedin",
            link: userData?.linkedin,
          },
          {
            type: "twitter",
            link: userData?.twitter,
          },
          {
            type: "telegram",
            link: userData?.telegram,
          },
          {
            type: "instagram",
            link: userData?.instagram,
          },
        ]}
        tags={tags}
        activeChannels={activeChannels}
        topFollowers={topFollowers}
        topCasts={
          [
            cast ?? (topCasts as TCast[])?.[0],
            cast ? (topCasts as TCast[])?.[0] : (topCasts as TCast[])?.[1],
          ] as TCast[]
        }
        userData={userData}
      />
    );
  } catch (e) {
    console.log(e);
  }
};

export default Page;
