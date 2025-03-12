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

export const navMenu = [
  {
    title: 'Uncontrolled',
    path: AppRoutes.UNCONTROLLED,
  },
  {
    title: 'Controlled',
    path: AppRoutes.CONTROLLED,
  },
];

export const THEME_KEY = `${prefix}-theme`;
