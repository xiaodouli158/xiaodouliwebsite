(function () {
  function createWorkCard(item, options) {
    const normalized = window.AppData.normalizeItem(item);
    const size = (options && options.size) || 'medium';
    const variant = (options && options.variant) || 'default';
    const container = document.createElement('div');
    container.className = [
      size === 'small' ? 'h-48' : size === 'large' ? 'h-80' : 'h-64',
      variant === 'compact' ? 'bg-slate-700/50 border-slate-600/40 hover:bg-slate-700' : (variant === 'featured' ? 'bg-gradient-to-br from-blue-800 to-purple-900 border-blue-700/50 hover:border-blue-500/70' : 'bg-gradient-to-br from-gray-800 to-gray-900 border-indigo-900/30 hover:border-indigo-700/50'),
      'rounded-lg border shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02]'
    ].join(' ');

    const cover = document.createElement('div');
    cover.className = (size === 'small' ? 'h-40' : size === 'large' ? 'h-68' : 'h-52') + ' bg-gray-800 overflow-hidden relative';
    if (normalized.coverurl) {
      const img = document.createElement('img');
      img.src = normalized.coverurl;
      img.alt = normalized.title || '';
      img.className = 'w-full h-full object-cover hover:scale-105 transition-transform duration-300';
      img.onerror = function () {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaXoOWbvueJhzwvdGV4dD48L3N2Zz4=';
      };
      cover.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'w-full h-full flex items-center justify-center text-gray-400 text-sm';
      placeholder.textContent = normalized.title || '暂无封面';
      cover.appendChild(placeholder);
    }

    const titleWrap = document.createElement('div');
    titleWrap.className = (size === 'small' ? 'p-1' : 'p-2') + ' flex items-center justify-center';
    const h3 = document.createElement('h3');
    h3.className = (size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base') + ' font-semibold text-white text-center leading-tight';
    h3.style.display = '-webkit-box';
    h3.style.webkitLineClamp = '2';
    h3.style.webkitBoxOrient = 'vertical';
    h3.style.overflow = 'hidden';
    h3.textContent = normalized.title || '';
    titleWrap.appendChild(h3);

    container.appendChild(cover);
    container.appendChild(titleWrap);

    container.addEventListener('click', function () {
      if (normalized.url) {
        window.VideoModal && window.VideoModal.open({
          videoUrl: normalized.url,
          platform: normalized.platform,
          title: normalized.title
        });
      }
    });

    return container;
  }

  function renderCardGrid(container, items, options) {
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
    (items || []).forEach((item) => {
      grid.appendChild(createWorkCard(item, options));
    });
    container.appendChild(grid);
  }

  window.UI = {
    createWorkCard,
    renderCardGrid
  };
})();


