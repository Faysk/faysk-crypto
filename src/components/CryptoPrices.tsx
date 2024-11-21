'use client';

import { useEffect, useState } from 'react';
import { fetchTopCryptos } from '@utils/api';

import '@styles/table.css';

type Crypto = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price?: number;
  market_cap?: number;
  market_cap_rank?: number;
  fully_diluted_valuation?: number;
  total_volume?: number;
  high_24h?: number;
  low_24h?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d_in_currency?: number;
  ath?: number;
  ath_date?: string;
  sparkline_in_7d?: { price: number[] };
};

export default function CryptoPrices() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCryptos = async () => {
      setLoading(true);
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

  const renderValue = (value: number | undefined, prefix: string = '', suffix: string = '') =>
    value !== undefined ? `${prefix}${value.toLocaleString('pt-BR')}${suffix}` : 'N/A';

  if (loading) return <p className="loading-text">Carregando...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="crypto-container">
      <table className="crypto-table" aria-live="polite">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Cap. Rank</th>
            <th>Alta (24h)</th>
            <th>Baixa (24h)</th>
            <th>% 1h</th>
            <th>% 24h</th>
            <th>% 7d</th>
            <th>Cap. de Mercado</th>
            <th>Valor Total</th>
            <th>Volume (24h)</th>
            <th>Suprimento Circulante</th>
            <th>Suprimento Máximo</th>
            <th>ATH</th>
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
                    src={crypto.image}
                    alt={`Logo de ${crypto.name}`}
                    className="crypto-icon"
                    loading="lazy"
                  />
                  {crypto.name} ({crypto.symbol?.toUpperCase()})
                </div>
              </td>
              <td>{renderValue(crypto.current_price, 'R$ ')}</td>
              <td>{crypto.market_cap_rank || 'N/A'}</td>
              <td>{renderValue(crypto.high_24h, 'R$ ')}</td>
              <td>{renderValue(crypto.low_24h, 'R$ ')}</td>
              <td
                className={
                  crypto.price_change_percentage_1h_in_currency
                    ? crypto.price_change_percentage_1h_in_currency > 0
                      ? 'positive'
                      : 'negative'
                    : ''
                }
              >
                {renderValue(crypto.price_change_percentage_1h_in_currency, '', '%')}
              </td>
              <td
                className={
                  crypto.price_change_percentage_24h
                    ? crypto.price_change_percentage_24h > 0
                      ? 'positive'
                      : 'negative'
                    : ''
                }
              >
                {renderValue(crypto.price_change_percentage_24h, '', '%')}
              </td>
              <td
                className={
                  crypto.price_change_percentage_7d_in_currency
                    ? crypto.price_change_percentage_7d_in_currency > 0
                      ? 'positive'
                      : 'negative'
                    : ''
                }
              >
                {renderValue(crypto.price_change_percentage_7d_in_currency, '', '%')}
              </td>
              <td>{renderValue(crypto.market_cap, 'R$ ')}</td>
              <td>{renderValue(crypto.fully_diluted_valuation, 'R$ ')}</td>
              <td>{renderValue(crypto.total_volume, 'R$ ')}</td>
              <td>{renderValue(crypto.circulating_supply)}</td>
              <td>{renderValue(crypto.max_supply)}</td>
              <td>
                {crypto.ath
                  ? `R$ ${crypto.ath.toLocaleString('pt-BR')} em ${new Date(crypto.ath_date!).toLocaleDateString('pt-BR')}`
                  : 'N/A'}
              </td>
              <td>
                <div className="sparkline">
                  {crypto.sparkline_in_7d?.price && crypto.sparkline_in_7d.price.length > 0 ? (
                    crypto.sparkline_in_7d.price.map((price, idx) => (
                      <div
                        key={idx}
                        className="sparkline-bar"
                        style={{
                          height: `${Math.max(price / 1000, 1)}px`, // Ajuste a escala conforme necessário
                        }}
                      />
                    ))
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
