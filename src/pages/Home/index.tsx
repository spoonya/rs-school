import cn from 'classnames';
import { useEffect, useState } from 'react';

import { NoResults } from '@/components/shared';
import { Container, Title } from '@/components/ui';
import { useAppSelector } from '@/store';

import classes from './home.module.scss';

export function HomePage() {
  const users = useAppSelector((state) => state.users.users);
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(new Set());

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
        <Title level={1}>User List</Title>
        {users.length === 0 && <NoResults text="Forms data not found" />}
        <div className={classes.usersContainer}>
          {users.map((user, index) => (
            <div key={index} className={cn(classes.userCard, highlightedIds.has(index) && classes.highlighted)}>
              <h2>{user.name}</h2>
              <p>Age: {user.age}</p>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
              <p>Gender: {user.gender}</p>
              <p>Country: {user.country}</p>
              <p>Agreement: {user.agreement ? 'Yes' : 'No'}</p>
              {user.picture && <img src={user.picture.base64} alt="User" className={classes.userImage} />}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
