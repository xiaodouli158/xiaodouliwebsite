export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
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

    // Serve static assets from ASSETS binding
    if (request.method === 'GET') {
      const originalUrl = new URL(url.toString());
      // Rewrite root to pages/index.html
      if (url.pathname === '/' || url.pathname === '') {
        url.pathname = '/pages/index.html';
      }
      // Icon alias: /assets/icons/* -> /client/public/icons/*
      if (url.pathname.startsWith('/assets/icons/')) {
        url.pathname = url.pathname.replace('/assets/icons/', '/client/public/icons/');
      }
      const assetRequest = new Request(url.toString(), request);
      const cacheKey = assetRequest;
      const cached = await caches.default.match(cacheKey);
      if (cached) return cached;
      const res = await env.ASSETS.fetch(assetRequest);
      // If the rewritten path 404s, try the original path once
      if (res.status === 404 && (originalUrl.pathname === '/' || originalUrl.pathname === '')) {
        return res;
      }
      const cacheable = res.status === 200 && !res.headers.get('Cache-Control');
      const out = cacheable ? new Response(res.body, res) : res;
      if (cacheable) {
        const ct = out.headers.get('Content-Type') || '';
        const isHtml = ct.includes('text/html');
        out.headers.set('Cache-Control', isHtml ? 'public, max-age=60' : 'public, max-age=3600');
        ctx.waitUntil(caches.default.put(cacheKey, out.clone()));
      }
      return out;
    }

    return new Response('Method Not Allowed', { status: 405 });
  }
};


