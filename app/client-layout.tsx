'use client';

import { Provider } from 'react-redux';

import { ThemeProvider } from '@/contexts';
import { Themes } from '@/services';
import { makeStore } from '@/store';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const store = makeStore();

  return (
    <Provider store={store}>
      <ThemeProvider serverTheme={Themes.LIGHT}>{children}</ThemeProvider>
    </Provider>
  );
}
