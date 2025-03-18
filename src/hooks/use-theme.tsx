import React from 'react';

import { ThemeContext } from '@/contexts/theme/theme-context-def';

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
