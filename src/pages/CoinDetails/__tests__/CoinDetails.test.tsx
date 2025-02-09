import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CoinDetailsPage } from '@/pages';
import { fireEvent, render, screen } from '@testing-library/react';

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();
const mockUseCoinDetails = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
    useLocation: () => ({ search: '?page=1' }),
  };
});

vi.mock('@/hooks', () => ({
  useCoinDetails: () => mockUseCoinDetails(),
  useQueryParams: () => ({
    getParam: () => '1',
  }),
}));

const mockCoinData = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  image: {
    large: 'https://example.com/bitcoin.png',
  },
  market_data: {
    current_price: {
      usd: 50000,
    },
    price_change_percentage_24h: 5.5,
    market_cap: {
      usd: 1000000000,
    },
    total_volume: {
      usd: 50000000,
    },
  },
  description: {
    en: 'Bitcoin description',
  },
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CoinDetailsPage', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: 'bitcoin' });
    vi.clearAllMocks();
  });

  it('displays loading indicator while fetching data', () => {
    mockUseCoinDetails.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithRouter(<CoinDetailsPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays coin details correctly when data is loaded', () => {
    mockUseCoinDetails.mockReturnValue({
      data: mockCoinData,
      isLoading: false,
      error: null,
    });

    renderWithRouter(<CoinDetailsPage />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Price: $50,000.00')).toBeInTheDocument();
    expect(screen.getByText('24h Change: +5.50%')).toBeInTheDocument();

    const image = screen.getByAltText('Bitcoin') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/bitcoin.png');

    expect(screen.getByText('Market Cap')).toBeInTheDocument();
    expect(screen.getByText('24h Volume')).toBeInTheDocument();
    expect(screen.getByText('About Bitcoin')).toBeInTheDocument();
  });

  it('navigates back when close button is clicked', () => {
    mockUseCoinDetails.mockReturnValue({
      data: mockCoinData,
      isLoading: false,
      error: null,
    });

    renderWithRouter(<CoinDetailsPage />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  it('displays 404 page when there is an error', () => {
    mockUseCoinDetails.mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Error loading coin details',
    });

    renderWithRouter(<CoinDetailsPage />);

    expect(screen.getByTestId('page-404')).toBeInTheDocument();
  });
});
