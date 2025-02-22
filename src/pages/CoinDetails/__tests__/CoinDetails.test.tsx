import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CoinDetailsPage } from '@/pages';
import { useGetCoinDetailsQuery } from '@/services';
import { formatNumber, mockCoinsMarket } from '@/utils';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('@/services', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services')>();
  return {
    ...actual,
    useGetCoinDetailsQuery: vi.fn(),
  };
});

vi.mock('@/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils')>();
  return {
    ...actual,
    formatNumber: (value: number) => `$${value.toFixed(2)}`,
    formatPercent: (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`,
  };
});

const mockNavigate = vi.fn();
const mockUseParams = vi.fn(() => ({ id: 'bitcoin' }));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
  useLocation: () => ({ search: '?page=1' }),
}));

const store = configureStore({
  reducer: {},
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('CoinDetailsPage', () => {
  const mockData = mockCoinsMarket[0];
  const mockUseGetCoinDetailsQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useGetCoinDetailsQuery).mockImplementation(mockUseGetCoinDetailsQuery);
  });

  it('displays loading indicator while fetching data', () => {
    mockUseGetCoinDetailsQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      error: undefined,
    });

    renderWithProviders(<CoinDetailsPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays coin details correctly when data is loaded', () => {
    mockUseGetCoinDetailsQuery.mockReturnValue({
      data: mockData,
      isFetching: false,
      error: undefined,
    });

    renderWithProviders(<CoinDetailsPage />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.symbol.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(`Price: ${formatNumber(mockData.price)}`)).toBeInTheDocument();
  });

  it('navigates back when close button is clicked', () => {
    mockUseGetCoinDetailsQuery.mockReturnValue({
      data: mockData,
      isFetching: false,
      error: undefined,
    });

    renderWithProviders(<CoinDetailsPage />);
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  it('displays 404 page when there is an error', () => {
    mockUseGetCoinDetailsQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      error: { status: 404 },
    });

    renderWithProviders(<CoinDetailsPage />);
    expect(screen.getByTestId('page-404')).toBeInTheDocument();
  });
});
