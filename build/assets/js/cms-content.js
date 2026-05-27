(function () {
  function toEmbedUrl(url) {
    if (!url) return '';
    // YouTube: watch?v= or youtu.be/
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
    if (m) return 'https://www.youtube.com/embed/' + m[1];
    // Vimeo
    m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return 'https://player.vimeo.com/video/' + m[1];
    // Already an embed URL
    return url;
  }

  fetch('/api/content')
    .then(function (r) { return r.ok ? r.json() : fetch('/assets/data/content.json').then(function (r2) { return r2.json(); }); })
    .then(function (data) {
      // data-cms-text
      document.querySelectorAll('[data-cms-text]').forEach(function (el) {
        var key = el.getAttribute('data-cms-text').split('.');
        var val = data[key[0]] && data[key[0]][key[1]];
        if (val) el.textContent = val;
      });

      // data-cms-src (images)
      document.querySelectorAll('[data-cms-src]').forEach(function (el) {
        var key = el.getAttribute('data-cms-src').split('.');
        var val = data[key[0]] && data[key[0]][key[1]];
        if (val) el.src = val;
      });

      // data-cms-bg (background-image)
      document.querySelectorAll('[data-cms-bg]').forEach(function (el) {
        var key = el.getAttribute('data-cms-bg').split('.');
        var val = data[key[0]] && data[key[0]][key[1]];
        if (val) el.style.backgroundImage = 'url(' + val + ')';
      });

      // data-cms-href (anchor hrefs)
      document.querySelectorAll('[data-cms-href]').forEach(function (el) {
        var key = el.getAttribute('data-cms-href').split('.');
        var val = data[key[0]] && data[key[0]][key[1]];
        if (val) el.href = val;
      });

      // data-cms-video (video placeholders → iframes)
      document.querySelectorAll('[data-cms-video]').forEach(function (el) {
        var key = el.getAttribute('data-cms-video').split('.');
        var url = data[key[0]] && data[key[0]][key[1]];
        var embedUrl = toEmbedUrl(url);
        if (!embedUrl) return;
        var iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'width:100%;height:100%;border-radius:8px;';
        el.innerHTML = '';
        el.appendChild(iframe);
      });
    })
    .catch(function () {}); // silently fail if server offline
}());
