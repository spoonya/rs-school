import cn from 'classnames';

import { Spinner } from '@/components/ui';

import styles from './preloader.module.scss';

interface PreloaderProps {
  className?: string;
}

export function Preloader({ className }: Readonly<PreloaderProps>) {
  return (
    <div className={cn(styles.root, className)}>
      <Spinner />
    </div>
  );
}
