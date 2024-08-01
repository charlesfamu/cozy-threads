import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { CartProvider } from '@/context/CartContext';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased bg-gray-100`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4">
              <Suspense fallback={<Loader />}>
                {children}
              </Suspense>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
