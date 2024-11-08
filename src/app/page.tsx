import { CryptoCard } from "~/components/crypto-card";
import { ThemeTrigger } from "~/components/theme-switcher";

import { api, HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  await api.crypto.getData.prefetch({ ticker: "BTC/USD" });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="absolute left-4 top-4">
          <ThemeTrigger />
        </div>
        <CryptoCard />
      </main>
    </HydrateClient>
  );
}
