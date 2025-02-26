import { useRouter } from 'next/router';

import { AppRoutes, DefaultCoinsApiParams, SearchParams } from '@/services';

export function useCloseDetails() {
  const router = useRouter();

  return () => {
    const currentPage = router.query[SearchParams.PAGE] || DefaultCoinsApiParams.PAGE_NUM;

    router.push({
      pathname: AppRoutes.HOME,
      query: currentPage !== DefaultCoinsApiParams.PAGE_NUM ? { [SearchParams.PAGE]: currentPage } : undefined,
    });
  };
}
