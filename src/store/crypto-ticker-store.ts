import { create } from "zustand";

type CryptoTickerStore = {
  cryptoTicker: string;
  setCryptoTicker: (ticker: string) => void;
};

export const useCryptoTickerStore = create<CryptoTickerStore>((set) => ({
  cryptoTicker: "BTC/USD",
  setCryptoTicker: (ticker: string) => {
    set(() => ({ cryptoTicker: ticker }));
  },
}));
