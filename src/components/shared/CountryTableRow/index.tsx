import { CheckboxVisited } from '@/components/shared';
import { TableCell, TableRow } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store';
import { addVisited, removeVisited } from '@/store/visited/slice';
import { Country } from '@/types';
import { formatByRanks } from '@/utils';

import classes from './country.table.row.module.scss';

interface CountryTableRowProps {
  country: Country;
  idx: number;
}

export const CountryTableRow: React.FC<CountryTableRowProps> = ({ country, idx }) => {
  const visitedCountries = useAppSelector((state) => state.visited.countries);
  const dispatch = useAppDispatch();

  const isVisited = visitedCountries.some((c) => c.cca2 === country.cca2);

  const handleRowClick = () => {
    dispatch(addVisited(country));
  };

  const handleCheckboxClick = () => {
    if (isVisited) {
      dispatch(removeVisited(country.cca2));
    } else {
      dispatch(addVisited(country));
    }
  };

  return (
    <TableRow onClick={handleRowClick}>
      <TableCell className={classes.col} onClick={(e) => e.stopPropagation()}>
        <CheckboxVisited className={classes.checkbox} isVisited={isVisited} onVisited={handleCheckboxClick} />
      </TableCell>
      <TableCell align="center" className={classes.col}>
        {idx + 1}
      </TableCell>
      <TableCell className={classes.col} align="left">
        <div className={classes.name}>
          {country.flags.png && <img className={classes.flag} src={country.flags.png} alt={country.name.common} />}
          {country.name.common}
        </div>
      </TableCell>
      <TableCell className={classes.col}>{country.region}</TableCell>
      <TableCell className={classes.col}>{country.capital}</TableCell>
      <TableCell className={classes.col}>{formatByRanks(country.area)}</TableCell>
      <TableCell className={classes.col}>{formatByRanks(country.population)}</TableCell>
      <TableCell className={classes.col}>
        {Object.entries(country.currencies).map(([code, currency]) => (
          <div key={code}>
            {currency.name} ({currency.symbol})
          </div>
        ))}
      </TableCell>
    </TableRow>
  );
};
