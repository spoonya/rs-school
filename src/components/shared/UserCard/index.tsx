import cn from 'classnames';

import { UserFormData } from '@/types';

import classes from './user.card.module.scss';

type UserCardProps = {
  user: UserFormData;
  isHighlighted: boolean;
};

export function UserCard({ user, isHighlighted }: UserCardProps) {
  return (
    <div className={cn(classes.userCard, isHighlighted && classes.highlighted)}>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <p>Gender: {user.gender}</p>
      <p>Country: {user.country}</p>
      <p>Agreement: {user.agreement ? 'Yes' : 'No'}</p>
      {user.picture && <img src={user.picture.base64} alt="User" className={classes.userImage} />}
    </div>
  );
}
