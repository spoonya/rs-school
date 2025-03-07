import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import 'normalize.css';
import '@/styles/app.scss';

import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { ErrorBoundary } from '@/components/shared';
import { ThemeProvider } from '@/contexts';
import { THEME_KEY, Themes } from '@/services';
import { wrapper } from '@/store';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [theme, setTheme] = useState<Themes>(Themes.LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Themes;
    if (savedTheme && Object.values(Themes).includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme(Themes.LIGHT);
      localStorage.setItem(THEME_KEY, Themes.LIGHT);
    }
  }, []);

  return (
    <main className={poppins.className}>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider serverTheme={theme}>
            <Component {...props.pageProps} />
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </main>
  );
}

export default App;
