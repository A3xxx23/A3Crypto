export const CalculatorCard = () => {
    return (
        <form
        className="w-full max-w-lg bg-white/5 shadow-2xl rounded-2xl p-8 space-y-6 mx-auto"
      >
        <div>
          <input
            type="text"
            placeholder="Enter Amount to Convert"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter Amount to Convert"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
      </form>
    )
}

export default CalculatorCard