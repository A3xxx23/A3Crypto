import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

type CryptoStore = {
  coins: Coin[];
  setCoins: (coins: Coin[]) => void;
  lastFetch: number;
  setLastFetch: (timestamp: number) => void;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools(
    persist(
      (set) => ({
        coins: [],
        setCoins: (coins) => set({ coins }),
        lastFetch: 0,
        setLastFetch: (timestamp) => set({ lastFetch: timestamp }),
      }),
      {
        name: "crypto-storage", 
        partialize: (state) => ({ coins: state.coins, lastFetch: state.lastFetch }) 
      }
    ),
    { name: "CryptoStore" } 
  )
);
