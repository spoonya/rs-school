import '@testing-library/jest-dom';

import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { CoinItem } from '@/components/shared';
import classes from '@/components/shared/CoinItem/coin.item.module.scss';
import { useAppDispatch, useAppSelector } from '@/store';
import { addFavorite, removeFavorite } from '@/store/favorites/slice';
import { mockCoinsMarket } from '@/utils';
import { fireEvent, render, screen } from '@testing-library/react';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams('page=1'),
}));

vi.mock('@/store', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('@/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils')>();
  return {
    ...actual,
    formatNumber: (value: number) => `$${value.toFixed(2)}`,
    formatPercent: (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`,
  };
});

const mockDispatch = vi.fn();

describe('CoinItem', () => {
  const mockCoin = {
    ...mockCoinsMarket[0],
    price: 50000,
    priceChange1h: 5.5,
    priceChange1d: -3.2,
    priceChange1w: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as Mock).mockImplementation((selector) =>
      selector({
        favorites: {
          coins: [{ id: 'bitcoin' }],
        },
      })
    );
  });

  const renderComponent = () =>
    render(
      <table>
        <tbody>
          <CoinItem data={mockCoin} className="test-class" />
        </tbody>
      </table>
    );

  it('displays all coin data correctly', () => {
    renderComponent();

    expect(screen.getByText(mockCoin.name)).toBeInTheDocument();
    expect(screen.getByText(mockCoin.symbol)).toBeInTheDocument();
    expect(screen.getByText('$50000.00')).toBeInTheDocument();
    expect(screen.getByText('+5.5%')).toBeInTheDocument();
    expect(screen.getByText('-3.2%')).toBeInTheDocument();
    expect(screen.getByText('+10.0%')).toBeInTheDocument();
  });

  it('calls navigation when clicking on a row', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('coin-item'));
    expect(mockPush).toHaveBeenCalledWith('/?page=1&details=bitcoin');
  });

  it('toggles favorites without event bubbling', () => {
    const { rerender } = renderComponent();

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(removeFavorite('bitcoin'));

    (useAppSelector as Mock).mockImplementation((selector) => selector({ favorites: { coins: [] } }));

    rerender(
      <table>
        <tbody>
          <CoinItem data={mockCoin} className="test-class" />
        </tbody>
      </table>
    );

    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(addFavorite(mockCoin));
  });

  it('applies correct styles for price changes', () => {
    renderComponent();

    const getCellType = (text: string) => screen.getByText(text).closest('td')?.getAttribute('data-type');

    expect(getCellType('+5.5%')).toBe('positive');
    expect(getCellType('-3.2%')).toBe('negative');
    expect(getCellType('+10.0%')).toBe('positive');
  });

  it('displays the correct icon', () => {
    renderComponent();

    const img = screen.getByAltText(mockCoin.name) as HTMLImageElement;
    expect(img.src).toContain(mockCoin.icon);
    expect(img).toHaveClass(classes.logo);
  });

  it('applies the passed class', () => {
    renderComponent();
    expect(screen.getByTestId('coin-item')).toHaveClass('test-class');
  });
});
