import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePagination } from '@/hooks';
import { SearchParams } from '@/services';
import { act, renderHook } from '@testing-library/react';

const mockNavigate = vi.fn();
const mockSetParam = vi.fn();
const mockGetParam = vi.fn();
const mockLocation = { pathname: '/', search: '' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

vi.mock('@/hooks/use-query-params', () => ({
  useQueryParams: () => ({
    getParam: mockGetParam,
    setParam: mockSetParam,
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => <BrowserRouter>{children}</BrowserRouter>;

describe('usePagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetParam.mockReturnValue('1');
    mockLocation.search = '';
  });

  it('initializes with correct page from URL', () => {
    const { result } = renderHook(() => usePagination(10, 100), { wrapper });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(10);
    expect(mockGetParam).toHaveBeenCalledWith(SearchParams.PAGE, '1');
  });

  it('updates URL when page changes', () => {
    const { result } = renderHook(() => usePagination(10, 100), { wrapper });

    act(() => {
      result.current.paginate(2);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
    expect(mockSetParam).toHaveBeenCalledWith(SearchParams.PAGE, 2);
  });

  it('does not update if page number is invalid', () => {
    const { result } = renderHook(() => usePagination(10, 100), { wrapper });

    act(() => {
      result.current.paginate(0);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetParam).not.toHaveBeenCalled();

    act(() => {
      result.current.paginate(11);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetParam).not.toHaveBeenCalled();
  });

  it('should use setParam to update page while preserving other parameters', () => {
    mockLocation.search = '?search=bitcoin';

    const { result } = renderHook(() => usePagination(10, 100), { wrapper });

    act(() => {
      result.current.paginate(2);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
    expect(mockSetParam).toHaveBeenCalledWith(SearchParams.PAGE, 2);
  });
});
