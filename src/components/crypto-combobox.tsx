"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { useCryptoTickerStore } from "~/store/crypto-ticker-store";

const coins = [
  {
    value: "BTC/USD",
    label: "BITCOIN",
  },
  {
    value: "ETH/USD",
    label: "ETHEREUM",
  },
  {
    value: "BNB/USD",
    label: "BNB",
  },
  {
    value: "SOL/USD",
    label: "SOLANA",
  },
  {
    value: "XRP/USD",
    label: "XRP",
  },
  {
    value: "DOGE/USD",
    label: "DOGECOIN",
  },
  {
    value: "ADA/USD",
    label: "CARDANO",
  },
  {
    value: "AVAX/USD",
    label: "AVALANCE",
  },
  {
    value: "SHIB/USD",
    label: "SHIBA INU",
  },
  {
    value: "DOT/USD",
    label: "POLKADOT",
  },
];

export function CryptoCombobox() {
  const [open, setOpen] = useState(false);

  const { cryptoTicker, setCryptoTicker } = useCryptoTickerStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[230px] justify-between text-2xl font-semibold"
        >
          {coins.find((coin) => coin.value === cryptoTicker)?.label ??
            cryptoTicker}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0">
        <Command>
          <CommandInput placeholder="Select a cryptocurrency" />
          <CommandList>
            <CommandEmpty>No coin found.</CommandEmpty>
            <CommandGroup>
              {coins.map((coin) => (
                <CommandItem
                  key={coin.value}
                  value={coin.value}
                  onSelect={(currentValue) => {
                    setCryptoTicker(currentValue);
                    setOpen(false);
                  }}
                >
                  {coin.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      cryptoTicker === coin.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
