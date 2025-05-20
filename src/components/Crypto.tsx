import { useParams } from "react-router-dom";
import { useRef, useCallback, useEffect, useState } from "react";
import Loader from "./Loader";
import numeral from "numeral";
import toast from "react-hot-toast";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useCryptoStore } from "../store/useCryptoStoreSlug";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export const Crypto = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { coin, setCoin, chartData, setChartData, days, setDays } = useCryptoStore();

  const fetchCoin = useCallback(async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await res.json();
      setCoin(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching coin data");
      setLoading(false);
    }
  }, [id, setCoin]);

  const fetchChart = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoadingChart(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
        { signal: controller.signal }
      );
      const data = await res.json();
      setChartData(data.prices);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error(error);
        toast.error("Error loading chart");
      }
    } finally {
      setLoadingChart(false);
    }
  }, [id, days, setChartData]);

  useEffect(() => {
    fetchCoin();
  }, [fetchCoin]);

  useEffect(() => {
    fetchChart();
  }, [fetchChart]);

  if (loading || !coin) return <Loader />;

  const chartOptions = {
    labels: chartData.map((item) => {
      const date = new Date(item[0]);
      return days === 1 ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `${coin.name} Price (USD)`,
        data: chartData.map((item) => item[1]),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.25,
      },
    ],
  };

  const rangeButtons = [
    { label: "1D", value: 1 },
    { label: "7D", value: 7 },
    { label: "30D", value: 30 },
    { label: "90D", value: 90 },
    { label: "200D", value: 200 },
    { label: "1Y", value: 365 },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-12 text-white p-4 space-y-10">
      <div className="bg-white/5 rounded-lg p-6 grid sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h1>
            <p className="text-sm text-white/70">{id}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white/70">Current Price:</p>
            <p className="text-lg font-semibold">
              ${numeral(coin.market_data.current_price.usd).format("0,0.00")}
            </p>
          </div>
          <div>
            <p className="text-white/70">Market Cap:</p>
            <p className="text-lg font-semibold">
              ${numeral(coin.market_data.market_cap.usd).format("0.00a")}
            </p>
          </div>
          <div>
            <p className="text-white/70">24h Change:</p>
            <p
              className={`text-lg font-semibold ${
                coin.market_data.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-white/70">Launch Date:</p>
            <p className="text-lg font-semibold">
              {new Date(coin.genesis_date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-white/70">Watchlist Users:</p>
            <p className="text-lg font-semibold">
              {numeral(coin.watchlist_portfolio_users).format("0,0")}
            </p>
          </div>
          <div>
            <p className="text-white/70">Market Rank:</p>
            <p className="text-lg font-semibold">{coin.market_cap_rank}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p
          className="text-white/70 text-sm"
          dangerouslySetInnerHTML={{ __html: coin.description.en }}
        />
      </div>

      {/* Gráfico */}
      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex gap-4 mb-4">
          {rangeButtons.map((btn) => (
            <button
              key={btn.value}
              className={`px-4 py-1 rounded-full border ${
                btn.value === days
                  ? "bg-blue-600 border-blue-500"
                  : "bg-transparent border-white/20"
              } transition`}
              onClick={() => setDays(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
        {loadingChart ? (
          <Loader />
        ) : (
          <Line
            data={chartOptions}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Crypto;
