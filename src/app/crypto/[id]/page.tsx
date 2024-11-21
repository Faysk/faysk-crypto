// src/app/crypto/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCryptoDetails } from '@utils/api';
import CryptoDetails from '@components/CryptoDetails';

type CryptoDetailsData = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  description: string; // Torne esta propriedade obrigatória
  market_data: any;
  sparkline_in_7d: { price: number[] };
};

export default function CryptoDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [details, setDetails] = useState<CryptoDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID inválido fornecido na URL.');
      setLoading(false);
      return;
    }

    const getDetails = async () => {
      try {
        const data = await fetchCryptoDetails(id);
        if (data) {
          // Garante que `description` tenha um valor padrão
          setDetails({
            ...data,
            description: data.description || 'Descrição não disponível.',
          });
          setError(null);
        } else {
          setError('Nenhum dado encontrado para essa criptomoeda.');
        }
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os detalhes da criptomoeda. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  if (loading) {
    return <p className="loading-text" aria-live="polite">Carregando informações da criptomoeda...</p>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button className="retry-button" onClick={() => location.reload()}>Tentar Novamente</button>
      </div>
    );
  }

  if (!details) {
    return <p className="no-data-text">Dados não disponíveis para exibição.</p>;
  }

  return (
    <div className="crypto-details-page">
      <CryptoDetails details={details} />
    </div>
  );
}
