export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Route / to /pages/index.html
    if (url.pathname === '/' || url.pathname === '') {
      url.pathname = '/pages/index.html';
      return fetch(new Request(url.toString(), request));
    }
    // Alias icons path to existing client/public/icons to avoid duplication
    if (url.pathname.startsWith('/assets/icons/')) {
      url.pathname = url.pathname.replace('/assets/icons/', '/client/public/icons/');
      return fetch(new Request(url.toString(), request));
    }
    // Cache static assets aggressively
    if (request.method === 'GET' && !url.pathname.startsWith('/api/')) {
      return await caches.default.match(request) || await (async () => {
        const res = await fetch(request);
        const cacheRes = new Response(res.body, res);
        cacheRes.headers.set('Cache-Control', 'public, max-age=3600');
        ctx.waitUntil(caches.default.put(request, cacheRes.clone()));
        return cacheRes;
      })();
    }

    // Proxy and cache JSON API
    if (url.pathname === '/api/appdates.json') {
      const origin = 'https://xiaodouli.openclouds.dpdns.org/updates/appdates.json';
      const cacheKey = new Request(url.toString(), request);
      const cached = await caches.default.match(cacheKey);
      if (cached) {
        // Revalidate in the background
        ctx.waitUntil(fetch(origin).then(r => r.ok && caches.default.put(cacheKey, new Response(r.body, r))));
        const resp = new Response(cached.body, cached);
        resp.headers.set('Content-Type', 'application/json; charset=utf-8');
        resp.headers.set('Access-Control-Allow-Origin', '*');
        return resp;
      }
      const res = await fetch(origin, { cf: { cacheTtl: 300, cacheEverything: true } });
      if (!res.ok) {
        // stale-if-error: try cache again before failing
        if (cached) {
          const resp = new Response(cached.body, cached);
          resp.headers.set('Content-Type', 'application/json; charset=utf-8');
          resp.headers.set('Access-Control-Allow-Origin', '*');
          return resp;
        }
        return new Response('Upstream error', { status: 502 });
      }
      const out = new Response(res.body, res);
      out.headers.set('Cache-Control', 'public, max-age=300');
      out.headers.set('Content-Type', 'application/json; charset=utf-8');
      out.headers.set('Access-Control-Allow-Origin', '*');
      ctx.waitUntil(caches.default.put(cacheKey, out.clone()));
      return out;
    }

    return fetch(request);
  }
};


