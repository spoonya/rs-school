import React from 'react';

import { Header } from '@/components/shared';

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutDefault: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};
