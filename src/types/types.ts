export interface TNFTs {
  name: string;
  imageUrl: string;
  nftUrl: string;
}

export interface TActiveChannels {
  name: string;
  url: string;
  imageUrl: string;
}

export interface TCast {
  text: string;
  likes_count: number;
  recasts_count: number;
  timestamp: string;
  message?: string;
  url: string;
  replies_count: number;
  channel?: string;
  image?: string;
}

export interface TokenBalances {
  TokenBalance: {
    token: {
      symbol: string;
    };
    formattedAmount: string;
  }[];
}

export interface TStats {
  title: string;
  val: string;
  isIcon: boolean;
}

export interface TTokenBalances {
  token: {
    symbol: string;
  };
  formattedAmount: string;
}

export interface TSocials {
  type: 'github' | 'linkedin' | 'twitter' | 'telegram' | 'instagram';
  link: string;
}

export interface TUserInfo {
  name: string;
  pfp: string;
  username: string;
  bio: string;
  following_count: number;
  follower_count: number;
}

export interface TTopFollowers {
  title: string;
  icon: string;
  val: number;
}

export interface TUserDetail {
  github?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
  cast?: string;
}
