import { Country, Regions } from '@/types';

export const useCountryFilters = (
  countries: Country[] | undefined,
  region: Regions,
  searchQuery: string,
  sortField: 'name' | 'population',
  sortOrder: 'asc' | 'desc'
) => {
  if (!countries) return [];

  let filtered = region === 'All' ? countries : countries.filter((country) => country.region === region);

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((country) => country.name.common.toLowerCase().includes(query));
  }

  return [...filtered].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc'
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common);
    }
    return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
  });
};
