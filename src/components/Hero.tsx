import { IconSearch } from "@tabler/icons-react";
import Table from "./Table";
import { useState } from "react";

export const Hero = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-10">
    <img
          src="/src/assets/Image/LogoCoin.png"
          alt="Logo Crypto"
          className="mb-4 h-26"
        />
        <h1 className="text-4xl sm:text-6xl tracking-tight max-w-4xl animate-fade-in animate-delay-200 font-bold text-center animate-text-gradient inline-flex bg-gradient-to-r from-neutral-100 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:via-slate-400 dark:to-neutral-400">
        Welcome to the Best Place to Track Your Cryptocurrencies!
        </h1>

        <p className="text-lg text-gray-300 text-center tracking-tight mt-4 max-w-3xl ">Here, you can easily track your investments, access real-time market data, and stay informed with the latest news and trends in the cryptocurrency world.</p>

          {/* Search Bar */} 
        <div className="flex items-center justify-center mt-10 w-full">
            <div className="relative w-full max-w-xl mx-auto">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search crypto..."
                    className="w-full p-2 sm:p-5 bg-white/4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg" 
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-600">
                    <IconSearch className="text-2xl" />
                </button>
            </div>
        </div>

        <Table searchTerm={searchTerm} />
  </main>
  )
}

export default Hero;
