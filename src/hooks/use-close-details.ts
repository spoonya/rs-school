import { useRouter } from 'next/router';

import { AppRoutes, DefaultCoinsApiParams, QueryParams } from '@/services';

export function useCloseDetails() {
  const router = useRouter();

  return () => {
    const currentPage = router.query[QueryParams.PAGE] || DefaultCoinsApiParams.PAGE_NUM;

    router.push({
      pathname: AppRoutes.HOME,
      query: currentPage !== DefaultCoinsApiParams.PAGE_NUM ? { [QueryParams.PAGE]: currentPage } : undefined,
    });
  };
}
