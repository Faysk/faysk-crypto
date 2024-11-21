'use client';

import { useEffect, useState } from 'react';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-PgErAifN55JDmBEQkNr81TmF';
const CURRENCIES = ['brl', 'usd', 'eur', 'gbp'];

type Crypto = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  ath: number;
  ath_date: string;
  sparkline_in_7d?: { price: number[] };
};

export default function CryptoPrices() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [currency, setCurrency] = useState<string>('brl');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Função para buscar os preços das criptomoedas
   */
  const fetchTopCryptos = async (currency: string): Promise<Crypto[]> => {
    const endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=true`;
    const url = `${BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        headers: {
          'X-CG-Pro-Api-Key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        image: item.image,
        current_price: item.current_price,
        market_cap: item.market_cap,
        total_volume: item.total_volume,
        high_24h: item.high_24h,
        low_24h: item.low_24h,
        price_change_percentage_24h: item.price_change_percentage_24h,
        ath: item.ath,
        ath_date: item.ath_date,
        sparkline_in_7d: item.sparkline_in_7d,
      }));
    } catch (err) {
      console.error(err);
      throw new Error('Não foi possível buscar os dados das criptomoedas.');
    }
  };

  useEffect(() => {
    const getCryptos = async () => {
      setLoading(true);
      try {
        const data = await fetchTopCryptos(currency);
        setCryptos(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Agora TypeScript reconhece a propriedade `message`
        } else {
          setError('Ocorreu um erro desconhecido.');
        }
      } finally {
        setLoading(false);
      }
    };

    getCryptos();
  }, [currency]);


  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const getCurrencySymbol = (currency: string) =>
    currency === 'usd' ? '$' : currency === 'eur' ? '€' : currency === 'gbp' ? '£' : 'R$';

  if (loading) return <p className="loading-text">Carregando...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="crypto-container">
      <div className="currency-switcher">
        <label htmlFor="currency">Moeda:</label>
        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          {CURRENCIES.map((curr) => (
            <option key={curr} value={curr}>
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <table className="crypto-table" aria-live="polite">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preço Atual ({currency.toUpperCase()})</th>
            <th>Alta 24h</th>
            <th>Baixa 24h</th>
            <th>% Mudança 24h</th>
            <th>Cap. de Mercado</th>
            <th>Volume (24h)</th>
            <th>ATH</th>
            <th>ATH Data</th>
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
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </div>
              </td>
              <td>
                {crypto.current_price
                  ? `${getCurrencySymbol(currency)} ${crypto.current_price.toLocaleString('pt-BR')}`
                  : 'N/A'}
              </td>
              <td>{crypto.high_24h ? `${crypto.high_24h.toLocaleString('pt-BR')}` : 'N/A'}</td>
              <td>{crypto.low_24h ? `${crypto.low_24h.toLocaleString('pt-BR')}` : 'N/A'}</td>
              <td
                className={
                  crypto.price_change_percentage_24h > 0
                    ? 'positive'
                    : crypto.price_change_percentage_24h < 0
                      ? 'negative'
                      : ''
                }
              >
                {crypto.price_change_percentage_24h
                  ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>
                {crypto.market_cap
                  ? `${getCurrencySymbol(currency)} ${crypto.market_cap.toLocaleString('pt-BR')}`
                  : 'N/A'}
              </td>
              <td>
                {crypto.total_volume
                  ? `${getCurrencySymbol(currency)} ${crypto.total_volume.toLocaleString('pt-BR')}`
                  : 'N/A'}
              </td>
              <td>{crypto.ath ? `${crypto.ath.toLocaleString('pt-BR')}` : 'N/A'}</td>
              <td>{crypto.ath_date ? new Date(crypto.ath_date).toLocaleDateString('pt-BR') : 'N/A'}</td>
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
    </div>
  );
}
