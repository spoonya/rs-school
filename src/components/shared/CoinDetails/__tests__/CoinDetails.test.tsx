import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AppRoutes, useGetCoinDetailsQuery } from '@/services';
import { mockCoinsMarket } from '@/utils';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';

import { CoinDetails } from '../';

const mockPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useParams: () => ({ id: 'bitcoin' }),
  useSearchParams: () => new URLSearchParams('page=1'),
}));

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

const store = configureStore({
  reducer: {},
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
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

    renderWithProviders(<CoinDetails coinId={mockData.id} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays coin details correctly when data is loaded', () => {
    mockUseGetCoinDetailsQuery.mockReturnValue({
      data: mockData,
      isFetching: false,
      error: undefined,
    });

    renderWithProviders(<CoinDetails coinId={mockData.id} />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.symbol.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(`Price: $${mockData.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('navigates back when close button is clicked', () => {
    mockUseGetCoinDetailsQuery.mockReturnValue({
      data: mockData,
      isFetching: false,
      error: undefined,
    });

    renderWithProviders(<CoinDetails coinId={mockData.id} />);
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockPush).toHaveBeenCalledWith(AppRoutes.HOME, undefined, { shallow: true });
  });
});
