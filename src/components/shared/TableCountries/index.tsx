import cn from 'classnames';
import React from 'react';

import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableContainer,
  TableHead,
  TableRow,
} from '@/components/ui';
import { useFetchCountriesQuery } from '@/services/api';
import { formatByRanks } from '@/utils';

import { CountryAutocomplete, Preloader } from '../';
import classes from './table.countries.module.scss';

interface TableProps {
  className?: string;
}

export function TableCountries({ className }: Readonly<TableProps>) {
  const { data, isFetching } = useFetchCountriesQuery();
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  if (isFetching) {
    return <Preloader />;
  }

  const createRegions = () => {
    const regions = new Set(data?.map((country) => country.region)).add('All');
    return Array.from(regions).sort();
  };

  const sortCountries = (countries: typeof data, order: 'asc' | 'desc') => {
    if (!countries) return [];
    return [...countries].sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
      if (order === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  };

  const sortedData = sortCountries(data, sortOrder);

  return (
    <>
      <div className={classes.controls}>
        <CountryAutocomplete
          onChange={setSearchQuery}
          value={searchQuery}
          label="Search by name"
          id="country-autocomplete"
        />
        <Select
          options={[...createRegions().map((region) => ({ value: region, label: region }))]}
          onChange={(value) => setSelectedRegion(value)}
          value={selectedRegion}
          label="Filter by region"
          placeholder="Select region"
        />
        <Select<'asc' | 'desc'>
          options={[
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          onChange={(value) => setSortOrder(value)}
          value={sortOrder}
          label="Sort by name"
        />
      </div>
      <div className={cn(classes.root, className)}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellHead align="center">#</TableCellHead>
                <TableCellHead align="left">Name</TableCellHead>
                <TableCellHead>Region</TableCellHead>
                <TableCellHead>Capital</TableCellHead>
                <TableCellHead>
                  Area, km<sup>2</sup>
                </TableCellHead>
                <TableCellHead>Population</TableCellHead>
                <TableCellHead>Currency</TableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData?.map((country, idx) => (
                <TableRow key={country.cca2}>
                  <TableCell align="center" className={classes.col}>
                    {idx + 1}
                  </TableCell>
                  <TableCell className={classes.col} align="left">
                    <div className={classes.name}>
                      {country.flags.png && (
                        <img className={classes.flag} src={country.flags.png} alt={country.name.common} />
                      )}
                      {country.name.common}
                    </div>
                  </TableCell>
                  <TableCell className={classes.col}>{country.region}</TableCell>
                  <TableCell className={classes.col}>{country.capital}</TableCell>
                  <TableCell className={classes.col}>{formatByRanks(country.area)}</TableCell>
                  <TableCell className={classes.col}>{formatByRanks(country.population)} </TableCell>
                  <TableCell className={classes.col}>
                    {Object.keys(country.currencies).map((currencyCode) => (
                      <div key={currencyCode}>
                        {country.currencies[currencyCode].name} ({country.currencies[currencyCode].symbol})
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
