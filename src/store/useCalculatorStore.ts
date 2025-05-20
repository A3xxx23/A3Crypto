import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface FiatOption {
  value: string;
  label: string;
  image: string;
}

interface CryptoOption {
  value: string;
  label: string;
  image: string;
}

interface CalculatorState {
  amount: number | string;
  fiat: FiatOption | null;
  crypto: CryptoOption | null;
  cryptoOptions: CryptoOption[];
  converted: number | null;
  cryptoPrice: number | null;
  lastUpdate: string | null;
  setAmount: (value: number | string) => void;
  setFiat: (value: FiatOption | null) => void;
  setCrypto: (value: CryptoOption | null) => void;
  setCryptoOptions: (options: CryptoOption[]) => void;
  setConverted: (value: number | null) => void;
  setCryptoPrice: (value: number | null) => void;
  setLastUpdate: (value: string | null) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
devtools(
    persist(
    (set) => ({
      amount: 0,
      fiat: null,
      crypto: null,
      cryptoOptions: [],
      converted: null,
      cryptoPrice: null,
      lastUpdate: null,
      setAmount: (value) => set({ amount: value }),
      setFiat: (value) => set({ fiat: value }),
      setCrypto: (value) => set({ crypto: value }),
      setCryptoOptions: (options) => set({ cryptoOptions: options }),
      setConverted: (value) => set({ converted: value }),
      setCryptoPrice: (value) => set({ cryptoPrice: value }),
      setLastUpdate: (value) => set({ lastUpdate: value }),
    }),
    {
      name: 'calculator-storage', 
    }
  ))
);
