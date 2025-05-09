
export const Hero = () => {
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
  </main>
  )
}

export default Hero;
