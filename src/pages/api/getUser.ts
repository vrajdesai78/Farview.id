import { NextApiRequest, NextApiResponse } from "next";
import { fetchQuery, init } from "@airstack/node";

interface Data {
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
}

interface QueryResponse {
  data: Data;
  error: Error;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  init(process.env.AIRSTACK_API_KEY!);

  const { fname } = req.query;

  const query = `
  query MyQuery {
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
      }
    }
  }
  `;

  try {
    const { data, error }: QueryResponse = await fetchQuery(query);

    if (error) {
      res.status(500).json({ error });
    }

    const {
      profileName: username,
      profileDisplayName: display_name,
      profileImage: pfp_url,
      profileBio: bio,
      followerCount,
      followingCount,
      userAssociatedAddresses: verified_addresses,
    } = data.Socials.Social[0];

    res.json({
      display_name,
      pfp_url,
      address: verified_addresses[1],
      bio: bio,
      follower_count: followerCount,
      following_count: followingCount,
      username,
    });
  } catch (error: any) {
    if (error.isAxiosError) {
      console.error("Error:", error);
      res.status(error.response.status).json({ error });
    } else {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

