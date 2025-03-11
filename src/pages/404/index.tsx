import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';
import { AppRoutes } from '@/services';

import classes from './404.module.scss';

export function Page404() {
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>404</h1>
      <p className={classes.message}>The page you are looking for does not exist.</p>
      <Button onClick={() => navigate(AppRoutes.HOME)}>Back home</Button>
    </div>
  );
}
