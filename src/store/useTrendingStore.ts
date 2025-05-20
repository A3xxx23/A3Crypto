import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import toast from "react-hot-toast";

type TrendingCoin = {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    slug: string;
    data: {
      price: number;
      price_change_percentage_24h: {
        usd: number;
      };
      market_cap: string;
      total_volume: string;
      sparkline: string;
    };
  };
};

type TrendingStore = {
  trending: TrendingCoin[];
  loading: boolean;
  error: string | null;
  fetchTrendingCoins: () => void;
};

// Encadenar los middlewares correctamente
export const useTrendingStore = create<TrendingStore>()(
  devtools(
    persist(
      (set) => ({
        trending: [],
        loading: true,
        error: null,
        fetchTrendingCoins: async () => {
          set({ loading: true, error: null });
          try {
            const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            set({ trending: data.coins, loading: false });
          } catch (error) {
            console.error("Error fetching trending coins:", error);
            set({ error: "Error fetching trending coins", loading: false });
            toast.error("Error fetching trending coins", { position: "bottom-center", duration: 3000 });
          } finally {
            set({ loading: false });
          }
        },
      }),
      {
        name: "trending-store", 
      }
    )
  )
);


