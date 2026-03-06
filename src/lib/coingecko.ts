import { CoinGeckoPrice, CoinGeckoMarketChart } from "@/types/cycle";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const BASE_URL = "https://api.coingecko.com/api/v3";

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

function getCache(key: string): unknown | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache(key: string, data: unknown): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable
  }
}

async function fetchWithCache<T>(url: string): Promise<T> {
  const cacheKey = `cgk_${url}`;
  const cached = getCache(cacheKey);
  if (cached) return cached as T;

  const res = await fetch(url);
  if (!res.ok) {
    // Try to return stale cache on error
    if (typeof window !== "undefined") {
      const stale = localStorage.getItem(cacheKey);
      if (stale) {
        try {
          return (JSON.parse(stale) as CacheEntry).data as T;
        } catch {
          // fall through
        }
      }
    }
    throw new Error(`CoinGecko API error: ${res.status}`);
  }

  const data = (await res.json()) as T;
  setCache(cacheKey, data);
  return data;
}

export async function fetchBtcPrice(): Promise<number> {
  const data = await fetchWithCache<CoinGeckoPrice>(
    `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd`
  );
  return data.bitcoin.usd;
}

export async function fetchBtcHistory(
  days: number = 365
): Promise<[number, number][]> {
  const data = await fetchWithCache<CoinGeckoMarketChart>(
    `${BASE_URL}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
  );
  return data.prices;
}
