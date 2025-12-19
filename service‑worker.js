const CACHE_NAME = 'Verkon.ru';
const urlsToCache = [
  '/',
  '/style.css',
  '/items.json',
  '/manifest.json',
  '/product.html',
  '/product.js',
  // Добавьте другие важные ресурсы
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
