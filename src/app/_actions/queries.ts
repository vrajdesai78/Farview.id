"use server";

import { TCast } from "@/types/types";
import { CovalentClient } from "@covalenthq/client-sdk";

export const getUserData = async (fname: string) => {
  const query = `query MyQuery {
    Socials(
      input: {filter: {dappName: {_eq: farcaster}, identity: {_eq: "fc_fname:${fname}"}}, blockchain: ethereum}
    ) {
      Social {
        userCreatedAtBlockTimestamp
        userAssociatedAddresses
        profileBio
        profileImage
        followerCount
        followingCount
        profileName
        profileDisplayName
        userId
      }
    }
    FarcasterChannels(
      input: {blockchain: ALL, filter: {hostIdentity: {_eq: "fc_fname:${fname}"}}, order: {followerCount: DESC}, limit: 3}
    ) {
      FarcasterChannel {
        imageUrl
        url
        channelId
      }
    }
    Wallet(
      input: {blockchain: base, identity: "fc_fname:${fname}"}
    ) {
      tokenTransfers(input: {order: {blockTimestamp: ASC}, limit: 1}) {
        transactionHash
        blockTimestamp
      }
    }
    FarcasterChannelParticipants(
      input: {filter: {participant: {_eq: "fc_fname:vrajdesai"}}, blockchain: ALL, limit: 3, order: {lastActionTimestamp: DESC}}
    ) {
      FarcasterChannelParticipant {
        channelName
        channel {
          imageUrl
        }
      }
    }
  }`;

  const resp = await fetch("https://api.airstack.xyz/gql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AIRSTACK_API_KEY!,
    },
    body: JSON.stringify({ query }),
  });

  const { data } = (await resp.json()) as {
    data: {
      Socials: {
        Social: [
          {
            userCreatedAtBlockTimestamp: string;
            userAssociatedAddresses: string[];
            profileBio: string;
            profileImage: string;
            followerCount: number;
            followingCount: number;
            profileName: string;
            profileDisplayName: string;
            userId: string;
          }
        ];
      };
      FarcasterChannels: {
        FarcasterChannel: [
          {
            imageUrl: string;
            url: string;
            channelId: string;
          }
        ];
      };
      Wallet: {
        tokenTransfers: [
          {
            transactionHash: string;
            blockTimestamp: string;
          }
        ];
      };
      FarcasterChannelParticipants: {
        FarcasterChannelParticipant: [
          {
            channelName: string;
            channel: {
              imageUrl: string;
            };
          }
        ];
      };
    };
  };

  return data;
};

export const fetchActiveChannels = async (fid: string) => {
  const apiResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/channel/user?fid=${fid}&limit=3`,
    {
      method: "GET",
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const data = await apiResponse.json();

  const channels = data.channels.map((channel: any) => ({
    url: channel.url,
    name: channel.id,
    imageUrl: channel.image_url,
  }));
  return channels;
};

export const fetchTopFollowers = async (fid: string) => {
  const apiResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/followers/relevant?target_fid=${fid}&sort_type=algorithmic&limit=3&viewer_fid=479`,
    {
      method: "GET",
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const data = await apiResponse.json();

  const followers: {
    name: string;
    pfp: string;
  }[] = data.top_relevant_followers_hydrated.map((user: any) => {
    return {
      name: user.user.username,
      pfp: user.user.pfp_url,
    };
  });
  return followers;
};

export const getTopNFTs = async (address: string) => {
  const nftResponse = await fetch(
    `https://api.simplehash.com/api/v0/nfts/owners_v2?chains=base&wallet_addresses=${address}&order_by=floor_price__desc&limit=10`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.SIMPLEHASH_API_KEY!,
      },
    }
  );

  const data = await nftResponse.json();
  const uniqueNames = new Set();
  const nfts: {
    imageUrl: string;
    name: string;
  }[] = [];

  for (const nft of data.nfts) {
    if (!uniqueNames.has(nft.contract?.name)) {
      uniqueNames.add(nft.contract?.name);
      nfts.push({
        imageUrl: nft.previews?.image_medium_url,
        name: nft.contract?.name,
      });

      if (nfts.length === 3) {
        break;
      }
    }
  }
  return nfts;
};
export const fetchTopCasts = async (fid: string) => {
  const apiResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/feed/user/${fid}/popular`,
    {
      method: "GET",
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const { casts, message } = await apiResponse.json();
  if (!casts) {
    return {
      message,
    };
  }
  const topCast = casts[0];
  return {
    text: topCast.text,
    likes_count: topCast.reactions.likes_count,
    recasts_count: topCast.reactions.recasts_count,
    timestamp: topCast.timestamp,
    url: `https://warpcast.com/${topCast.author.username}/${topCast.hash}`,
  } as TCast;
};

export const getTxnCount = async (address: string) => {
  const client = new CovalentClient(process.env.COVALENT_API_KEY!);
  const resp = await client.TransactionService.getTransactionSummary(
    "base-mainnet",
    address
  );
  if (resp.data && resp.data.items && resp.data.items.length > 0) {
    return resp.data.items[0].total_count;
  }
  return null;
};
