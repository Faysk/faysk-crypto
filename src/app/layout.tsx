export const metadata = {
    title: 'Faysk Crypto Tracker',
    description: 'Acompanhe as criptomoedas em tempo real',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
          <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
            <h1>Faysk Crypto</h1>
          </header>
          <main style={{ padding: '20px' }}>{children}</main>
          <footer style={{ textAlign: 'center', padding: '10px', background: '#f1f1f1' }}>
            <p>© 2024 Faysk Crypto</p>
          </footer>
        </body>
      </html>
    );
  }
  