import { useRouter } from 'next/router';

import { Button } from '@/components/ui';
import { LayoutDefault } from '@/layouts';
import { AppRoutes } from '@/services';
import classes from '@/styles/404.module.scss';

export function Page404() {
  const router = useRouter();

  return (
    <LayoutDefault>
      <div className={classes.root} data-testid="page-404">
        <h1 className={classes.title}>404</h1>
        <p className={classes.message}>The page you are looking for does not exist.</p>
        <Button onClick={() => router.push(AppRoutes.HOME)}>Back home</Button>
      </div>
    </LayoutDefault>
  );
}
