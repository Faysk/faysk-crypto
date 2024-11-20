'use client';

import { useEffect, useState } from 'react';
import { fetchTopCryptos } from '@utils/api';

import '@styles/table.css';

type Crypto = {
  id: string;
  name: string;
  symbol: string;
  current_price?: number;
  market_cap?: number;
  total_volume?: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d_in_currency?: number;
  sparkline_in_7d?: { price: number[] };
};

export default function CryptoPrices() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCryptos = async () => {
      try {
        const data = await fetchTopCryptos(10, 'brl');
        setCryptos(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Falha ao obter dados das criptomoedas.');
      } finally {
        setLoading(false);
      }
    };

    getCryptos();
  }, []);

  if (loading) return <p className="loading-text">Carregando...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <table className="crypto-table" aria-live="polite">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>1h %</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Cap. de Mercado</th>
          <th>Volume (24h)</th>
          <th>Últimos 7 Dias</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.map((crypto, index) => (
          <tr key={crypto.id}>
            <td>{index + 1}</td>
            <td>
              <div className="crypto-name">
                <img
                  src={`https://assets.coingecko.com/coins/images/${crypto.id}/thumb.png`}
                  alt={crypto.name}
                  className="crypto-icon"
                  loading="lazy"
                />
                {crypto.name} ({crypto.symbol?.toUpperCase()})
              </div>
            </td>
            <td>{crypto.current_price ? `R$ ${crypto.current_price.toLocaleString('pt-BR')}` : 'N/A'}</td>
            <td
              className={
                crypto.price_change_percentage_1h_in_currency !== undefined
                  ? crypto.price_change_percentage_1h_in_currency > 0
                    ? 'positive'
                    : 'negative'
                  : ''
              }
            >
              {crypto.price_change_percentage_1h_in_currency !== undefined
                ? `${crypto.price_change_percentage_1h_in_currency.toFixed(2)}%`
                : 'N/A'}
            </td>
            <td
              className={
                crypto.price_change_percentage_24h !== undefined
                  ? crypto.price_change_percentage_24h > 0
                    ? 'positive'
                    : 'negative'
                  : ''
              }
            >
              {crypto.price_change_percentage_24h !== undefined
                ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                : 'N/A'}
            </td>
            <td
              className={
                crypto.price_change_percentage_7d_in_currency !== undefined
                  ? crypto.price_change_percentage_7d_in_currency > 0
                    ? 'positive'
                    : 'negative'
                  : ''
              }
            >
              {crypto.price_change_percentage_7d_in_currency !== undefined
                ? `${crypto.price_change_percentage_7d_in_currency.toFixed(2)}%`
                : 'N/A'}
            </td>
            <td>{crypto.market_cap ? `R$ ${crypto.market_cap.toLocaleString('pt-BR')}` : 'N/A'}</td>
            <td>{crypto.total_volume ? `R$ ${crypto.total_volume.toLocaleString('pt-BR')}` : 'N/A'}</td>
            <td>
              <div className="sparkline">
                {crypto.sparkline_in_7d?.price?.map((price, idx) => (
                  <div
                    key={idx}
                    className="sparkline-bar"
                    style={{
                      height: `${Math.max(price / 100, 1)}px`,
                    }}
                  />
                )) || <span>N/A</span>}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
