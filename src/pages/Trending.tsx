import { useEffect, useState } from "react";
import Loader from "../components/Loader";

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

export const Trending = () => {
  
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchTrendingCoins = () => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((response) => response.json())
      .then((data) => {
        setTrending(data.coins);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching trending coins:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTrendingCoins(); // Llama a la función para obtener datos inmediatamente

    const intervalId = setInterval(fetchTrendingCoins, 600000); // Actualiza cada 10 minutos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);
  
    if (loading) {
      return <Loader/>
    }

  return (
    <div className="container mx-auto max-w-7xl p-4">
    <h1 className="text-6xl font-bold text-center mb-10">Trending</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-4">
      {
        trending.map(({item}) => (
          <div 
          className='"bg-white/5 shadow-md rounded-lg p-4 flex flex-col justify-between border border-white/10 hover:bg-white/10 transition-shadow duration-300'
          key={item.id}
          >
          
          <div className="flex items-center justify-center gap-4">
            <img 
            src={item.thumb} 
            alt={item.name}
            className="w-16 h-16 rounded-full"
            />
          </div>

          <div className="flex items-center justify-center flex-col mt-3 gap-2">
              <h3 className="text-2xl font-bold text-white">{item.name} {item.symbol}</h3>
              <p className="text-stone-500 font-light text-sm">Rank: {item.market_cap_rank}</p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <p className="text-sm">Price: ${item.data.price.toFixed(5)}</p>
            <p className={`text-sm ${item.data.price_change_percentage_24h.usd >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              24h: {item.data.price_change_percentage_24h.usd.toFixed(2)}%
            </p>
          </div>
          <div>
          <img src={item.data.sparkline} alt="sparkline" className="mt-2 flex justify-center w-full h-16 object-contain" />
          </div>
          </div>

        ))
      }

    </div>
      
    </div>
  )
}

export default Trending;
