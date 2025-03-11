const prefix = 'forms';

export enum AppRoutes {
  HOME = '/',
  UNCONTROLLED = '/uncontrolled',
  CONTROLLED = '/controlled',
}

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export const THEME_KEY = `${prefix}-theme`;
