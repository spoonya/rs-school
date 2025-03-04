'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { AppRoutes, DefaultCoinsApiParams, QueryParams } from '@/services';

export function useCloseDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return () => {
    const currentPage = searchParams.get(QueryParams.PAGE) || DefaultCoinsApiParams.PAGE_NUM;

    const newParams = new URLSearchParams();
    if (currentPage !== DefaultCoinsApiParams.PAGE_NUM) {
      newParams.set(QueryParams.PAGE, currentPage);
    }

    router.push(`${AppRoutes.HOME}${newParams.toString() ? `?${newParams.toString()}` : ''}`);
  };
}
