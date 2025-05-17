import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

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


export const News = () => {

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchNewsCoins = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${import.meta.env.VITE_NEW_API_KEY}`);
      const data = await response.json();
      const formattedNews = data.articles
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((article: any) => article.urlToImage)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((article:any, index: number) => ({
            id: index.toString(),
            title: article.title,
            url: article.url,
            author: article.author,
            publishedAt: article.publishedAt,
            source: {
              name: article.source.name,
            },
            urlToImage: article.urlToImage, 
          }));
        setNews(formattedNews);
        setLoading(false);
      
    } catch (error) {
      console.log('Error fetching news:', error);
      setLoading(false);
      toast.error('Error fetching news', { position: "bottom-right", duration: 2000, style: { background: '#1F2937', color: '#F9FAFB' } });
      
    }
  };

  useEffect(() => {
    fetchNewsCoins(); // Llama a la función para obtener datos inmediatamente

    const intervalId = setInterval(fetchNewsCoins, 600000); // Actualiza cada 10 minutos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

    if (loading) {
    return <Loader/>
  }

  const placeholderImage = 'https://ui.shadcn.com/placeholder.svg';

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
              src={item.urlToImage || placeholderImage} // Usar el placeholder si no hay imagen
              alt={item.title}
              className="h-48 w-full object-cover rounded-t-lg mb-4"
              onError={(e) => { e.currentTarget.src = placeholderImage; }} // Manejo de error
            />
            <a 
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semilbold text-white cursor-pointer"
            >
              {item.title}
            </a>

            <p className="text-md text-gray-500 mt-2 mb-4">
              {item.source.name} - {new Date(item.publishedAt).toLocaleDateString()}
            </p>

            <span className="text-md text-gray-500 mt-2 mb-4 ">
            {item.author ? `by ${item.author}` : 'by Unknown'}
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
  )
}

export default News
