import { useNavigate } from 'react-router-dom';

import { useQueryParams } from '@/hooks';
import { AppRoutes, DefaultCoinsApiParams, SearchParams } from '@/services';

export function useCloseDetails() {
  const navigate = useNavigate();
  const { getParam } = useQueryParams();

  return () => {
    const currentPage = getParam(SearchParams.PAGE, DefaultCoinsApiParams.PAGE_NUM);

    navigate(currentPage ? `${AppRoutes.HOME}?${SearchParams.PAGE}=${currentPage}` : AppRoutes.HOME);
  };
}
