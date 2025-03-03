import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import 'normalize.css';
import '@/styles/app.scss';

import { getCookies } from 'cookies-next';
import { Poppins } from 'next/font/google';
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

interface PageProps {
  theme: Themes;
}

function App({ Component, pageProps, ...rest }: AppProps<PageProps>) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <main className={poppins.className}>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider serverTheme={pageProps.theme}>
            <Component {...props.pageProps} />
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </main>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(() => async ({ ctx }) => {
  const cookies = getCookies(ctx) as { [key: string]: string };
  const theme = (cookies[THEME_KEY] as Themes) in Object.values(Themes) ? (cookies[THEME_KEY] as Themes) : Themes.LIGHT;

  return {
    pageProps: {
      theme,
    },
  };
});

export default App;
