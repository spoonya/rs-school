import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { CoinItem } from '@/components/shared';
import { mockCoins } from '@/components/shared/CoinTable/__tests__/mock';
import { fireEvent, render, screen } from '@testing-library/react';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ search: '?page=1' }),
  };
});

// Изменённая функция для рендеринга с корректной обёрткой таблицы
const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <table>
        <tbody>{component}</tbody>
      </table>
    </BrowserRouter>
  );
};

describe('CoinItem', () => {
  const mockCoin = mockCoins[0];

  it('renders coin data correctly', () => {
    renderWithRouter(<CoinItem data={mockCoin} />);

    expect(screen.getByText(mockCoin.name)).toBeInTheDocument();
    expect(screen.getByText(mockCoin.symbol)).toBeInTheDocument();
    expect(screen.getByText('$50,000.00')).toBeInTheDocument();
    expect(screen.getByText('+5.50%')).toBeInTheDocument();

    const image = screen.getByAltText(mockCoin.name) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockCoin.image);
  });

  it('navigates to details page when clicked', () => {
    renderWithRouter(<CoinItem data={mockCoin} />);

    const coinItem = screen.getByTestId('coin-item');
    fireEvent.click(coinItem);

    expect(mockNavigate).toHaveBeenCalledWith('/details/bitcoin?page=1');
  });

  it('applies correct styling for positive price change', () => {
    renderWithRouter(<CoinItem data={mockCoin} />);

    const changeCell = screen.getByText('+5.50%').closest('td');
    expect(changeCell).toHaveAttribute('data-type', 'positive');
  });

  it('applies correct styling for negative price change', () => {
    const negativeCoin = {
      ...mockCoin,
      price_change_percentage_24h: -5.5,
    };

    renderWithRouter(<CoinItem data={negativeCoin} />);

    const changeCell = screen.getByText('-5.50%').closest('td');
    expect(changeCell).toHaveAttribute('data-type', 'negative');
  });
});
