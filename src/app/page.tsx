import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { CryptoChart } from "~/components/crypto-chart";
import { CryptoCombobox } from "~/components/crypto-combobox";
import { CryptoTcikerSymbol } from "~/components/crypto-ticker-symbol";
import { Skeleton } from "~/components/ui/skeleton";
import { ThemeTrigger } from "~/components/theme-switcher";

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.crypto.getData.prefetch({ ticker: "BTC/USD" });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="absolute left-4 top-4">
          <ThemeTrigger />
        </div>
        <Card className="w-full max-w-screen-lg">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 px-4 py-5 sm:py-6 md:px-6">
            <div className="flex flex-1 flex-col justify-center gap-1">
              <CryptoCombobox />
              <CardDescription className="pl-1">
                <CryptoTcikerSymbol /> price in the last 30 days
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="w-full px-2 sm:p-6">
            <div className="flex aspect-auto h-[400px] w-full flex-col items-center justify-center">
              <Suspense
                fallback={<Skeleton className="aspect-auto h-[400px] w-full" />}
              >
                <CryptoChart />
              </Suspense>
            </div>
          </CardContent>
        </Card>
      </main>
    </HydrateClient>
  );
}
