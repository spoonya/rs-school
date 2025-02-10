import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { CoinTable } from '../';
import { mockCoins } from './mock';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

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

  it('renders the specified number of coins', () => {
    renderWithRouter(<CoinTable items={mockCoins} />);

    const coinItems = screen.getAllByTestId('coin-item');
    expect(coinItems).toHaveLength(mockCoins.length);
  });

  it('displays "No results found" message when empty array is provided', () => {
    renderWithRouter(<CoinTable items={[]} />);

    const coinItems = screen.queryAllByTestId('coin-item');
    expect(coinItems).toHaveLength(0);
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByTestId('search-x')).toBeInTheDocument();
  });
});
