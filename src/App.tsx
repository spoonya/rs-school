import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from '@/components/shared/Header';
import { RootLayout } from '@/layout';
import { HomePage } from '@/pages';
import { AppRoutes } from '@/services';

const App = () => {
  return (
    <Router>
      <RootLayout>
        <Header />
        <Routes>
          <Route index path={AppRoutes.HOME} element={<HomePage />} />
        </Routes>
      </RootLayout>
    </Router>
  );
};

export default App;
