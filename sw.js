const CACHE_NAME = 'goldenvault-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/main.js',
  'images/backgrounds/treasure-bg.jpg',
  'images/casinos/logo_9.jpeg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
