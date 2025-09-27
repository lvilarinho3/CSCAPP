self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-wa-v1').then((cache) => cache.addAll([
      './',
      './index.html',
      './manifest.webmanifest',
      './icon-192.png',
      './icon-512.png'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => k !== 'pwa-wa-v1' && caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
