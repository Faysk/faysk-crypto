export async function fetchCryptoPrices() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }
    return response.json();
  }
  