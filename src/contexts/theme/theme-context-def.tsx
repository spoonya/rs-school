import React from 'react';

import { Themes } from '@/services';

interface ThemeContextType {
  theme: Themes;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: Themes.DARK,
  toggleTheme: () => {},
});
