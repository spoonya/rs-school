import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { RootLayout } from './layout';
import { HomePage } from './pages';
import { AppRoutes } from './services';

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route index path={AppRoutes.HOME} element={<HomePage />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}
