import { useEffect, useState } from "react";
import Loader from "../components/Loader";

type Currency = {
  code: string;
  title: string;
  slug: string;
  url: string;
}

type NewsItem = {
  id: number;
  title: string;
  url: string;
  published_at: string;
  source: {
    title: string;
    domain: string;
  };
  currencies: Currency[];
};


export const News = () => {

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchNewsCoins = () => {
    fetch('/api/posts/?auth_token=950119400e3105dc16a70de3c3486c9c26e4da91')
      .then((response) => response.json())
      .then((data) => {
        setNews(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('error fetching news:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNewsCoins(); // Llama a la función para obtener datos inmediatamente

    const intervalId = setInterval(fetchNewsCoins, 300000); // Actualiza cada 5 minutos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

    if (loading) {
    return <Loader/>
  }

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h1 className="text-6xl font-bold text-center mb-10">News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-4">
        {news.map((item) => (
          <div
          key={item.id}
          className="bg-white/5 shadow-md rounded-lg p-4 flex flex-col justify-between border border-white/10 hover:bg-white/10 transition-shadow duration-300"
          >
            <a 
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semilbold text-white cursor-pointer"
            >
              {item.title}
            </a>

            <p className="text-md text-gray-500 mt-2 mb-4">
              {item.source.title} - {new Date(item.published_at).toLocaleDateString()}
            </p>

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
