import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NoResults, UserCard } from '@/components/shared';
import { Button, Container, Title } from '@/components/ui';
import { AppRoutes } from '@/services';
import { useAppSelector } from '@/store';

import classes from './home.module.scss';

export function HomePage() {
  const users = useAppSelector((state) => state.users.users);
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const now = Date.now();
    const newIds = new Set<number>();

    users.forEach((user, index) => {
      if (now - user.timestamp < 3000) {
        newIds.add(index);
        const timer = setTimeout(() => {
          setHighlightedIds((prev) => new Set([...prev].filter((id) => id !== index)));
        }, 3000);
        return () => clearTimeout(timer);
      }
    });

    setHighlightedIds(newIds);
  }, [users]);

  return (
    <div>
      <Container>
        <Title>User List</Title>
        {users.length === 0 && (
          <>
            <NoResults text="It's empty here 😔. Submit some data" />
            <div className={classes.buttonContainer}>
              <Button onClick={() => navigate(AppRoutes.UNCONTROLLED)}>Uncontrolled Form</Button>
              <Button variant="primary" onClick={() => navigate(AppRoutes.CONTROLLED)}>
                Controlled Form
              </Button>
            </div>
          </>
        )}
        <div className={classes.usersContainer}>
          {users.map((user, index) => (
            <UserCard key={index} user={user} isHighlighted={highlightedIds.has(index)} />
          ))}
        </div>
      </Container>
    </div>
  );
}
