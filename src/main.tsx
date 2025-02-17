import './styles/global.scss';
import 'normalize.css';
import './styles/app.scss';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { ErrorBoundary } from '@/components/shared';

import { ThemeProvider } from './contexts';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
