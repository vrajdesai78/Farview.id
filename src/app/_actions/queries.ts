"use server";

import { TCast } from "@/types/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SupabaseClient } from "@supabase/supabase-js";

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
        socialCapital {
          socialCapitalScoreRaw
          socialCapitalScore
        }
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
      input: {filter: {participant: {_eq: "fc_fname:${fname}"}}, blockchain: ALL, limit: 3, order: {lastActionTimestamp: DESC}}
    ) {
      FarcasterChannelParticipant {
        channelName
        channelId
        channel {
          imageUrl
        }
      }
    }
    TokenBalances(
      input: {filter: {owner: {_eq: "fc_fname:${fname}"}, tokenType: {_in: [ERC20, ERC721]}, tokenAddress: {_in: ["0x4ed4e862860bed51a9570b96d89af5e1b0efefed", "0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe", "0x5B5dee44552546ECEA05EDeA01DCD7Be7aa6144A"]}}, blockchain: base}
    ) {
      TokenBalance {
        token {
          symbol
        }
        formattedAmount
      }
      pageInfo {
        nextCursor
        prevCursor
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
            socialCapital: {
              socialCapitalScoreRaw: string;
              socialCapitalScore: string;
            };
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
            channelId: string;
            channelName: string;
            channel: {
              imageUrl: string;
            };
          }
        ];
      };
      TokenBalances: {
        TokenBalance: [
          {
            token: {
              symbol: string;
            };
            formattedAmount: string;
          }
        ];
        pageInfo: {
          nextCursor: string;
          prevCursor: string;
        };
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

  const channels = data?.channels?.map((channel: any) => ({
    url: `https://warpcast.com/~/channel/${channel.id}`,
    name: channel.id,
    imageUrl: channel.image_url,
  }));
  return channels;
};

export const fetchTopFollowers = async (fid: string) => {
  const apiResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/followers/relevant?target_fid=${fid}&sort_type=algorithmic&limit=3&viewer_fid=${fid}`,
    {
      method: "GET",
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const data = await apiResponse.json();

  const followers: {
    title: string;
    icon: string;
    val: number;
  }[] = data.top_relevant_followers_hydrated?.map((user: any) => {
    return {
      title: user.user.username,
      icon: user.user.pfp_url,
      val: user.user.follower_count,
    };
  });

  return followers;
};

export const getTopNFTs = async (address: string) => {
  if (!address) return [];

  const nftResponse = await fetch(
    `https://api.simplehash.com/api/v0/nfts/owners_v2?chains=base&wallet_addresses=${address}&order_by=floor_price__desc&limit=5`,
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
    nftUrl: string;
  }[] = [];

  for (const nft of data.nfts) {
    if (!uniqueNames.has(nft.contract?.name)) {
      uniqueNames.add(nft.contract?.name);
      nfts.push({
        imageUrl: nft.previews?.image_medium_url,
        name: nft.contract?.name,
        nftUrl: nft.collection.marketplace_pages[0].nft_url,
      });

      if (nfts.length === 6) {
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
  const topCasts = casts.slice(0, 3);

  const topCastsArr = topCasts.map((topCast: any) => {
    return {
      text: topCast.text,
      likes_count: topCast.reactions.likes_count,
      recasts_count: topCast.reactions.recasts_count,
      timestamp: topCast.timestamp,
      url: `https://warpcast.com/${topCast.author.username}/${topCast.hash}`,
      replies_count: topCast.replies?.count ?? 0,
      channel: topCast.channel?.id,
    } as TCast;
  }) as TCast[];

  return topCastsArr;
};

export const getFCDetails = async (fname: string) => {
  const apiResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/user/search?q=${fname}&limit=1`,
    {
      method: "GET",
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const { result } = await apiResponse.json();

  return {
    name: result.users[0]?.display_name,
    pfp: result.users[0].pfp_url,
    address: result.users[0].verified_addresses?.eth_addresses[0],
    bio: result.users[0].profile?.bio?.text,
    followers: result.users[0].follower_count,
    following: result.users[0].following_count,
    fid: result.users[0].fid,
  };
};

export const addUser = async (fname: string) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey)
      throw new Error("Connection to SUPABASE Database failed", {
        cause: "Missing SUPABASE_URL or SUPABASE_KEY",
      });

    const client = new SupabaseClient(supabaseUrl!, supabaseKey!);

    const { data } = await client
      .from("Analytics")
      .select("*")
      .eq("fname", fname);

    if (data && data.length > 0) {
      await client
        .from("Analytics")
        .update({ visits: data[0].visits + 1 })
        .eq("fname", fname);
    } else {
      await client.from("Analytics").insert({
        fname: fname,
        visits: 1,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const getVisits = async (fname: string) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey)
      throw new Error("Connection to SUPABASE Database failed", {
        cause: "Missing SUPABASE_URL or SUPABASE_KEY",
      });

    const client = new SupabaseClient(supabaseUrl!, supabaseKey!);

    const { data } = await client
      .from("Analytics")
      .select("*")
      .eq("fname", fname);

    return data?.[0].visits;
  } catch (e) {
    console.error(e);
  }
};

export const getFarcasterDetails = async (fid: string) => {
  const query = `query MyQuery {
    Socials(
      input: {filter: {dappName: {_eq: farcaster}, identity: {_eq: "fc_fid:${fid}"}}, blockchain: ethereum}
    ) {
      Social {
        profileName
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
            profileName: string;
          }
        ];
      };
    };
  };

  return data;
};

export const getWalletWorth = async (address: string) => {
  if (!address) return null;

  const resp = await fetch(
    `https://api.mobula.io/api/1/wallet/portfolio?wallet=${address}&blockchains=base`
  );

  const respJson = await resp.json();

  if (respJson?.data?.total_wallet_balance) {
    return respJson?.data?.total_wallet_balance;
  }

  return null;
};

export const getTxnCount = async (address: string) => {
  if (!address) return 0;

  const resp = await fetch(
    `https://api.mobula.io/api/1/wallet/transactions?wallet=${address}&blockchains=base`
  );

  const respJson = await resp.json();

  return respJson?.pagination?.total;
};

interface getRoastProps {
  followers: number;
  following: number;
  bio: string;
  walletWorth: string;
}

export const getRoast = async ({
  followers,
  following,
  bio,
  walletWorth,
}: getRoastProps) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    `Roast this user with the Farcaster profile under 80 words: Bio: ${bio} Followers: ${followers} Following: ${following} Wallet worth: ${walletWorth} USD. Make it sarcastic around the wallet worth, humorous about the follower count, and funny about the bio.`
  );

  return result.response.text();
};

export const findTags = async (
  walletWorth: number,
  txnCount: number,
  fid: number
) => {
  const tags = [];

  if (walletWorth >= 1500) {
    tags.push("Crypto OG");
  }

  if (txnCount >= 200) {
    tags.push("Based");
  }

  if (fid <= 5000) {
    tags.push("FC OG");
  }

  return tags;
};

export const addUserDetails = async ({
  fname,
  github,
  linkedin,
  twitter,
  telegram,
  instagram,
  cast,
}: {
  fname: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
  cast?: string;
}) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey)
      throw new Error("Connection to SUPABASE Database failed", {
        cause: "Missing SUPABASE_URL or SUPABASE_KEY",
      });

    const client = new SupabaseClient(supabaseUrl!, supabaseKey!);

    const { data } = await client.from("User").select("*").eq("fname", fname);

    const user = data?.[0];

    if (user) {
      await client
        .from("User")
        .update({
          github,
          linkedin,
          twitter,
          telegram,
          instagram,
          cast,
        })
        .eq("fname", fname);
    } else {
      await client.from("User").insert({
        fname,
        github,
        linkedin,
        twitter,
        telegram,
        instagram,
        cast,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const getUserDetails = async (fname: string) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey)
      throw new Error("Connection to SUPABASE Database failed", {
        cause: "Missing SUPABASE_URL or SUPABASE_KEY",
      });

    const client = new SupabaseClient(supabaseUrl!, supabaseKey!);

    const { data } = await client.from("User").select("*").eq("fname", fname);

    return data?.[0];
  } catch (e) {
    console.error(e);
  }
};

export const fetchCastFromUrl = async (url: string) => {
  const fetchUrl = `https://api.neynar.com/v2/farcaster/cast?identifier=${url}&type=url&viewer_fid=3`;

  const apiResponse = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      api_key: process.env.NEYNAR_API_KEY!,
    },
  });

  const { cast, message } = await apiResponse.json();

  if (!cast) {
    return {
      message,
    };
  }

  return {
    text: cast.text,
    likes_count: cast.reactions.likes_count,
    recasts_count: cast.reactions.recasts_count,
    timestamp: cast.timestamp,
    url: `https://warpcast.com/${cast.author.username}/${cast.hash}`,
    replies_count: cast.replies?.count ?? 0,
    channel: cast.channel?.name,
  } as TCast;
};
