const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-PgErAifN55JDmBEQkNr81TmF'; // Chave de API gratuita
const REQUEST_DELAY = 1200; // Delay de 1.2 segundos entre requisições
const SUPPORTED_CURRENCIES = ['brl', 'usd', 'gbp', 'eur']; // Moedas suportadas

/**
 * Função auxiliar para realizar requisições HTTP com suporte à chave de API.
 * @param {string} endpoint Caminho do endpoint (relativo ao BASE_URL).
 * @param {string} [errorMessage] Mensagem de erro personalizada.
 * @returns {Promise<any>} Dados da resposta JSON.
 */
async function fetchData(endpoint: string, errorMessage = 'Erro ao buscar os dados'): Promise<any> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    console.log(`Requisição para: ${url}`);
    const response = await fetch(url, {
      headers: {
        'X-CG-Pro-Api-Key': API_KEY,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Erro na API: ${response.status} - ${response.statusText}`);
      throw new Error(`${errorMessage}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro em fetchData (${url}):`, error);
    throw new Error(errorMessage);
  }
}

/**
 * Função para implementar atraso entre requisições.
 * @param {number} ms Tempo de espera em milissegundos.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gera timestamps Unix para períodos específicos.
 * @returns {Record<string, number>} Objeto com timestamps Unix.
 */
function getTimeRanges(): Record<string, number> {
  const now = Math.floor(Date.now() / 1000);
  return {
    now,
    oneHourAgo: now - 3600,
    oneDayAgo: now - 86400,
    sevenDaysAgo: now - 604800,
    oneMonthAgo: now - 2592000,
    threeMonthsAgo: now - 7776000,
    sixMonthsAgo: now - 15552000,
    oneYearAgo: now - 31536000,
  };
}

/**
 * Valida se a moeda fornecida está na lista de suportadas.
 * @param {string} currency Moeda a ser validada.
 */
function validateCurrency(currency: string): void {
  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    throw new Error(`Moeda não suportada. Moedas válidas: ${SUPPORTED_CURRENCIES.join(', ')}`);
  }
}

/**
 * Busca as principais criptomoedas com dados completos.
 * @param {number} [perPage=10] Número de criptomoedas a buscar.
 * @param {string} [currency='brl'] Moeda para conversão.
 * @returns {Promise<any[]>} Lista de criptomoedas com dados completos.
 */
export async function fetchTopCryptos(perPage = 10, currency = 'brl'): Promise<any[]> {
  validateCurrency(currency);
  const endpoint = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true`;
  return await fetchData(endpoint, 'Não foi possível buscar as principais criptomoedas.');
}

/**
 * Busca informações detalhadas de uma criptomoeda específica.
 * @param {string} id ID da criptomoeda.
 * @returns {Promise<any>} Dados completos da criptomoeda.
 */
export async function fetchCryptoDetails(id: string): Promise<any> {
  const endpoint = `/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;
  return await fetchData(endpoint, 'Não foi possível buscar os detalhes da criptomoeda.');
}

/**
 * Busca os dados históricos de uma criptomoeda em um intervalo de tempo.
 * @param {string} id ID da criptomoeda.
 * @param {string} currency Moeda para conversão.
 * @param {number} from Timestamp Unix inicial do intervalo.
 * @param {number} to Timestamp Unix final do intervalo.
 * @returns {Promise<any>} Dados históricos da criptomoeda.
 */
export async function fetchCryptoHistory(id: string, currency: string, from: number, to: number): Promise<any> {
  validateCurrency(currency);
  const endpoint = `/coins/${id}/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`;
  await delay(REQUEST_DELAY);
  return await fetchData(endpoint, 'Não foi possível buscar os dados históricos da criptomoeda.');
}

/**
 * Busca dados de preços e mudanças em períodos específicos.
 * @param {string} id ID da criptomoeda.
 * @returns {Promise<any>} Dados de variações de preços e mudanças.
 */
export async function fetchPriceChanges(id: string): Promise<any> {
  const { now, oneDayAgo } = getTimeRanges();
  const history = await fetchCryptoHistory(id, 'usd', oneDayAgo, now);
  return {
    priceChangePercentage24h: history?.prices[history.prices.length - 1] - history?.prices[0],
  };
}

/**
 * Lista todas as moedas suportadas.
 * @returns {Promise<any[]>} Lista de moedas.
 */
export async function fetchSupportedCurrencies(): Promise<any[]> {
  const endpoint = `/simple/supported_vs_currencies`;
  return await fetchData(endpoint, 'Não foi possível buscar as moedas suportadas.');
}

/**
 * Busca categorias disponíveis.
 * @returns {Promise<any[]>} Categorias de criptomoedas.
 */
export async function fetchCryptoCategories(): Promise<any[]> {
  const endpoint = `/coins/categories`;
  return await fetchData(endpoint, 'Não foi possível buscar as categorias.');
}
