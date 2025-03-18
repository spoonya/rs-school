import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <main className="main">{children}</main>
    </div>
  );
};
