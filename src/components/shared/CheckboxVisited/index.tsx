import cn from 'classnames';
import { Telescope } from 'lucide-react';

import { Checkbox } from '@/components/ui/Checkbox';

import classes from './checkbox.visited.module.scss';

interface VisitedCheckboxProps {
  className?: string;
  isVisited: boolean;
  onVisited: () => void;
}

export function CheckboxVisited({ className, isVisited, onVisited }: Readonly<VisitedCheckboxProps>) {
  return (
    <Checkbox
      className={cn(className, classes.visitedCheckbox)}
      checked={isVisited}
      onChange={onVisited}
      icon={<Telescope className={cn(classes.checkedIcon, { [classes.visitedUnchecked]: !isVisited })} />}
      checkedIcon={<Telescope className={classes.visitedChecked} />}
    />
  );
}
