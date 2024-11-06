"use client";
import { useCryptoTickerStore } from "~/store/crypto-ticker-store";

export function CryptoTcikerSymbol() {
  const { cryptoTicker } = useCryptoTickerStore();

  return cryptoTicker;
}
