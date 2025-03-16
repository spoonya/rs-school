'use client';

import { useCallback, useEffect, useState } from 'react';

import { THEME_KEY, Themes } from '@/services';

import { ThemeContext } from './theme-context-def';

interface ThemeProviderProps {
  children: React.ReactNode;
  serverTheme: Themes;
}

export function ThemeProvider({ children, serverTheme }: Readonly<ThemeProviderProps>) {
  const [theme, setTheme] = useState<Themes>(serverTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Themes;
    if (savedTheme && Object.values(Themes).includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme(serverTheme);
      localStorage.setItem(THEME_KEY, serverTheme);
    }
  }, [serverTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }, [theme]);

  return (
    <div className={`theme-provider ${theme.toLowerCase()}`}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    </div>
  );
}
