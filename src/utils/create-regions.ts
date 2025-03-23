import { Country, Regions } from '@/types';

export const createRegions = (data: Country[]) => {
  const regions = new Set<Regions>(data.map((country) => country.region));
  regions.add('All');
  return Array.from(regions).sort();
};
