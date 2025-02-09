import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Coin } from '@/types/coin';
import { render, screen } from '@testing-library/react';

import { CoinTable } from '../';

const mockCoins: Coin[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://example.com/btc.png',
    current_price: 50000,
    market_cap: 1000000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 1000000000,
    total_volume: 1000000000,
    high_24h: 52000,
    low_24h: 48000,
    price_change_24h: 2000,
    price_change_percentage_24h: 5.5,
    market_cap_change_24h: 1000000,
    market_cap_change_percentage_24h: 2.5,
    circulating_supply: 19000000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69000,
    ath_change_percentage: -27.5,
    ath_date: '2021-11-10',
    atl: 67.81,
    atl_change_percentage: 73625.9,
    atl_date: '2013-07-06',
    roi: '',
    last_updated: '2024-02-20',
    price_change_percentage_1h: 0.5,
    sparkline_in_7d: { price: [] },
  },
];

describe('CoinTable', () => {
  it('renders coin table with data', () => {
    render(
      <BrowserRouter>
        <CoinTable items={mockCoins} className="test-class" />
      </BrowserRouter>
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('btc')).toBeInTheDocument();
    expect(screen.getByText('$50,000.00')).toBeInTheDocument();
    expect(screen.getByText('+5.50%')).toBeInTheDocument();
  });

  it('renders empty table when no items', () => {
    render(
      <BrowserRouter>
        <CoinTable items={[]} className="test-class" />
      </BrowserRouter>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Market Cap')).toBeInTheDocument();
    expect(screen.getByText('High (24h)')).toBeInTheDocument();
    expect(screen.getByText('Low (24h)')).toBeInTheDocument();
    expect(screen.getByText('24h')).toBeInTheDocument();
    expect(screen.getByText('Volume (24h)')).toBeInTheDocument();
    expect(screen.getByText('Market Cap')).toBeInTheDocument();

    expect(screen.queryByText('Bitcoin')).not.toBeInTheDocument();
  });
});
