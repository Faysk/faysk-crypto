'use client';

import { useEffect, useState } from 'react';
import { fetchCryptoPrices } from '@utils/api';

import '@styles/table.css';

type CryptoPrices = {
  [key: string]: {
    usd: number;
    brl: number;
  };
};

export default function CryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrices | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPrices = async () => {
      try {
        // Verifica se há dados no localStorage
        const cachedData = localStorage.getItem('cryptoPrices');
        const cachedTimestamp = localStorage.getItem('cryptoPricesTimestamp');

        const now = Date.now();

        // Usa o cache se ele for válido (menos de 30 segundos)
        if (cachedData && cachedTimestamp && now - parseInt(cachedTimestamp) < 30000) {
          setPrices(JSON.parse(cachedData));
          return;
        }

        // Busca novos dados da API
        const data = await fetchCryptoPrices();

        // Salva os dados e o timestamp no localStorage
        localStorage.setItem('cryptoPrices', JSON.stringify(data));
        localStorage.setItem('cryptoPricesTimestamp', now.toString());

        setPrices(data);
        setError(null); // Limpa erros anteriores
      } catch (err) {
        setError('Failed to fetch prices. Please try again later.');
      }
    };

    getPrices();

    // Atualiza automaticamente a cada 30 segundos
    const interval = setInterval(() => {
      getPrices();
    }, 30000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!prices) {
    return <p>Loading...</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Cryptocurrency</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Price (USD)</th>
          <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Price (BRL)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(prices).map(([crypto, price]) => (
          <tr key={crypto}>
            <td style={{ padding: '10px', textAlign: 'center' }}>{crypto}</td>
            <td style={{ padding: '10px', textAlign: 'center' }}>${price.usd.toFixed(2)}</td>
            <td style={{ padding: '10px', textAlign: 'center' }}>R$ {price.brl.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
