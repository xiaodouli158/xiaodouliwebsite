(function () {
  const overlayId = 'video-modal-overlay';

  function extractVideoId(url, platform) {
    if (!url) return null;
    let p = platform;
    if (!p) {
      if (url.includes('douyin.com') || url.includes('dy.com')) p = 'douyin';
      else if (url.includes('bilibili.com')) p = 'bilibili';
      else if (url.includes('youtube.com') || url.includes('youtu.be')) p = 'youtube';
      else if (url.includes('kuaishou.com')) p = 'kuaishou';
    }
    if (p === 'douyin') {
      const patterns = [/\/(\d{19})\/?/, /\/(\d{18})\/?/, /\/(\d{17})\/?/, /video[\/=](\d+)/i, /v[\/=](\d+)/i];
      for (const pattern of patterns) {
        const m = url.match(pattern);
        if (m && m[1]) return m[1];
      }
      const filename = url.split('/').pop() || '';
      const fm = filename.match(/(\d{17,19})/);
      if (fm) return fm[1];
    }
    return null;
  }

  function buildPlayerUrl(videoUrl, platform) {
    if (!videoUrl) return null;
    let p = platform;
    if (!p) {
      if (videoUrl.includes('douyin.com') || videoUrl.includes('dy.com')) p = 'douyin';
      else if (videoUrl.includes('bilibili.com')) p = 'bilibili';
      else if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) p = 'youtube';
      else if (videoUrl.includes('kuaishou.com')) p = 'kuaishou';
    }
    const id = extractVideoId(videoUrl, p || 'douyin');
    if (!id) return null;
    if (p === 'douyin') return `https://open.douyin.com/player/video?vid=${id}&autoplay=0`;
    return null;
  }

  function close() {
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.remove();
  }

  function open({ videoUrl, platform, title }) {
    const playerUrl = buildPlayerUrl(videoUrl, platform);
    const overlay = document.createElement('div');
    overlay.id = overlayId;
    overlay.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4';

    const dialog = document.createElement('div');
    dialog.className = 'relative w-full max-w-6xl h-full max-h-[95vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col';

    const closeBtnWrap = document.createElement('div');
    closeBtnWrap.className = 'absolute top-4 right-4 z-10';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors shadow-lg';
    closeBtn.innerText = '✕';
    closeBtn.onclick = close;
    closeBtnWrap.appendChild(closeBtn);
    dialog.appendChild(closeBtnWrap);

    if (title) {
      const header = document.createElement('div');
      header.className = 'bg-gray-800 px-6 py-3 border-b border-gray-700';
      const h = document.createElement('h3');
      h.className = 'text-white font-semibold truncate';
      h.textContent = title;
      header.appendChild(h);
      dialog.appendChild(header);
    }

    const body = document.createElement('div');
    body.className = 'flex-1 min-h-0';

    if (playerUrl) {
      const iframe = document.createElement('iframe');
      iframe.src = playerUrl;
      iframe.className = 'w-full h-full border-0';
      iframe.allowFullscreen = true;
      iframe.title = title || '视频播放器';
      iframe.style.minHeight = '500px';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
      body.appendChild(iframe);
    } else {
      const err = document.createElement('div');
      err.className = 'w-full h-full flex flex-col items-center justify-center text-white p-6';
      err.innerHTML = '<div class="text-4xl mb-4">⚠️</div><h3 class="text-lg font-semibold mb-2">无法播放视频</h3><p class="text-gray-400 text-sm">无法从视频URL中提取播放信息，或暂不支持该平台的视频播放</p>';
      const detail = document.createElement('div');
      detail.className = 'mt-4 text-xs text-gray-500';
      detail.textContent = `VideoUrl: ${videoUrl || ''}`;
      err.appendChild(detail);
      body.appendChild(err);
    }

    dialog.appendChild(body);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
  }

  window.VideoModal = { open, close };
})();


