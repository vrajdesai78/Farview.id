import { getTopNFTs, getUserData } from "@/app/_actions/queries";
import OwnNfts from "@/components/OwnNfts";
import { TNFTs } from "@/types/types";
import { useHtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";
import Link from "next/link";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import ShortenName from "../../../utils/nameShortner";

export const runtime = "edge";

export default async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // getting username
    const usernameQuery = searchParams.get("username");
    const username = decodeURIComponent(usernameQuery!).toLowerCase();

    console.log(username);

    const profileData = await getUserData(username!);

    // getting pfp
    const pfp = profileData.Socials.Social[0].profileImage;

    // getting bio
    const bio = profileData.Socials.Social[0].profileBio;

    // follower and following count
    const follower_count = profileData.Socials.Social[0].followerCount;
    const following_count = profileData.Socials.Social[0].followingCount;

    const nfts = await getTopNFTs(
      profileData.Socials.Social[0].userAssociatedAddresses[1]
    );

    return new ImageResponse(
      (
        <div
          tw=' w-full h-full p-10 pt-20  relative flex flex-col items-center justify-start bg-black'
          style={{ gap: "5px" }}
        >
          <div tw=' w-full  relative flex items-center justify-between'>
            <div
              tw=' w-1/2 h-full  relative flex flex-col items-start justify-start max-w-1/2 '
              style={{
                gap: "10px",
              }}
            >
              <div
                style={{
                  borderRadius: "9999px",
                }}
                tw='w-20 h-20  flex items-center justify-center'
              >
                <img
                  src={pfp!}
                  alt='Profile Image'
                  style={{
                    objectFit: "cover",
                  }}
                  tw='w-full h-full '
                />
              </div>
              <h1
                style={{
                  margin: "0px",
                  fontWeight: 900,
                }}
                tw='font-mono text-lg  text-white'
              >
                @{username}
              </h1>

              <p
                style={{
                  margin: "0px",
                  fontWeight: 400,
                  color: "rgba(255,255,255, 60)",
                }}
                tw='font-mono text-xs font-normal '
              >
                {ShortenName(bio, 100)}
              </p>
            </div>

            <div
              style={{
                gap: "20px",
              }}
              tw=' w-1/2 h-full  relative flex flex-col items-center justify-start  max-w-1/2'
            >
              <span tw='text-lg text-white font-normal'>
                Followers
                <span tw='text-[#7F5FC6] font-semibold ml-2'>
                  {follower_count >= 1000
                    ? `${Number(follower_count / 1000).toFixed(2)}k`
                    : follower_count}
                </span>
              </span>

              {/* following count */}
              <span tw='text-lg text-white font-normal'>
                Following
                <span tw='text-[#7F5FC6] font-semibold ml-2'>
                  {following_count >= 1000
                    ? `${Number(following_count / 1000).toFixed(2)}k`
                    : following_count}
                </span>
              </span>
            </div>
          </div>
          <div
            tw='flex w-full items-start justify-center flex-col  '
            style={{
              gap: "10px",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "white",
              }}
              tw='text-lg'
            >
              TOP NFTs :
            </h1>
            <div
              tw=' flex justify-start items-center w-full'
              style={{
                gap: 40,
              }}
            >
              {nfts.length === 0 ? (
                <div tw='flex flex-col items-center justify-center gap-2'>
                  <span tw='text-lg font-normal text-[rgba(255,255,255,0.8)]'>
                    No NFTs on Base yet
                  </span>
                  <span tw='text-[rgba(255,255,255,0.8)]'>
                    (Check your FC connected wallet)
                  </span>
                </div>
              ) : (
                <>
                  {nfts.map((nft: TNFTs, id: number) => (
                    <Link
                      tw='flex flex-col items-center justify-start '
                      key={id}
                      style={{
                        marginLeft: 10,
                        gap: 10,
                      }}
                      href={nft.nftUrl}
                      target='_blank'
                    >
                      {/* nft img */}
                      <img
                        src={nft.imageUrl}
                        alt=''
                        tw='w-16 h-16 rounded-2xl'
                      />
                      {/* nft icon */}
                      <span tw=' text-[10px] md:text-xs  text-[rgba(255,255,255,0.8)]  font-normal'>
                        {/* ALLOW ONLY 15 CHARACTERS FOR NFT NAME ELSE ...... */}
                        {ShortenName(nft.name, 15)}
                      </span>
                    </Link>
                  ))}
                </>
              )}
            </div>{" "}
          </div>
        </div>
      ),
      {
        width: 512,
        height: 512,
      }
    );
  } catch (e: any) {
    console.log(`${e.message} error`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
