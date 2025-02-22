import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { FlyoutFavorites } from '@/components/shared';
import classes from '@/components/shared/FlyoutFavorites/flyout.favorites.module.scss';
import * as store from '@/store';
import { removeAllFavorites } from '@/store/favorites/slice';
import { coinCSVOptions } from '@/utils';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('@/store', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

const mockDispatch = vi.fn();
(store.useAppDispatch as Mock).mockReturnValue(mockDispatch);
(store.useAppSelector as Mock).mockImplementation((selector) => selector({ favorites: { coins: [] } }));

const downloadCSVMock = vi.fn();
vi.mock('@/hooks', () => ({
  useCSV: () => ({
    downloadCSV: downloadCSVMock,
  }),
}));

describe('FlyoutFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not display element if the list of coins is empty', () => {
    (store.useAppSelector as Mock).mockImplementation((callback) => callback({ favorites: { coins: [] } }));
    render(<FlyoutFavorites />);

    const el = screen.getByTestId('flyout-favorites');
    expect(el).toHaveClass(classes.empty);
  });

  it('display correct number of selected coins', () => {
    const coins = ['bitcoin', 'ethereum'];
    (store.useAppSelector as Mock).mockImplementation((callback) => callback({ favorites: { coins } }));
    render(<FlyoutFavorites />);

    expect(screen.getByText('Selected coins: 2')).toBeInTheDocument();
  });

  it('calls removeAllFavorites when "Unselect all" button is clicked', () => {
    const coins = ['bitcoin', 'ethereum'];
    (store.useAppSelector as Mock).mockImplementation((callback) => callback({ favorites: { coins } }));
    render(<FlyoutFavorites />);

    const unselectButton = screen.getByTestId('unselect-all-button');
    fireEvent.click(unselectButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(removeAllFavorites());
  });

  it('calls downloadCSV with correct parameters when "Download" button is clicked', () => {
    const coins = ['bitcoin', 'ethereum', 'litecoin'];
    (store.useAppSelector as Mock).mockImplementation((callback) => callback({ favorites: { coins } }));
    render(<FlyoutFavorites />);

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(downloadCSVMock).toHaveBeenCalledWith(coins, coinCSVOptions, '3_coins.csv');
  });
});
