import CalculatorCard from "../components/CalculatorCard"


export const Calculator = () => {
  return (
    <div className="container mx-auto max-w-2xl p-4">
  <h1 className="text-4xl sm:text-6xl font-bold text-center mb-10">
  Crypto Converter
  </h1>

  <CalculatorCard />
</div>
  )
}

export default Calculator
