'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import { useCoinCategories } from '@/hooks';
import { CoinCategories, QueryParams } from '@/services';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeCategory } = useCoinCategories();

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get(QueryParams.PAGE);
    return Math.max(1, Number(pageParam || 1));
  }, [searchParams]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / itemsPerPage)), [totalItems, itemsPerPage]);

  const paginate = useCallback(
    (pageNumber: number) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (pageNumber > 1) {
        newParams.set(QueryParams.PAGE, String(pageNumber));
      } else {
        newParams.delete(QueryParams.PAGE);
      }

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (activeCategory !== CoinCategories.ALL) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete(QueryParams.PAGE);

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [activeCategory, router, pathname, searchParams]);

  return { currentPage, paginate, itemsPerPage, totalPages };
};
