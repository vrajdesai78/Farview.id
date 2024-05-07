export interface TNFTs {
  name: string;
  imageUrl: string;
}

export interface TActiveChannels {
  name: string;
  url: string;
  imageUrl: string;
}

export interface TTopFollowers {
  name: string;
  pfp: string;
}

export interface TCast {
  text: string;
  likes_count: number;
  recasts_count: number;
  timestamp: string;
  message?: string;
  url: string;
}

export interface TokenBalances {
  TokenBalance: {
    token: {
      symbol: string;
    };
    formattedAmount: string;

  }[]
};