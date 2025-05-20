import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type CoinDetails = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  watchlist_portfolio_users: number;
  sentiment_votes_up_percentage: number;
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
  };
  description: { en: string };
} | null;

interface CryptoState {
  coin: CoinDetails;
  setCoin: (coin: CoinDetails) => void;

  chartData: number[][];
  setChartData: (data: number[][]) => void;

  days: number;
  setDays: (d: number) => void;
}

export const useCryptoStore = create<CryptoState>()(
  devtools(
    persist(
      (set) => ({
        coin: null,
        setCoin: (coin) => set({ coin }),

        chartData: [],
        setChartData: (data) => set({ chartData: data }),

        days: 7,
        setDays: (d) => set({ days: d }),
      }),
      {
        name: "crypto-slug-storage", 
      }
    )
  )
);
