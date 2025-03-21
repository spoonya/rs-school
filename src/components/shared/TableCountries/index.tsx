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
import { Regions } from '@/types';
import { formatByRanks } from '@/utils';

import { CountryAutocomplete, Preloader } from '../';
import classes from './table.countries.module.scss';

interface TableProps {
  className?: string;
}

type SortOrder = 'asc' | 'desc';
type SortField = 'name' | 'population';

export function TableCountries({ className }: Readonly<TableProps>) {
  const { data, isFetching } = useFetchCountriesQuery();
  const [selectedRegion, setSelectedRegion] = React.useState<Regions>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortField, setSortField] = React.useState<SortField>('population');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');

  if (isFetching) {
    return <Preloader />;
  }

  const createRegions = () => {
    const regions = new Set<Regions>(data?.map((country) => country.region));
    regions.add('All');
    return Array.from(regions).sort();
  };

  const filterByRegion = (countries: typeof data, region: string) => {
    if (region === 'All') return countries;
    return countries?.filter((country) => country.region === region);
  };

  const filterBySearchQuery = (countries: typeof data, query: string) => {
    if (!query) return countries;
    return countries?.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase()));
  };

  const sortCountries = (countries: typeof data, field: SortField, order: SortOrder) => {
    if (!countries) return [];
    return [...countries].sort((a, b) => {
      if (field === 'name') {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else {
        return order === 'asc' ? a.population - b.population : b.population - a.population;
      }
    });
  };

  const regionFiltered = filterByRegion(data, selectedRegion);
  const searchFiltered = filterBySearchQuery(regionFiltered, searchQuery);
  const sortedData = sortCountries(searchFiltered, sortField, sortOrder);

  return (
    <>
      <div className={classes.controls}>
        <CountryAutocomplete
          onChange={setSearchQuery}
          value={searchQuery}
          label="Search by name"
          id="country-autocomplete"
        />
        <Select<Regions>
          options={createRegions().map((region) => ({ value: region, label: region }))}
          onChange={(value) => setSelectedRegion(value)}
          value={selectedRegion}
          label="Filter by region"
          placeholder="Select region"
        />
        <Select<SortField>
          options={[
            { value: 'name', label: 'Name' },
            { value: 'population', label: 'Population' },
          ]}
          onChange={(value) => setSortField(value)}
          value={sortField}
          label="Sort by"
        />
        <Select<SortOrder>
          options={[
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          onChange={(value) => setSortOrder(value)}
          value={sortOrder}
          label="Order"
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
                  <TableCell className={classes.col}>{formatByRanks(country.population)}</TableCell>
                  <TableCell className={classes.col}>
                    {Object.entries(country.currencies).map(([code, currency]) => (
                      <div key={code}>
                        {currency.name} ({currency.symbol})
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
