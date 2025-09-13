export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Helper to create a JSON response with CORS and cache headers
    const jsonResponse = (data, { maxAge = 300, status = 200 } = {}) => {
      const body = typeof data === 'string' ? data : JSON.stringify(data);
      const resp = new Response(body, { status });
      resp.headers.set('Content-Type', 'application/json; charset=utf-8');
      resp.headers.set('Access-Control-Allow-Origin', '*');
      if (maxAge > 0) resp.headers.set('Cache-Control', `public, max-age=${maxAge}`);
      return resp;
    };

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

    // Xiaodouli latest windows JSON proxy (dynamic, cached)
    if (url.pathname === '/api/xiaodouli/latest-windows.json') {
      const origin = 'https://xiaodouli.openclouds.dpdns.org/updates/latest-windows.json';
      const cacheKey = new Request(url.toString(), request);
      const cached = await caches.default.match(cacheKey);

      try {
        const res = await fetch(origin, { cf: { cacheTtl: 300, cacheEverything: true } });
        if (!res.ok) throw new Error(`upstream ${res.status}`);
        const data = await res.json();
        const out = jsonResponse(data, { maxAge: 300 });
        ctx.waitUntil(caches.default.put(cacheKey, out.clone()));
        return out;
      } catch (e) {
        if (cached) return cached;
        return jsonResponse({ error: 'failed_to_fetch_xiaodouli' }, { status: 502, maxAge: 0 });
      }
    }

    // OBS latest links extractor from TUNA mirror index
    if (url.pathname === '/api/obs/latest') {
      const originBase = 'https://mirrors.tuna.tsinghua.edu.cn/github-release/obsproject/obs-studio/LatestRelease/';
      const cacheKey = new Request(url.toString(), request);
      const cached = await caches.default.match(cacheKey);

      try {
        const res = await fetch(originBase, { cf: { cacheTtl: 300, cacheEverything: true } });
        if (!res.ok) throw new Error(`upstream ${res.status}`);
        const html = await res.text();

        // Extract file hrefs
        const hrefs = Array.from(html.matchAll(/href=\"([^\"]+)\"/g)).map(m => m[1]);
        // Normalize to absolute URLs
        const fileUrls = hrefs
          .filter(h => /OBS-Studio-\d+\.\d+\.\d+/.test(h))
          .map(h => (h.startsWith('http') ? h : originBase + h));

        // Extract version once from any OBS file on this page (LatestRelease contains only the latest)
        const firstName = decodeURIComponent((fileUrls[0] || '').split('/').pop() || '');
        const versionMatch = firstName.match(/OBS-Studio-(\d+\.\d+\.\d+)/);
        const overall = versionMatch ? versionMatch[1] : '';

        // Pick the first match per platform
        const pickFirst = (predicate) => {
          const url = fileUrls.find(predicate);
          if (!url) return null;
          const name = decodeURIComponent(url.split('/').pop() || '');
          return { url, fileName: name, version: overall };
        };

        const windows = pickFirst(u => /Windows-(x64-Installer\.exe|x64\.zip|arm64\.zip|arm64-PDBs\.zip|x64-PDBs\.zip)/.test(u));
        const macApple = pickFirst(u => /macOS-Apple\.dmg/.test(u));
        const macIntel = pickFirst(u => /macOS-Intel\.dmg/.test(u));
        // Prefer Ubuntu 24.04 x86_64 .deb, else any .deb
        let ubuntu = pickFirst(u => /Ubuntu-24\.04-x86_?64\.deb/.test(u));
        if (!ubuntu) ubuntu = pickFirst(u => /\.(deb)$/.test(u) && /Ubuntu|noble|plucky|jammy|focal/.test(u));

        const payload = {
          version: overall,
          files: {
            windows: windows || null,
            macosApple: macApple || null,
            macosIntel: macIntel || null,
            ubuntu: ubuntu || null
          }
        };

        const out = jsonResponse(payload, { maxAge: 300 });
        ctx.waitUntil(caches.default.put(cacheKey, out.clone()));
        return out;
      } catch (e) {
        if (cached) return cached;
        return jsonResponse({ error: 'failed_to_fetch_obs' }, { status: 502, maxAge: 0 });
      }
    }

    // Serve assets from ASSETS binding
    if (request.method === 'GET') {
      const originalUrl = new URL(url.toString());
      
      // For SPA routing - serve index.html for non-asset routes
      const isAssetRequest = url.pathname.includes('.') || 
                            url.pathname.startsWith('/icons/') || 
                            url.pathname.startsWith('/assets/');
      
      if (!isAssetRequest && url.pathname !== '/') {
        // This is likely a SPA route, serve index.html
        url.pathname = '/index.html';
      }
      
      const assetRequest = new Request(url.toString(), request);
      const cacheKey = assetRequest;
      const cached = await caches.default.match(cacheKey);
      
      if (cached) return cached;
      
      const res = await env.ASSETS.fetch(assetRequest);
      
      // If 404 and it's not an asset, try index.html for SPA routing
      if (res.status === 404 && !isAssetRequest) {
        const indexRequest = new Request(new URL('/index.html', request.url).toString(), request);
        const indexRes = await env.ASSETS.fetch(indexRequest);
        if (indexRes.ok) {
          const out = new Response(indexRes.body, indexRes);
          out.headers.set('Content-Type', 'text/html; charset=utf-8');
          out.headers.set('Cache-Control', 'public, max-age=60');
          return out;
        }
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
