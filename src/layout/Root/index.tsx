import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="layout">
      <main className="main">{children}</main>
    </div>
  );
}
