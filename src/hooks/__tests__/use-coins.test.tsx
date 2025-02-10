import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCoinsMarkets } from '@/hooks';
import { Api } from '@/services';
import { renderHook, waitFor } from '@testing-library/react';

import type { Mock } from 'vitest';

vi.mock('@/services', () => ({
  Api: {
    coins: {
      getMarkets: vi.fn(),
    },
  },
}));

describe('useCoinsMarkets', () => {
  const mockCoins = [
    { id: '1', name: 'Bitcoin' },
    { id: '2', name: 'Ethereum' },
    { id: '3', name: 'Dogecoin' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and return coins data', async () => {
    (Api.coins.getMarkets as Mock).mockResolvedValueOnce(mockCoins);

    const { result } = renderHook(() => useCoinsMarkets('1', 10, 30));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.coins).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.coins).toEqual(mockCoins);
    expect(result.current.error).toBeNull();
    expect(Api.coins.getMarkets).toHaveBeenCalledWith({ page: '1' });
  });

  it('should slice data for the last page', async () => {
    (Api.coins.getMarkets as Mock).mockResolvedValueOnce(mockCoins);

    const { result } = renderHook(() => useCoinsMarkets('3', 1, 3));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.coins).toHaveLength(1);
    expect(result.current.coins).toEqual([mockCoins[0]]);
  });

  it('should update data when page changes', async () => {
    const mockGetMarkets = Api.coins.getMarkets as Mock;
    mockGetMarkets.mockResolvedValueOnce(mockCoins).mockResolvedValueOnce([...mockCoins].reverse());

    const { result, rerender } = renderHook(({ page }) => useCoinsMarkets(page, 10, 30), {
      initialProps: { page: '1' },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.coins).toEqual(mockCoins);

    rerender({ page: '2' });

    await waitFor(() => {
      expect(result.current.coins).toEqual([...mockCoins].reverse());
    });

    expect(Api.coins.getMarkets).toHaveBeenCalledTimes(2);
  });
});
