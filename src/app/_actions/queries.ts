"use server";

export const getUserData = async (fname: string) => {
  const query = `query MyQuery {
    Socials(
      input: {filter: {dappName: {_eq: farcaster}, identity: {_eq: "fc_fname:${fname}"}}, blockchain: ethereum}
    ) {
      Social {
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
        name
        imageUrl
        url
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
      input: {filter: {participant: {_eq: "fc_fname:${fname}"}, channelActions: {_eq: cast}}, blockchain: ALL, limit: 1, order: {lastActionTimestamp: ASC}}
    ) {
      FarcasterChannelParticipant {
        lastCastedTimestamp
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
            name: string;
            imageUrl: string;
            url: string;
          }
        ];
      };
    };
  };

  return data;
};

export const fetchActiveChannels = async (fid: string) => {
  const apiResponse = await fetch(
    "https://api.neynar.com/v2/farcaster/channel/user?fid=3&limit=3",
    {
      method: "GET",
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const data = await apiResponse.json();
  console.log("active Channels", data);
  return JSON.stringify(data)
};

export const fetchMostEngagedPeople = async (fid: string) => {

  const apiResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/followers/relevant?target_fid=${fid}&viewer_fid=244416`,
    {
      method: "GET",
      headers: {
        api_key: process.env.NEYNAR_API_KEY!,
      },
    }
  );

  const data = await apiResponse.json();
  console.log("Most Engaged Users", data);
  return JSON.stringify(data)
};

export const getTopNFTs = async (address: string) => {
  console.log("address", address);
  const nftResponse = await fetch(
    `https://api.simplehash.com/api/v0/nfts/owners_v2?chains=base&wallet_addresses=${address}&order_by=floor_price__desc&limit=4`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.SIMPLEHASH_API_KEY!,
      },
    }
  );

  const { nfts } = await nftResponse.json();
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

  const data = await apiResponse.json();
  console.log("Top Casts", data);
  return JSON.stringify(data)
};



