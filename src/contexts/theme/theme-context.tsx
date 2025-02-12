import { useLocalStorage } from '@/hooks';
import { THEME_KEY, Themes } from '@/services';
import React from 'react';
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

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])}>
      {children}
    </ThemeContext.Provider>
  );
}
