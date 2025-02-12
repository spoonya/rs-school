import { Themes } from '@/services';
import React from 'react';

interface ThemeContextType {
  theme: Themes;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: Themes.DARK,
  toggleTheme: () => {},
});
