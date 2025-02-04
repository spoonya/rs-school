import './styles/global.scss';
import 'normalize.css';
import './styles/app.scss';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';
import { ErrorBoundary } from '@/components/shared';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
