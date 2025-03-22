import cn from 'classnames';
import React from 'react';

import { CountryAutocomplete, CountryTableRow, NoResults, Preloader } from '@/components/shared';
import { Select, Table, TableBody, TableCellHead, TableContainer, TableHead, TableRow } from '@/components/ui';
import { useCountryFilters } from '@/hooks';
import { useFetchCountriesQuery } from '@/services/api';
import { Regions } from '@/types';
import { createRegions } from '@/utils';

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
                {filteredCountries.map((country, idx) => (
                  <CountryTableRow key={country.cca2} country={country} idx={idx} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
