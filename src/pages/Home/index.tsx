import { TableCountries } from '@/components/shared';
import { Container, Title } from '@/components/ui';

import classes from './home.module.scss';

export function HomePage() {
  return (
    <div>
      <Container>
        <Title className={classes.title}>Awesome Countries</Title>
        <TableCountries />
      </Container>
    </div>
  );
}
