import { Route, Routes } from 'react-router-dom';

import { Header } from '@/components/shared';
import { RootLayout } from '@/layout';
import { ControlledFormPage, HomePage, Page404, UncontrolledFormPage } from '@/pages';

import { AppRoutes } from './services';

const App = () => {
  return (
    <RootLayout>
      <Header />
      <Routes>
        <Route path={AppRoutes.HOME} element={<HomePage />} />
        <Route path={AppRoutes.UNCONTROLLED} element={<UncontrolledFormPage />} />
        <Route path={AppRoutes.CONTROLLED} element={<ControlledFormPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
