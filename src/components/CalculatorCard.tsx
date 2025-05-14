export const CalculatorCard = () => {
    return (
        <div className="border border-white/10 bg-white/5 shadow-md mx-auto max-w-4xl rounded-lg p-4 flex flex-col justify-between hover:bg-white/10 transition-shadow duration-300">
        <input 
            type="text" 
            className="w-full p-2 sm:p-5 bg-white/5 mt-8 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg"
            placeholder="Enter amount"
            />

        <input 
            type="text" 
            className="w-full p-2 sm:p-5 bg-white/5 mt-8 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg"
            placeholder="Enter amount"
            />

        <input 
            type="text" 
            className="w-full p-2 sm:p-5 bg-white/5 border mt-8 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg"
            placeholder="Enter amount"
            />

        <input 
            type="text" 
            className="w-full p-2 sm:p-5 bg-white/5 mt-8 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg"
            placeholder="Enter amount"
            />

        </div>
    )
}

export default CalculatorCard