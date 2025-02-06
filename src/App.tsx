import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from '@/components/shared';
import { RootLayout } from '@/layout';
import { HomePage, Page404 } from '@/pages';
import { AppRoutes } from '@/services';

const App = () => {
  return (
    <Router>
      <RootLayout>
        <Header />
        <Routes>
          <Route index path={AppRoutes.HOME} element={<HomePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </RootLayout>
    </Router>
  );
};

export default App;
