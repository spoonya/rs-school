const prefix = 'forms';

export enum AppRoutes {
  HOME = '/',
}

export enum ApiEndpoints {
  COUNTRIES_ALL_WITH_FIELDS = '/all?fields=name,flags,cca2,population,capital,region,languages,currencies,area',
}

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export const THEME_KEY = `${prefix}-theme`;
