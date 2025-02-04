import { ReactNode } from 'react';

import { Footer, Header } from '../components';

interface LayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
