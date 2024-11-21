// src/components/CryptoDetails.tsx

'use client';

import Chart from '@components/Chart';
import '@styles/cryptoDetails.css';

type CryptoDetailsProps = {
  details: {
    id: string;
    name: string;
    symbol: string;
    hashing_algorithm?: string;
    description: string;
    genesis_date?: string;
    image?: {
      large?: string;
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
      high_24h: {
        usd: number;
        brl: number;
      };
      low_24h: {
        usd: number;
        brl: number;
      };
      price_change_percentage_24h: number;
    };
    sparkline_in_7d?: {
      price?: number[];
    };
  };
};

export default function CryptoDetails({ details }: CryptoDetailsProps) {
  const {
    name,
    symbol,
    hashing_algorithm,
    description,
    genesis_date,
    image,
    market_data: {
      current_price,
      market_cap,
      total_volume,
      high_24h,
      low_24h,
      price_change_percentage_24h,
    },
    sparkline_in_7d,
  } = details;

  // Verifica se os dados do sparkline são válidos
  const sparklineData = sparkline_in_7d?.price ?? []; // Retorna um array vazio caso não exista
  const hasSparklineData = sparklineData.length > 0;

  return (
    <div className="crypto-details">
      {/* Cabeçalho da Criptomoeda */}
      <div className="crypto-header">
        {image?.large ? (
          <img src={image.large} alt={`${name} logo`} className="crypto-image" />
        ) : (
          <div className="placeholder-image">Sem Imagem</div>
        )}
        <h2 className="crypto-name">
          {name} ({symbol.toUpperCase()})
        </h2>
      </div>

      {/* Estatísticas Gerais */}
      <div className="crypto-stats">
        <p>
          <strong>Preço Atual:</strong> ${current_price.usd.toFixed(2)} | R$ {current_price.brl.toFixed(2)}
        </p>
        <p>
          <strong>Market Cap:</strong> ${market_cap.usd.toLocaleString()} | R$ {market_cap.brl.toLocaleString()}
        </p>
        <p>
          <strong>Volume (24h):</strong> ${total_volume.usd.toLocaleString()} | R$ {total_volume.brl.toLocaleString()}
        </p>
        <p>
          <strong>Alta (24h):</strong> ${high_24h.usd.toFixed(2)} | R$ {high_24h.brl.toFixed(2)}
        </p>
        <p>
          <strong>Baixa (24h):</strong> ${low_24h.usd.toFixed(2)} | R$ {low_24h.brl.toFixed(2)}
        </p>
        <p>
          <strong>Variação (24h):</strong> {price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      {/* Informações Adicionais */}
      <div className="crypto-additional">
        <p>
          <strong>Algoritmo de Hash:</strong> {hashing_algorithm || 'Desconhecido'}
        </p>
        <p>
          <strong>Data de Gênese:</strong> {genesis_date || 'Não disponível'}
        </p>
        <p>
          <strong>Descrição:</strong> {description}
        </p>
      </div>

      {/* Gráfico de Histórico */}
      <div className="crypto-chart">
        <h3>Histórico de Preços (7 Dias)</h3>
        {hasSparklineData ? (
          <Chart
            labels={Array.from(
              { length: sparklineData.length },
              (_, i) => `${i + 1}h`
            )}
            dataPoints={sparklineData}
            label={`Preço de ${name} (USD)`}
          />
        ) : (
          <p>Dados de histórico não disponíveis.</p>
        )}
      </div>
    </div>
  );
}
