import { X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Preloader } from '@/components/shared';
import { useCoinDetails, useQueryParams } from '@/hooks';
import { Page404 } from '@/pages';
import { AppRoutes, DefaultCoinsApiParams, SearchParams } from '@/services';
import { formatNumber, formatPercent } from '@/utils';

import classes from './coin-details.module.scss';

export function CoinDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getParam } = useQueryParams();
  const { data, isLoading, error } = useCoinDetails(id);

  const handleClose = () => {
    const currentPage = getParam(SearchParams.PAGE, DefaultCoinsApiParams.PAGE_NUM);
    navigate(currentPage ? `${AppRoutes.HOME}?${SearchParams.PAGE}=${currentPage}` : AppRoutes.HOME);
  };

  if (error || (!isLoading && !data)) {
    return <Page404 />;
  }

  return (
    <div className={classes.details}>
      <div className={classes.header}>
        <h2>{data?.name ?? 'Loading...'}</h2>
        <button onClick={handleClose} className={classes.closeButton}>
          <X />
        </button>
      </div>

      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          {error && <div className={classes.error}>{error}</div>}

          {isLoading ? (
            <Preloader />
          ) : (
            data && (
              <>
                <div className={classes.mainInfo}>
                  <img src={data.image.large} alt={data.name} className={classes.image} />
                  <div className={classes.info}>
                    <p className={classes.symbol}>{data.symbol.toUpperCase()}</p>
                    <p className={classes.price}>Price: {formatNumber(data.market_data.current_price.usd)}</p>
                    <p
                      className={classes.change}
                      data-type={data.market_data.price_change_percentage_24h > 0 ? 'positive' : 'negative'}
                    >
                      24h Change: {formatPercent(data.market_data.price_change_percentage_24h)}
                    </p>
                  </div>
                </div>

                <div className={classes.marketData}>
                  <div>
                    <h3>Market Cap</h3>
                    <p>{formatNumber(data.market_data.market_cap.usd)}</p>
                  </div>
                  <div>
                    <h3>24h Volume</h3>
                    <p>{formatNumber(data.market_data.total_volume.usd)}</p>
                  </div>
                </div>

                {data.description.en && (
                  <div className={classes.description}>
                    <h3>About {data.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: data.description.en }} />
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
