import CryptoPrices from '@components/CryptoPrices';
import '@styles/home.css';

export default function Home() {
  return (
    <main className="home">
      <section className="intro">
        <div className="intro-container">
          <h2 className="intro-title">Bem-vindo ao Faysk Crypto Tracker</h2>
          <p className="intro-description">
            Acompanhe os preços das principais criptomoedas em tempo real e explore gráficos detalhados.
          </p>
        </div>
      </section>
      <section className="crypto-prices">
        <h3 className="section-title">Preços de Criptomoedas</h3>
        <CryptoPrices />
      </section>
      <section className="crypto-charts">
        <h3 className="section-title">Gráficos de Criptomoedas</h3>
        <div className="chart-container">
          {/* Gráficos futuros serão adicionados aqui */}
          <p>Gráficos interativos de preços serão exibidos em breve!</p>
        </div>
      </section>
    </main>
  );
}
