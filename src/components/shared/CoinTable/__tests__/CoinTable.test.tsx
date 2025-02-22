import { beforeEach, describe, expect, test, vi } from 'vitest';

import { CoinItem, CoinTable } from '@/components/shared';
import classes from '@/components/shared/CoinTable/coin.table.module.scss';
import { mockCoinsMarket } from '@/utils';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/shared/CoinItem', () => ({
  CoinItem: vi.fn(({ data }) => (
    <tr data-testid="coin-item">
      <td>{data.name}</td>
      <td>{data.symbol}</td>
      <td>{data.price}</td>
      <td>{data.priceChange1h}</td>
      <td>{data.priceChange1d}</td>
      <td>{data.priceChange1w}</td>
      <td>{data.volume}</td>
      <td>{data.marketCap}</td>
    </tr>
  )),
}));

describe('CoinTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders table headers correctly', () => {
    render(<CoinTable items={mockCoinsMarket} />);

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(9);

    expect(headers[0]).toHaveAttribute('aria-label', 'Favorite');
    expect(headers[1]).toHaveTextContent('#');
    expect(headers[2]).toHaveTextContent('Coin');
    expect(headers[3]).toHaveTextContent('Price');
    expect(headers[4]).toHaveTextContent('1h');
    expect(headers[5]).toHaveTextContent('1d');
    expect(headers[6]).toHaveTextContent('1w');
    expect(headers[7]).toHaveTextContent('Volume (24h)');
    expect(headers[8]).toHaveTextContent('Market Cap');
  });

  test('displays the correct number of rows', () => {
    render(<CoinTable items={mockCoinsMarket} />);

    const rows = screen.getAllByTestId('coin-item');
    expect(rows).toHaveLength(mockCoinsMarket.length);
  });

  test('passes correct data to each CoinItem', () => {
    render(<CoinTable items={mockCoinsMarket} />);

    expect(CoinItem).toHaveBeenCalledTimes(mockCoinsMarket.length);
    mockCoinsMarket.forEach((coin) => {
      expect(CoinItem).toHaveBeenCalledWith({ data: coin }, {});
    });
  });

  test('applies styles to headers', () => {
    const { container } = render(<CoinTable items={mockCoinsMarket} />);
    const headers = container.querySelectorAll('th');

    expect(headers[0]).toHaveClass(classes.center);
    expect(headers[1]).toHaveClass(classes.center);
    expect(headers[2]).toHaveClass(classes.left);
  });

  test('applies the passed className to the root element', () => {
    const testClassName = 'test-class';
    const { container } = render(<CoinTable items={mockCoinsMarket} className={testClassName} />);

    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass(testClassName);
  });
});
