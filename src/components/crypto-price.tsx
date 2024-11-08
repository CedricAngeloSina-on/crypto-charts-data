"use client";

import { useMemo } from "react";
import { Triangle } from "lucide-react";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useCryptoTickerStore } from "~/store/crypto-ticker-store";

export function CryptoPrice() {
  const { cryptoTicker } = useCryptoTickerStore();
  const [cryptoData] = api.crypto.getData.useSuspenseQuery({
    ticker: cryptoTicker,
  });

  const percentageChange = useMemo(() => {
    const firstValue = cryptoData.c[0] ?? 0;
    const lastValue = cryptoData.c.at(-1) ?? 0;

    if (firstValue === 0) return 0; // Avoid division by zero

    return ((lastValue - firstValue) / firstValue) * 100;
  }, [cryptoData]);

  const isTrendingUp = percentageChange > 0;

  return (
    <span className="inline-flex flex-row items-center gap-2 font-mono text-2xl font-medium">
      <span>
        <Triangle
          className={cn("size-3", {
            "fill-chart-2 stroke-chart-2": isTrendingUp,
            "rotate-180 fill-chart-5 stroke-chart-5": !isTrendingUp,
          })}
        />
      </span>
      <span
        className={cn({
          "text-chart-2": isTrendingUp,
          "text-chart-5": !isTrendingUp,
        })}
      >
        {percentageChange.toFixed(2)}%
      </span>
      <span>|</span>
      {cryptoData.c
        .at(-1)
        ?.toLocaleString("en-US", { style: "currency", currency: "USD" }) ??
        "Loading..."}
    </span>
  );
}
