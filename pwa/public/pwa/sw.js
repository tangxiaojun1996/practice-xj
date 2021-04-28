importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');
const cacheStorageKey = 'minimal-pwa-1';
const cacheList = [
  '/',
  'index.html',
  'main.css',
  'pic.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheStorageKey)
      .then((cache) => cache.addAll(cacheList))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response != null) {
        return response;
      }
      return fetch(e.request.url);
    }),
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    // 获取所有cache名称
    caches.keys().then((cacheNames) => Promise.all(
      // 获取所有不同于当前版本名称cache下的内容
      cacheNames.filter((cacheNames) => cacheNames !== cacheStorageKey).map((cacheNames) => caches.delete(cacheNames)),
    )).then(() => self.clients.claim()),
  );
});
