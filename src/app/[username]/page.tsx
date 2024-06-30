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

const socials = [
  {
    img: "/images/x.svg",
    link: "",
  },
  {
    img: "/images/reddit.svg",
    link: "",
  },
  {
    img: "/images/yt.svg",
    link: "",
  },
];

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

    const cast = await fetchCastFromUrl(
      "https://warpcast.com/vrajdesai/0xb632b8b3"
    );

    console.log("cast", cast);

    await addUserDetails({
      fname: params.username,
      linkedin: "https://www.linkedin.com/in/vrajdesai78",
    });

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
      <div className='flex-center w-full min-h-screen !items-start pt-[92px] bg-[#FAFAFA] relative'>
        <div className='w-full min-h-[322px] absolute top-0 right-0 z-10'>
          <NavButton />
          <Image
            src={"/images/banner.png"}
            alt='pfp'
            width={1440}
            height={322}
            className='!w-full !h-[322px] object-cover'
          />
        </div>
        <div className='w-full max-w-[869px] relative z-30'>
          <ProfileContainer
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
              name: profileData.Socials.Social[0].profileName,
              pfp: profileData.Socials.Social[0].profileImage,
              username: params.username,
            }}
            socials={socials}
            tags={tags}
            activeChannels={activeChannels}
            topFollowers={topFollowers}
            topCasts={topCasts as TCast[]}
          />
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
  }
};

export default Page;
