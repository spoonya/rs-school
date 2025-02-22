import React from 'react';

import { useLocalStorage } from '@/hooks';
import { THEME_KEY, Themes } from '@/services';

import { ThemeContext } from './theme-context-def';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  const [theme, setTheme] = useLocalStorage(THEME_KEY, Themes.DARK);

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    setTheme(newTheme);
  }, [theme, setTheme]);

  return (
    <div className={`theme-provider ${theme.toLowerCase()}`}>
      <ThemeContext.Provider value={React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
}
