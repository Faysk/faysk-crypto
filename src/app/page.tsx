'use client';

import CryptoPrices from '@components/CryptoPrices';
import Chart from '@components/Chart';
import '@styles/home.css';

const sampleLabels = ['01:00', '02:00', '03:00', '04:00', '05:00'];
const sampleDataPoints = [30000, 31000, 32000, 31500, 33000];

export default function Home() {
  return (
    <main className="home">
      {/* Introdução */}
      <header className="intro">
        <div className="intro-container">
          <h1 className="intro-title">Bem-vindo ao Faysk Crypto Tracker</h1>
          <p className="intro-description">
            Acompanhe os preços das principais criptomoedas em tempo real e explore gráficos detalhados.
          </p>
        </div>
      </header>

      {/* Preços de Criptomoedas */}
      <section className="crypto-prices">
        <h2 className="section-title">Preços de Criptomoedas</h2>
        <CryptoPrices />
      </section>

      {/* Gráficos de Criptomoedas */}
      <section className="crypto-charts">
        <h2 className="section-title">Gráficos de Criptomoedas</h2>
        <div className="chart-container">
          <Chart
            labels={sampleLabels}
            dataPoints={sampleDataPoints}
            label="Exemplo de Gráfico: Preço BTC"
          />
        </div>
      </section>
    </main>
  );
}
