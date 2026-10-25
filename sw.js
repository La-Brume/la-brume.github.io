// La Brume Enchantée の service worker
// アプリとしてインストールできるようにするためのもの。何も保存しない。
// 本体（ページ）は、開くたびに必ず最新を取りに行く（置き直したらすぐ変わるように）。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  if (r.mode === 'navigate'){
    e.respondWith(fetch(r.url, { cache: 'no-store', credentials: 'same-origin' }).catch(() => fetch(r)));
    return;
  }
  e.respondWith(fetch(r));
});
