import { X } from 'lucide-react';
import { useRouter } from 'next/router';

import { Preloader } from '@/components/shared';
import Page404 from '@/pages/404';
import { AppRoutes, useGetCoinDetailsQuery } from '@/services';
import { extractDomain, formatNumber, formatPercent } from '@/utils';
import { skipToken } from '@reduxjs/toolkit/query/react';

import classes from './coin-details.module.scss';

type CoinDetailsProps = {
  coinId: string | number | undefined;
};

export function CoinDetails({ coinId }: CoinDetailsProps) {
  const router = useRouter();

  const { data, isFetching, error } = useGetCoinDetailsQuery(typeof coinId === 'string' ? coinId : skipToken, {
    skip: !coinId,
  });

  const handleClose = () => {
    router.push(AppRoutes.HOME, undefined, { shallow: true });
  };

  if (isFetching) {
    return (
      <div className={classes.details}>
        <div className={classes.header}>
          <h2>Loading...</h2>
          <button onClick={handleClose} className={classes.closeButton}>
            <X />
          </button>
        </div>
        <div className={classes.contentWrapper}>
          <Preloader />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <Page404 />;
  }

  return (
    <div className={classes.details}>
      <div className={classes.header}>
        <h2>{data.name}</h2>
        <button onClick={handleClose} className={classes.closeButton} data-testid="close-button">
          <X />
        </button>
      </div>

      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          <div className={classes.mainInfo}>
            <img src={data.icon} alt={data.name} className={classes.image} />
            <div className={classes.info}>
              <p className={classes.symbol}>{data.symbol.toUpperCase()}</p>
              <p className={classes.rank}>Rank #{data.rank}</p>
              <p className={classes.price}>Price: {formatNumber(data.price)}</p>
              <p className={classes.priceBtc}>Price BTC: {data.priceBtc.toFixed(8)}</p>
              <div className={classes.priceChanges}>
                <div className={classes.priceChangeItem}>
                  <span>1h:</span>
                  <span className={classes.change} data-type={(data.priceChange1h ?? 0) > 0 ? 'positive' : 'negative'}>
                    {formatPercent(data.priceChange1h ?? 0)}
                  </span>
                </div>
                <div className={classes.priceChangeItem}>
                  <span>24h:</span>
                  <span className={classes.change} data-type={(data.priceChange1d ?? 0) > 0 ? 'positive' : 'negative'}>
                    {formatPercent(data.priceChange1d ?? 0)}
                  </span>
                </div>
                <div className={classes.priceChangeItem}>
                  <span>7d:</span>
                  <span className={classes.change} data-type={(data.priceChange1w ?? 0) > 0 ? 'positive' : 'negative'}>
                    {formatPercent(data.priceChange1w ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.marketData}>
            <div>
              <h3>Market Cap</h3>
              <p>{formatNumber(data.marketCap, { isCurrency: true })}</p>
            </div>
            <div>
              <h3>Volume 24h</h3>
              <p>{formatNumber(data.volume, { isCurrency: true })}</p>
            </div>
            <div>
              <h3>Available Supply</h3>
              <p>{formatNumber(data.availableSupply)}</p>
            </div>
            <div>
              <h3>Total Supply</h3>
              <p>{formatNumber(data.totalSupply)}</p>
            </div>
            <div>
              <h3>Fully Diluted Valuation</h3>
              <p>{formatNumber(data.fullyDilutedValuation, { isCurrency: true })}</p>
            </div>
          </div>

          <div className={classes.links}>
            <h3>Links</h3>
            <div className={classes.linksGrid}>
              {data.explorers.map((explorer) => (
                <a key={explorer} href={explorer} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  {extractDomain(explorer)}
                </a>
              ))}
              {data.redditUrl && (
                <a href={data.redditUrl} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  Reddit
                </a>
              )}
              {data.twitterUrl && (
                <a href={data.twitterUrl} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
