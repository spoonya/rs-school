const MAX_COINS_MARKETS = 250;

export type CoinsMarketsTotal = number & { readonly __brand: unique symbol };

export function createCoinsMarketsTotal(value: number): CoinsMarketsTotal {
  if (value > MAX_COINS_MARKETS) {
    throw new Error(`${MAX_COINS_MARKETS} is the maximum value for coins markets total`);
  }

  return value as CoinsMarketsTotal;
}
