import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import numeral from 'numeral';
import Loader from "./Loader";

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

type Props = {
    searchTerm: string;
};

export const Table = ({ searchTerm }: Props) => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    const fetchCoins = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h,7d');
            const data: Coin[] = await response.json();
            setCoins(data);
            setFilteredCoins(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            toast.error('Error fetching data', { position: "bottom-right", duration: 5000, style: { background: '#1F2937', color: '#F9FAFB' } });
        }
    };

    useEffect(() => {
        fetchCoins();
        const intervalId = setInterval(fetchCoins, 600000); // Actualiza cada 10 minuto
        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, []);

    useEffect(() => {
        if (coins.length === 0) {
            setFilteredCoins([]);
            return;
        }
        const filtered = coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCoins(filtered);
        
        // Mostrar un mensaje de error si no hay resultados y el campo de búsqueda no está vacío
        if (searchTerm.trim() !== "" && filtered.length === 0) {
            toast.error("No results found", {
                position: "bottom-right",
                duration: 3000,
                style: { background: '#1F2937', color: '#F9FAFB' }
            });
        }
    }, [searchTerm, coins]);

    const handleSlugClick = (id: string) => {
        navigate(`/crypto/${id}`);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <table className="mt-12 w-full max-w-xl mx-auto border border-white/10 bg-white/5 rounded-lg overflow-hidden transition-shadow duration-300">
            <thead className="rounded-t-lg">
                <tr className="text-center">
                    <th className="px-4 py-2">Cryptocurrency</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Market Cap</th>
                    <th className="px-4 py-2">24h Change</th>
                </tr>
            </thead>
            <tbody>
                {filteredCoins.slice(0, 10).map((coin) => (
                    <tr key={coin.id} className="text-white text-center hover:bg-white/15 cursor-pointer" onClick={() => handleSlugClick(coin.id)}>
                        <td className="px-4 py-2 flex items-center text-center gap-2">
                            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                            <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]">{coin.name} ({coin.symbol.toUpperCase()})</span>
                        </td>
                        <td className="px-4 py-2">
                            ${numeral(coin.current_price).format("0,0.00")}
                        </td>
                        <td className="px-4 py-2">
                            ${numeral(coin.market_cap).format("0.00a")}
                        </td>
                        <td className={`px-4 py-2 ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {coin.price_change_percentage_24h?.toFixed(2)}%
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
