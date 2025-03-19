import cn from 'classnames';

import { Table, TableBody, TableCell, TableCellHead, TableContainer, TableHead, TableRow } from '@/components/ui';

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
              <TableCellHead>Name</TableCellHead>
              <TableCellHead>Region</TableCellHead>
              <TableCellHead>Capital</TableCellHead>
              <TableCellHead>Population</TableCellHead>
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
