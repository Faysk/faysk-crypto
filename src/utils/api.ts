export async function fetchCryptoPrices() {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd,brl'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }
    return response.json();
  }
  