/*
  Global data loader with client-side caching for the website
  - Fetches JSON from the server once and stores it in localStorage
  - Exposes window.AppData with getData() and prefetch() helpers
*/
(function () {
  // Prefer Worker proxy if deployed, fallback to origin JSON
  const WORKER_PROXY = '/api/appdates.json';
  const ORIGIN_JSON = 'https://xiaodouli.openclouds.dpdns.org/updates/appdates.json';
  const DATA_URL = WORKER_PROXY;
  const STORAGE_KEY = 'xdl_app_data_v1';
  const STORAGE_AT_KEY = 'xdl_app_data_fetched_at_v1';
  const DEFAULT_TTL_MS = 60 * 60 * 1000; // 1 hour TTL

  function now() {
    return Date.now();
  }

  function readCache() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const at = parseInt(localStorage.getItem(STORAGE_AT_KEY) || '0', 10);
      if (!raw) return { data: null, fetchedAt: 0 };
      return { data: JSON.parse(raw), fetchedAt: at || 0 };
    } catch (e) {
      console.warn('AppData: failed to read cache', e);
      return { data: null, fetchedAt: 0 };
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(STORAGE_AT_KEY, String(now()));
    } catch (e) {
      console.warn('AppData: failed to write cache', e);
    }
  }

  async function fetchFromNetwork(signal) {
    // Try Worker proxy first, then fallback to origin
    let lastErr;
    for (const url of [WORKER_PROXY, ORIGIN_JSON]) {
      try {
        const res = await fetch(url, { signal, cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + url);
        return await res.json();
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('Failed to fetch app data');
  }

  async function prefetch(options) {
    const { ttlMs = DEFAULT_TTL_MS, force = false } = options || {};
    const { data: cached, fetchedAt } = readCache();
    const isFresh = cached && (now() - fetchedAt < ttlMs);
    if (isFresh && !force) return cached;

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      const data = await fetchFromNetwork(ctrl.signal);
      clearTimeout(timer);
      writeCache(data);
      return data;
    } catch (e) {
      console.warn('AppData: network fetch failed, falling back to cache', e);
      if (cached) return cached;
      throw e;
    }
  }

  async function getData(options) {
    // getData always tries cache-first, network-if-stale
    return prefetch(options);
  }

  function selectSection(data, sectionKeys) {
    // Try direct keys first
    for (const key of sectionKeys) {
      if (data && data[key] && Array.isArray(data[key])) return data[key];
    }
    // Try flatten and filter by category/type/module
    const allItems = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
    if (!allItems.length && data) {
      // explore any array-valued properties
      for (const k of Object.keys(data)) {
        if (Array.isArray(data[k])) allItems.push(...data[k]);
      }
    }
    const lowerKeys = sectionKeys.map(k => k.toLowerCase());
    return allItems.filter((item) => {
      const category = String(item.category || item.module || item.type || '').toLowerCase();
      return lowerKeys.some((lk) => category.includes(lk));
    });
  }

  function normalizeItem(item) {
    // Normalize common fields for UI cards
    const cover = item.coverurl || item.coverUrl || item.thumbnail || item.thumb || item.image || '';
    const title = item.title || item.name || item.label || '';
    const description = item.description || item.desc || '';
    const url = item.url || item.videoUrl || item.clickUrl || item.downloadUrl || '';
    const platform = item.platform || '';
    const playType = item.playType || '';
    return {
      ...item,
      coverurl: cover,
      title,
      description,
      url,
      platform,
      playType
    };
  }

  window.AppData = {
    getData,
    prefetch,
    readCache,
    selectSection,
    normalizeItem,
    constants: { DATA_URL, STORAGE_KEY, DEFAULT_TTL_MS }
  };
})();


