const BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Função auxiliar para realizar requisições HTTP.
 * @param {string} endpoint Caminho do endpoint (relativo ao BASE_URL).
 * @param {string} [errorMessage] Mensagem de erro personalizada.
 * @returns {Promise<any>} Dados da resposta JSON.
 */
async function fetchData(endpoint: string, errorMessage = 'Erro ao buscar os dados'): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error(`${errorMessage}: Resposta inválida da API.`);
    }

    return data;
  } catch (error) {
    console.error(`Erro em fetchData (${endpoint}):`, error);
    throw new Error(errorMessage);
  }
}

/**
 * Normaliza os dados de criptomoedas para evitar erros.
 * @param {any} crypto Dados crus da API.
 * @returns {object} Objeto formatado.
 */
function normalizeCryptoData(crypto: any): object {
  return {
    id: crypto.id || 'N/A',
    name: crypto.name || 'Desconhecido',
    symbol: crypto.symbol || 'N/A',
    image: crypto.image || '',
    current_price: crypto.current_price || 0,
    market_cap: crypto.market_cap || 0,
    market_cap_rank: crypto.market_cap_rank || 'N/A',
    fully_diluted_valuation: crypto.fully_diluted_valuation || 'N/A',
    total_volume: crypto.total_volume || 0,
    high_24h: crypto.high_24h || 0,
    low_24h: crypto.low_24h || 0,
    price_change_24h: crypto.price_change_24h || 0,
    price_change_percentage_24h: crypto.price_change_percentage_24h || 0,
    market_cap_change_24h: crypto.market_cap_change_24h || 0,
    market_cap_change_percentage_24h: crypto.market_cap_change_percentage_24h || 0,
    circulating_supply: crypto.circulating_supply || 0,
    total_supply: crypto.total_supply || 'N/A',
    max_supply: crypto.max_supply || 'N/A',
    ath: crypto.ath || 0,
    ath_change_percentage: crypto.ath_change_percentage || 0,
    ath_date: crypto.ath_date || 'N/A',
    atl: crypto.atl || 0,
    atl_change_percentage: crypto.atl_change_percentage || 0,
    atl_date: crypto.atl_date || 'N/A',
    sparkline_in_7d: crypto.sparkline_in_7d?.price || [],
    last_updated: crypto.last_updated || 'N/A',
  };
}

/**
 * Busca as principais criptomoedas com dados detalhados.
 * @param {number} [perPage=10] Número de criptomoedas a buscar.
 * @param {string} [currency='brl'] Moeda para conversão.
 * @returns {Promise<any[]>} Lista de criptomoedas normalizadas.
 */
export async function fetchTopCryptos(perPage = 10, currency = 'brl'): Promise<any[]> {
  const endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true`;
  const cryptos = await fetchData(endpoint, 'Não foi possível buscar as principais criptomoedas.');

  return cryptos.map((crypto: any) => normalizeCryptoData(crypto));
}

/**
 * Busca informações detalhadas de uma criptomoeda específica.
 * @param {string} id ID da criptomoeda.
 * @param {string} [currency='brl'] Moeda para conversão.
 * @returns {Promise<any>} Detalhes completos da criptomoeda.
 */
export async function fetchCryptoDetails(id: string, currency = 'brl'): Promise<any> {
  const endpoint = `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true&vs_currency=${currency}`;
  const details = await fetchData(endpoint, 'Não foi possível buscar os detalhes da criptomoeda.');

  return {
    id: details.id || 'N/A',
    name: details.name || 'Desconhecido',
    symbol: details.symbol || 'N/A',
    hashing_algorithm: details.hashing_algorithm || 'N/A',
    description: details.description?.en || 'Sem descrição disponível.',
    genesis_date: details.genesis_date || 'N/A',
    market_data: details.market_data || {},
    community_data: details.community_data || {},
    developer_data: details.developer_data || {},
    public_interest_score: details.public_interest_score || 0,
    sparkline_in_7d: details.market_data?.sparkline_in_7d?.price || [],
    last_updated: details.last_updated || 'N/A',
  };
}


/**
 * Busca dados históricos de uma criptomoeda.
 * @param {string} id ID da criptomoeda.
 * @param {string} currency Moeda para conversão.
 * @param {number} from Timestamp Unix inicial.
 * @param {number} to Timestamp Unix final.
 * @returns {Promise<any>} Dados históricos normalizados.
 */
export async function fetchCryptoHistory(id: string, currency: string, from: number, to: number): Promise<any> {
  const endpoint = `/coins/${id}/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`;
  const history = await fetchData(endpoint, 'Não foi possível buscar os dados históricos da criptomoeda.');

  return history;
}

/**
 * Busca categorias de moedas disponíveis.
 * @returns {Promise<any[]>} Lista de categorias de criptomoedas.
 */
export async function fetchCoinCategories(): Promise<any[]> {
  const endpoint = '/coins/categories';
  const categories = await fetchData(endpoint, 'Não foi possível buscar as categorias de criptomoedas.');

  return categories;
}

/**
 * Busca moedas suportadas pela API para conversão.
 * @returns {Promise<string[]>} Lista de moedas suportadas.
 */
export async function fetchSupportedCurrencies(): Promise<string[]> {
  const endpoint = '/simple/supported_vs_currencies';
  const currencies = await fetchData(endpoint, 'Não foi possível buscar as moedas suportadas.');

  return currencies;
}
