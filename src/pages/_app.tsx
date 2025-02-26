import type { AppContext, AppProps } from 'next/app';
import '@/styles/globals.scss';
import 'normalize.css';
import '@/styles/app.scss';

import { getCookies } from 'cookies-next';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';

import { ErrorBoundary } from '@/components/shared';
import { ThemeProvider } from '@/contexts';
import { THEME_KEY, Themes } from '@/services';
import { store } from '@/store';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

type PageProps = {
  theme: Themes;
};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <main className={poppins.className}>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider serverTheme={pageProps.theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </main>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const cookies = getCookies(context.ctx) as { [key: string]: string };
  const theme = (cookies[THEME_KEY] as Themes) in Object.values(Themes) ? (cookies[THEME_KEY] as Themes) : Themes.LIGHT;

  return {
    pageProps: {
      theme,
    },
  };
};
