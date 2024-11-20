'use client';

import { useEffect, useState } from 'react';
import { fetchCryptoDetails } from '@utils/api';
import Chart from '@components/Chart';

import '@styles/cryptoDetails.css';

type CryptoDetailsProps = {
  id: string;
};

type CryptoDetailsData = {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      brl: number;
    };
    market_cap: {
      usd: number;
      brl: number;
    };
    total_volume: {
      usd: number;
      brl: number;
    };
    price_change_percentage_24h: number;
  };
  sparkline_in_7d: {
    price: number[];
  };
};

export default function CryptoDetails({ id }: CryptoDetailsProps) {
  const [details, setDetails] = useState<CryptoDetailsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchCryptoDetails(id);
        setDetails(data);
        setError(null);
      } catch (err) {
        setError('Não foi possível buscar os detalhes da criptomoeda. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  if (loading) {
    return <p className="loading-text" aria-live="polite">Carregando informações...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!details) {
    return null;
  }

  const {
    name,
    symbol,
    image,
    market_data: { current_price, market_cap, total_volume, price_change_percentage_24h },
    sparkline_in_7d,
  } = details;

  return (
    <div className="crypto-details">
      {/* Cabeçalho da Criptomoeda */}
      <div className="crypto-header">
        <img src={image.large} alt={`${name} logo`} className="crypto-image" />
        <h2 className="crypto-name">
          {name} ({symbol.toUpperCase()})
        </h2>
      </div>

      {/* Estatísticas da Criptomoeda */}
      <div className="crypto-stats">
        <p><strong>Preço Atual:</strong> ${current_price.usd.toFixed(2)} | R$ {current_price.brl.toFixed(2)}</p>
        <p><strong>Market Cap:</strong> ${market_cap.usd.toLocaleString()} | R$ {market_cap.brl.toLocaleString()}</p>
        <p><strong>Volume (24h):</strong> ${total_volume.usd.toLocaleString()} | R$ {total_volume.brl.toLocaleString()}</p>
        <p><strong>Variação (24h):</strong> {price_change_percentage_24h.toFixed(2)}%</p>
      </div>

      {/* Gráfico de Histórico */}
      <div className="crypto-chart">
        <h3>Histórico de Preços (7 Dias)</h3>
        <Chart 
          labels={Array.from({ length: sparkline_in_7d.price.length }, (_, i) => `${i + 1}h`)} 
          dataPoints={sparkline_in_7d.price} 
          label={`Preço de ${name} (USD)`} 
        />
      </div>
    </div>
  );
}
