import cn from 'classnames';

import classes from './password.strength.module.scss';

interface PasswordStrengthProps {
  classname?: string;
  password: string;
}

export const PasswordStrength = ({ password, classname }: Readonly<PasswordStrengthProps>) => {
  const getStrength = () => {
    if (!password) return 'weak';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const strength = getStrength();
  const strengthMap = {
    weak: { bars: 1, color: 'var(--color-error)' },
    medium: { bars: 2, color: 'var(--color-warning)' },
    strong: { bars: 3, color: 'var(--color-success)' },
  };

  return (
    <div className={cn(classes.strengthWrapper, classname)}>
      <div className={classes.bars}>
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={classes.bar}
            style={{
              backgroundColor:
                num <= strengthMap[strength].bars ? strengthMap[strength].color : 'var(--background-tertiary)',
            }}
          />
        ))}
      </div>
      <span className={classes.strengthLabel} style={{ color: strengthMap[strength].color }}>
        {strength} password
      </span>
    </div>
  );
};
