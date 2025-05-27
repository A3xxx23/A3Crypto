import { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useNewStore } from "../store/useNewStore";

interface Article {
  article_id?: string;
  title: string;
  link: string;
  creator?: string[];
  pubDate: string;
  source_name?: string;
  image_url: string;
  category?: string[];
}

interface FormattedNewsItem {
  id: number;
  title: string;
  url: string;
  author: string;
  publishedAt: string;
  source: {
    name: string;
  };
  urlToImage: string;
  currencies: { code: string }[];
}

export const News = () => {
  const { news, setNews, lastUpdated, setLastUpdated } = useNewStore();
  const [loading, setLoading] = useState(news.length === 0);

  const placeholderImage = "https://ui.shadcn.com/placeholder.svg"; 
  const shouldUpdate = useCallback(() => {
    const TEN_MINUTES = 10 * 60 * 1000;
    if (!lastUpdated) return true;
    return Date.now() - lastUpdated > TEN_MINUTES;
  }, [lastUpdated]);

  const fetchNewsCoins = useCallback(async () => {
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_NEW_API_KEY}&q=crypto&country=us&language=en,es,zh,ru,jp`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("No news articles found");
      }

      const formattedNews: FormattedNewsItem[] = data.results.map((article: Article, index: number) => ({
        id: article.article_id ? parseInt(article.article_id, 10) : index,
        title: article.title,
        url: article.link,
        author: article.creator?.[0] || "Unknown",
        publishedAt: article.pubDate,
        source: {
          name: article.source_name || "Unknown Source",
        },
        urlToImage: article.image_url || placeholderImage, 
        currencies: article.category?.map((cat) => ({ code: cat })) || [],
      }));

      setNews(formattedNews);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error(`Error fetching news: ${(error as Error).message}`, {
        position: "bottom-right",
        duration: 2000,
        style: { background: "#1F2937", color: "#F9FAFB" },
      });
    } finally {
      setLoading(false);
    }
  }, [setNews, setLastUpdated, placeholderImage]); 

  useEffect(() => {
    if (shouldUpdate()) {
      fetchNewsCoins();
    } else {
      setLoading(false);
    }

    const intervalId = setInterval(fetchNewsCoins, 600000);
    return () => clearInterval(intervalId);
  }, [fetchNewsCoins, shouldUpdate]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h1 className="text-6xl font-bold text-center mb-10">News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 shadow-md rounded-lg p-4 flex flex-col justify-between border border-white/10 hover:bg-white/10 transition-shadow duration-300"
            onClick={() => window.open(item.url, "_blank")}
          >
            <img
              src={item.urlToImage}
              alt={item.title}
              className="h-48 w-full object-cover rounded-t-lg mb-4"
              onError={(e) => {
                e.currentTarget.src = placeholderImage;
              }}
            />
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-white cursor-pointer"
            >
              {item.title} 
            </a>

            <p className="text-md text-gray-500 mt-2 mb-4">
              {item.source.name} -{" "}
              {new Date(item.publishedAt).toLocaleDateString()}
            </p>

            <span className="text-md text-gray-500 mt-2 mb-4">
              {item.author ? `by ${item.author.length > 50 ? `${item.author.slice(0, 50)}...` : item.author}` : "by Unknown"}
            </span>

            <div className="flex flex-wrap gap-2 mt-3">
              {item.currencies?.map((currency) => (
                <span
                  key={currency.code}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                >
                  {currency.code}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
