import { ReactNode } from 'react';

import { Header } from '@/components/shared';

interface LayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
}
