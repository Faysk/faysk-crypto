import '@styles/globals.css';
import '@styles/colors.css';
import '@styles/main.css';

import Header from '@components/Header';
import Footer from '@components/Footer';

export const metadata = {
  title: 'Faysk Crypto Tracker',
  description: 'Acompanhe as criptomoedas em tempo real',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="app-container">
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
