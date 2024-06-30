import {
  fetchActiveChannels,
  getTopNFTs,
  fetchTopCasts,
  getUserData,
  getTxnCount,
  fetchTopFollowers,
  getFarcasterName,
  addUser,
  getWalletWorth,
  getVisits,
  findTags,
  addUserDetails,
  getUserDetails,
  fetchCastFromUrl,
} from "../_actions/queries";
import { getFormattedDate } from "@/lib/utils";
import { TCast, TokenBalances } from "@/types/types";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import ProfileContainer from "@/components/Profile/ProfileContainer";
import { PrivyClient } from "@privy-io/react-auth";
import NavButton from "@/components/Profile/NavButton";
import PageContainer from "@/components/PageContainer";

// export async function generateMetadata({
//   params,
// }: {
//   params: { username: string };
// }): Promise<Metadata> {
//   const { name, pfp } = await getFarcasterName(params.username);
//   console.log("name", name);
//   console.log("pfp", pfp);
//   return {
//     title: `${name}'s Profile`,
//     description: `Check out ${name}'s profile on Farview!`,
//     openGraph: {
//       images: [
//         {
//           url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDynamicOg?fname=${params.username}`,
//         },
//       ],
//     },
//     icons: [
//       {
//         rel: "icon",
//         url: pfp,
//       },
//       {
//         rel: "favicon",
//         url: pfp,
//       },
//     ],
//     other: {
//       "fc:frame": "vNext",
//       "fc:frame:image": `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDynamicOg?fname=${params.username}`,
//       "fc:frame:image:aspect_ratio": "1:1",
//     },
//   };
// }

const tags = ["FC OG", "Based", "Crypto OG"];

const Page = async ({ params }: { params: { username: string } }) => {
  try {
    const profileData = await getUserData(params.username);
    const [
      nfts,
      topFollowers,
      topCasts,
      txnCount,
      userAdd,
      networth,
      visits,
      userData,
    ] = await Promise.all([
      getTopNFTs(profileData.Socials.Social[0].userAssociatedAddresses[1]),
      fetchTopFollowers(profileData.Socials.Social[0].userId),
      fetchTopCasts(profileData.Socials.Social[0].userId),
      getTxnCount(profileData.Socials.Social[0].userAssociatedAddresses[1]),
      addUser(profileData.Socials.Social[0].profileName),
      getWalletWorth(profileData.Socials.Social[0].userAssociatedAddresses[1]),
      getVisits(params.username),
      getUserDetails(params.username),
    ]);

    const activeChannels = await fetchActiveChannels(
      profileData.Socials.Social[0].userId
    );

    let cast = null;

    if (userData?.cast) {
      cast = await fetchCastFromUrl(userData.cast);
    }

    const tags = await findTags(
      networth,
      txnCount,
      Number(profileData.Socials.Social[0].userId)
    );

    let date = new Date();
    if (profileData.Wallet.tokenTransfers[0]) {
      date = new Date(profileData.Wallet.tokenTransfers[0].blockTimestamp);
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
        tokenBalances={profileData.TokenBalances.TokenBalance}
        userInfo={{
          bio: profileData.Socials.Social[0].profileBio,
          follower_count: profileData.Socials.Social[0].followerCount,
          following_count: profileData.Socials.Social[0].followingCount,
          name: profileData.Socials.Social[0].profileDisplayName,
          pfp: profileData.Socials.Social[0].profileImage,
          username: params.username,
        }}
        fid={profileData.Socials.Social[0].userId}
        socials={[
          {
            type: "github",
            link: userData.github,
          },
          {
            type: "linkedin",
            link: userData.linkedin,
          },
          {
            type: "twitter",
            link: userData.twitter,
          },
          {
            type: "telegram",
            link: userData.telegram,
          },
          {
            type: "instagram",
            link: userData.instagram,
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
