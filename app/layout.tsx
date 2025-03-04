import '@/styles/globals.scss';
import 'normalize.css';
import '@/styles/app.scss';

import { Poppins } from 'next/font/google';

import ClientLayout from './client-layout';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Nexum',
  description: 'Next.js. Server Side Rendering',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
