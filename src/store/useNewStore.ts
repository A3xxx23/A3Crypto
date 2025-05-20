import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Currency = {
    code: string;
  }
  
type NewsItem = {
    id: number;
    title: string;
    url: string;
    author?: string;
    publishedAt: string;
    source: {
      name: string;
    };
    urlToImage?: string;
    currencies: Currency[];
  };

interface NewsState {
    news: NewsItem[];
    lastUpdated: number | null;
    setNews: (news: NewsItem[]) => void;
    setLastUpdated: (lastUpdated: number | null) => void;
}

export const useNewStore = create<NewsState>()(
    devtools(
        persist(
            (set) => ({
                news: [],
                lastUpdated: null,
                setNews: (news) => set({ news }),
                setLastUpdated: (timestamp) => set({ lastUpdated: timestamp }),
            }),
            {
                name: 'news-storage',
            }
        )
    )
);

export default useNewStore;




