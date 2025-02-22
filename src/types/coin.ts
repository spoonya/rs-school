export interface Coin {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  fullyDilutedValuation: number;
  priceChange1h?: number;
  priceChange1d?: number;
  priceChange1w?: number;
  redditUrl: string;
  twitterUrl: string;
  explorers: string[];
}

export interface CoinDetails extends Coin {
  websiteUrl: string;
  contractAddress: string;
  decimals: number;
}

export interface CoinsMarketsResponse {
  result: Coin[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
