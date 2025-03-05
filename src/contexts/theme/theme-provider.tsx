'use client';

import React, { useCallback, useState } from 'react';

import { THEME_KEY, Themes } from '@/services';

import { ThemeContext } from './theme-context-def';

interface ThemeProviderProps {
  children: React.ReactNode;
  serverTheme: Themes;
}

export function ThemeProvider({ children, serverTheme }: Readonly<ThemeProviderProps>) {
  const [theme, setTheme] = useState<Themes>(serverTheme);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }, [theme]);

  const contextValue = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <div className={`theme-provider ${theme.toLowerCase()}`}>
      <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
    </div>
  );
}
