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
import { useCountryFilters } from '@/hooks';
import { useFetchCountriesQuery } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store';
import { addVisited, removeVisited } from '@/store/visited/slice';
import { Regions } from '@/types';
import { createRegions, formatByRanks } from '@/utils';

import { CheckboxVisited, CountryAutocomplete, NoResults, Preloader } from '../';
import classes from './table.countries.module.scss';

interface TableProps {
  className?: string;
}

type SortOrder = 'asc' | 'desc';
type SortField = 'name' | 'population';

export function TableCountries({ className }: Readonly<TableProps>) {
  const { data, isFetching } = useFetchCountriesQuery();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState<Regions>('All');
  const [sortField, setSortField] = React.useState<SortField>('population');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');
  const filteredCountries = useCountryFilters(data, selectedRegion, searchQuery, sortField, sortOrder);
  const visitedCountries = useAppSelector((state) => state.visited.countries);
  const dispatch = useAppDispatch();

  if (isFetching) {
    return <Preloader />;
  }

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
          options={createRegions(data || []).map((region) => ({ value: region, label: region }))}
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

      {!filteredCountries.length && !isFetching ? (
        <NoResults text="No countries found" />
      ) : (
        <div className={cn(classes.root, className)}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead aria-label="visited"></TableCellHead>
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
                {filteredCountries?.map((country, idx) => (
                  <TableRow
                    key={country.cca2}
                    onClick={() => {
                      dispatch(addVisited(country));
                    }}
                  >
                    <TableCell className={classes.col} onClick={(e) => e.stopPropagation()}>
                      <CheckboxVisited
                        className={classes.checkbox}
                        isVisited={visitedCountries.some((c) => c.cca2 === country.cca2)}
                        onVisited={() => {
                          const isVisited = visitedCountries.some((c) => c.cca2 === country.cca2);
                          if (isVisited) {
                            dispatch(removeVisited(country.cca2));
                          } else {
                            dispatch(addVisited(country));
                          }
                        }}
                      />
                    </TableCell>
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
      )}
    </>
  );
}
