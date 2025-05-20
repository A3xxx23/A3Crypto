import { useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useTrendingStore } from "../store/useTrendingStore";

export const Trending = () => {
  const navigate = useNavigate();

  // ✅ Usamos selector para obtener funciones estables (evita warning)
  const trending = useTrendingStore((state) => state.trending);
  const loading = useTrendingStore((state) => state.loading);
  const error = useTrendingStore((state) => state.error);
  const fetchTrendingCoins = useTrendingStore((state) => state.fetchTrendingCoins);

  useEffect(() => {
    fetchTrendingCoins();
    const interval = setInterval(fetchTrendingCoins, 600000); // 10 min
    return () => clearInterval(interval);
  }, [fetchTrendingCoins]); // ✅ dependencias correctas

  const handleClick = (id: string) => {
    navigate(`/crypto/${id}`);
  };

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-red-500 mt-10 text-lg">{error}</div>;

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h1 className="text-6xl font-bold text-center mb-10">Trending</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trending.map(({ item }) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="cursor-pointer bg-white/5 shadow-md rounded-lg p-4 flex flex-col justify-between border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-4">
              <img
                src={item.thumb}
                alt={item.name}
                className="w-16 h-16 rounded-full"
              />
            </div>

            <div className="flex items-center justify-center flex-col mt-3 gap-2">
              <h3 className="text-2xl font-bold text-white text-center">
                {item.name} ({item.symbol.toUpperCase()})
              </h3>
              <p className="text-stone-400 text-sm">Rank: {item.market_cap_rank}</p>
            </div>

            <div className="mt-3 flex justify-center gap-3 text-sm">
              <p>Price: ${item.data.price.toFixed(5)}</p>
              <p
                className={`font-semibold ${
                  item.data.price_change_percentage_24h.usd >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                24h: {item.data.price_change_percentage_24h.usd.toFixed(2)}%
              </p>
            </div>

            <div className="mt-2 flex justify-center">
              <img
                src={item.data.sparkline}
                alt={`sparkline-${item.id}`}
                className="w-full h-16 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;

