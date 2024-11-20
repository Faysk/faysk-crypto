const BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Função auxiliar para realizar requisições HTTP.
 * @param {string} endpoint Caminho do endpoint (relativo ao BASE_URL).
 * @param {string} [errorMessage] Mensagem de erro personalizada.
 * @returns {Promise<any>} Dados da resposta JSON.
 */
async function fetchData(endpoint: string, errorMessage = 'Erro ao buscar os dados') {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro em fetchData (${endpoint}):`, error);
    throw new Error(errorMessage);
  }
}

/**
 * Busca as 10 principais criptomoedas (ou conforme configurado) com dados básicos e sparkline.
 * @param {number} [perPage=10] Número de criptomoedas a buscar.
 * @param {string} [currency='brl'] Moeda para conversão.
 * @returns {Promise<any[]>} Lista de criptomoedas.
 */
export async function fetchTopCryptos(perPage = 10, currency = 'brl'): Promise<any[]> {
  const endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true`;
  return await fetchData(endpoint, 'Não foi possível buscar as principais criptomoedas. Tente novamente mais tarde.');
}

/**
 * Busca informações detalhadas de uma criptomoeda específica.
 * @param {string} id ID da criptomoeda (exemplo: "bitcoin").
 * @param {string} [currency='brl'] Moeda para conversão.
 * @returns {Promise<any>} Detalhes da criptomoeda.
 */
export async function fetchCryptoDetails(id: string, currency = 'brl'): Promise<any> {
  const endpoint = `/coins/${id}?localization=false&tickers=false&market_data=true&sparkline=true&vs_currency=${currency}`;
  return await fetchData(endpoint, 'Não foi possível buscar os detalhes da criptomoeda. Tente novamente mais tarde.');
}
