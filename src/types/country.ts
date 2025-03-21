export type Regions = 'All' | 'Antarctic' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Country {
  name: CountryName;
  flags: Flags;
  cca2: string;
  population: number;
  capital: string[];
  region: Regions;
  continents: string[];
  area: number;
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

export type CountriesResponse = Country[];
