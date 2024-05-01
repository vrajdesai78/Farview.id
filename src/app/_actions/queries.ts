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

  console.log("data", data);
};


