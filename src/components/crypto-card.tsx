"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { CryptoChart } from "~/components/crypto-chart";
import { CryptoCombobox } from "~/components/crypto-combobox";
import { CryptoPrice } from "~/components/crypto-price";
import { CryptoTcikerSymbol } from "~/components/crypto-ticker-symbol";
import { Skeleton } from "~/components/ui/skeleton";

import { api } from "~/trpc/react";
import { useCryptoTickerStore } from "~/store/crypto-ticker-store";

export function CryptoCard() {
  const { cryptoTicker } = useCryptoTickerStore();
  const { data, isLoading, isError } = api.crypto.getData.useQuery({
    ticker: cryptoTicker,
  });

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 py-5 sm:py-6 md:px-6">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CryptoCombobox />
          <CardDescription className="pl-1">
            <CryptoTcikerSymbol /> price in the last 30 days
          </CardDescription>
        </div>
        <div className="flex flex-col justify-center gap-1">
          {isLoading ? (
            <Skeleton className="aspect-auto h-[40px] w-[300px]" />
          ) : isError ? (
            <CardDescription className="text-red-500">
              Failed to load price data.
            </CardDescription>
          ) : (
            data && <CryptoPrice cryptoData={data} />
          )}
        </div>
      </CardHeader>
      <CardContent className="w-full px-2 sm:p-6">
        <div className="flex aspect-auto h-[400px] w-full flex-col items-center justify-center">
          {isLoading ? (
            <Skeleton className="aspect-auto h-[400px] w-full" />
          ) : isError ? (
            <CardDescription className="text-red-500">
              Failed to load chart data.
            </CardDescription>
          ) : (
            data && <CryptoChart cryptoData={data} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
