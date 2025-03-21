import { Country, Regions } from '@/types';

export const useCountryFilters = (
  countries: Country[] | undefined,
  region: Regions,
  searchQuery: string,
  sortField: 'name' | 'population',
  sortOrder: 'asc' | 'desc'
) => {
  const filterByRegion = (): Country[] => {
    if (region === 'All') return countries || [];
    return (countries || []).filter((c) => c.region === region);
  };

  const filterBySearch = (data: Country[]): Country[] => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((c) => c.name.common.toLowerCase().includes(query));
  };

  const sortData = (data: Country[]): Country[] => {
    return [...data].sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      }
      return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
    });
  };

  const regionFiltered = filterByRegion();
  const searchFiltered = filterBySearch(regionFiltered);
  return sortData(searchFiltered);
};
