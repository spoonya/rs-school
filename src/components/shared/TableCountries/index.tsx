import cn from 'classnames';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@/components/ui';

import classes from './table.countries.module.scss';

interface TableProps {
  className?: string;
}

export function TableCountries({ className }: Readonly<TableProps>) {
  return (
    <div className={cn(classes.root, className)}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Capital</TableCell>
              <TableCell>Population</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>United States</TableCell>
              <TableCell>North America</TableCell>
              <TableCell>Washington, D.C.</TableCell>
              <TableCell>329,000,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>United Kingdom</TableCell>
              <TableCell>Europe</TableCell>
              <TableCell>London</TableCell>
              <TableCell>66,000,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>France</TableCell>
              <TableCell>Europe</TableCell>
              <TableCell>Paris</TableCell>
              <TableCell>66,000,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
