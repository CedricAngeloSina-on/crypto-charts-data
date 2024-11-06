import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type CryptoData } from "~/lib/types";

async function getCryptoData(ticker: string): Promise<CryptoData> {
  const now = Date.now() / 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60;
  const searchParams = new URLSearchParams({
    symbol: `Crypto.${ticker}`,
    resolution: "60",
    from: thirtyDaysAgo.toFixed(0),
    to: now.toFixed(0),
  });
  const url = `https://benchmarks.pyth.network/v1/shims/tradingview/history?${searchParams.toString()}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json() as Promise<CryptoData>;
}

export const cryptoRouter = createTRPCRouter({
  getData: publicProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      const data = await getCryptoData(input.ticker);
      return data;
    }),
});
