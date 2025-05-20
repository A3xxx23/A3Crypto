import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import Loader from "./Loader";
import { useCalculatorStore } from "../store/useCalculatorStore";

interface FiatOption {
    value: string;
    label: string;
    image: string;
};

export const CalculatorCard = () => {
    const {
        amount,
        fiat,
        crypto,
        cryptoOptions,
        converted,
        cryptoPrice,
        lastUpdate,
        setAmount,
        setFiat,
        setCrypto,
        setCryptoOptions,
        setConverted,
        setCryptoPrice,
        setLastUpdate,
    } = useCalculatorStore();

    const fiatOptions: FiatOption[] = [
        { value: "usd", label: "US Dollar (USD)", image: 'https://flagcdn.com/us.svg' },
        { value: "eur", label: "Euro (EUR)", image: 'https://flagcdn.com/eu.svg' },
        { value: "dop", label: "Dominican Peso (DOP)", image: 'https://flagcdn.com/do.svg' },
        { value: "mxn", label: "Mexican Peso (MXN)", image: 'https://flagcdn.com/mx.svg' },
        { value: "brl", label: "Brazilian Real (BRL)", image: 'https://flagcdn.com/br.svg' },
        { value: "cad", label: "Canadian Dollar (CAD)", image: 'https://flagcdn.com/ca.svg' },
        { value: "jpy", label: "Japanese Yen (JPY)", image: 'https://flagcdn.com/jp.svg' },
        { value: "gbp", label: "British Pound (GBP)", image: 'https://flagcdn.com/gb.svg' },
    ];

    const fetchCoin = useCallback(async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
            const data = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const options = data.map((coin: any) => ({
                value: coin.id,
                label: `${coin.name} (${coin.symbol.toUpperCase()})`,
                image: coin.image,
            }));
            setCryptoOptions(options);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching data', { position: 'bottom-right', duration: 3000 });
        }
    }, [setCryptoOptions]);

    useEffect(() => {
        fetchCoin();

        const intervalId = setInterval(fetchCoin, 600000); // Actualiza cada 10 minutos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, [fetchCoin]); 

    useEffect(() => {
        if (crypto) {
            const fetchCryptoPrice = async () => {
                try {
                    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto.value}&vs_currencies=usd&include_last_updated_at=true`);
                    const data = await response.json();
                    const price = data[crypto.value]?.usd;
                    const updateTime = data[crypto.value]?.last_updated_at;

                    if (price) {
                        setCryptoPrice(price);
                        if (updateTime) {
                            const date = new Date(updateTime * 1000);
                            setLastUpdate(date.toLocaleString());
                        }
                    } else {
                        toast.error('Error fetching crypto price', { position: 'bottom-right', duration: 3000 });
                    }
                } catch (error) {
                    console.error(error);
                    toast.error('Error fetching crypto price', { position: 'bottom-right', duration: 3000 });
                }
            };

            fetchCryptoPrice();

            const intervalId = setInterval(fetchCryptoPrice, 600000); // Actualiza cada 10 minutos

            return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
        }
    }, [crypto, setCryptoPrice, setLastUpdate]); 

    useEffect(() => {
        const numericAmount = parseFloat(amount as string);
        if (!isNaN(numericAmount) && numericAmount > 0 && fiat && cryptoPrice) {
            const result = numericAmount * cryptoPrice;
            setConverted(result);
            toast.success(`Converted to ${fiat.label}`, { position: 'bottom-right', duration: 3000 });
        } else {
            setConverted(null); // Reset converted value if amount is invalid
        }
    }, [amount, fiat, cryptoPrice, setConverted]); // Agregar setConverted como dependencia

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customSingleValue = ({ data }: any) => (
        <div className="flex items-center gap-2 text-white">
            <img src={data.image} alt={data.label} className="w-6 h-6 object-contain rounded-full" />
            {data.label}
        </div>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customOption = (props: any) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="flex items-center gap-2 p-2 hover:bg-gray-700 cursor-pointer">
                <img src={data.image} alt={data.label} className="w-6 h-6 object-contain rounded-full" />
                <span className="text-white">{data.label}</span>
            </div>
        );
    };

    if (cryptoOptions.length === 0) {
        return (
            <div className="flex justify-center items-center ">
                <Loader />
            </div>
        );
    }

    return (
        <div className="border border-white/10 bg-white/5 shadow-md mx-auto max-w-4xl rounded-lg p-4 flex flex-col gap-6 transition-shadow duration-300">
            <input
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)} // Cambiar a string para manejar el input
                type="number"
                className="w-full p-3 bg-white/0 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg text-stone-400"
                placeholder="Enter amount"
            />

            <div className="w-full">
                <Select
                    options={fiatOptions}
                    value={fiat}
                    onChange={(value) => setFiat(value)} // Usar el setter de Zustand
                    isSearchable={true}
                    isClearable={true}
                    components={{ SingleValue: customSingleValue, Option: customOption }}
                    placeholder="From currency..."
                    classNamePrefix="custom"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            borderColor: '#4B5563',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0)',
                            padding: '0.5rem',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: '#1F2937',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? '#4B5563' : '#1F2937',
                            color: state.isFocused ? '#FFFFFF' : '#D1D5DB',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#D1D5DB',
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: '#D1D5DB',
                        }),
                    }}
                />
            </div>

            <div className="w-full">
                <Select
                    options={cryptoOptions}
                    value={crypto}
                    onChange={(value) => setCrypto(value)} // Usar el setter de Zustand
                    isLoading={cryptoOptions.length === 0}
                    components={{ SingleValue: customSingleValue, Option: customOption }}
                    isSearchable={true}
                    isClearable={true}
                    placeholder="To crypto..."
                    classNamePrefix="custom"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            borderColor: '#4B5563',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0)',
                            padding: '0.5rem',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: '#1F2937',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? '#4B5563' : '#1F2937',
                            color: state.isFocused ? '#FFFFFF' : '#D1D5DB',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#D1D5DB',
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: '#D1D5DB',
                        }),
                    }}
                />
            </div>

            {converted !== null && fiat && (
                <div className="text-gray-400 text-xl mt-4 text-center">
                    {amount} {crypto?.label} = <span className="font-bold text-green-400">{converted.toFixed(2)}</span> {fiat.label}
                </div>
            )}

            {lastUpdate && (
                <div className="text-gray-400 text-sm mt-2 text-center">
                    Last updated: <span className="font-bold">{lastUpdate}</span>
                </div>
            )}
        </div>
    );
};

export default CalculatorCard;
