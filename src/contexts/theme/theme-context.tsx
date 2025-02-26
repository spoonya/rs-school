import { getCookie, setCookie } from 'cookies-next';
import React, { useEffect } from 'react';

import { THEME_KEY, Themes } from '@/services';

import { ThemeContext } from './theme-context-def';

interface ThemeProviderProps {
  children: React.ReactNode;
  serverTheme: Themes;
}

export function ThemeProvider({ children, serverTheme }: Readonly<ThemeProviderProps>) {
  const [theme, setTheme] = React.useState<Themes>(serverTheme);

  useEffect(() => {
    const savedTheme = getCookie(THEME_KEY) as Themes;
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
    }
  }, [setTheme, theme]);

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    setTheme(newTheme);
    setCookie(THEME_KEY, newTheme, { path: '/' });
  }, [theme]);

  return (
    <div className={`theme-provider ${theme.toLowerCase()}`}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    </div>
  );
}
