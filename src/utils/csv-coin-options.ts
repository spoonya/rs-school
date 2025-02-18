import { Coin, CSVOptions } from '@/types';

import { formatNumber, formatPercent, formatSupply } from './format';

export const coinCSVOptions: CSVOptions<Coin> = {
  delimiter: ';',
  includeBOM: false,
  fields: [
    { key: 'name', label: 'Name' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'rank', label: 'Rank' },
    {
      key: 'price',
      label: 'Price (USD)',
      formatter: (value) => formatNumber(Number(value), { isCurrency: true }),
    },
    {
      key: 'volume',
      label: 'Volume',
      formatter: (value) => formatNumber(Number(value), { isCurrency: true }),
    },
    {
      key: 'marketCap',
      label: 'Market Cap',
      formatter: (value) => formatNumber(Number(value), { isCurrency: true }),
    },
    {
      key: 'availableSupply',
      label: 'Available Supply',
      formatter: (value) => formatSupply(Number(value)),
    },
    {
      key: 'totalSupply',
      label: 'Total Supply',
      formatter: (value) => formatSupply(Number(value)),
    },
    {
      key: 'fullyDilutedValuation',
      label: 'FDV',
      formatter: (value) => formatNumber(Number(value), { isCurrency: true }),
    },
    {
      key: 'priceChange1h',
      label: '1H Change (%)',
      formatter: (value) => formatPercent(Number(value)),
    },
    {
      key: 'priceChange1d',
      label: '24H Change (%)',
      formatter: (value) => formatPercent(Number(value)),
    },
    {
      key: 'priceChange1w',
      label: '7D Change (%)',
      formatter: (value) => formatPercent(Number(value)),
    },
  ],
};
