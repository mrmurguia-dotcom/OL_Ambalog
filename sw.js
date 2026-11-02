const CACHE_NAME = 'ambalog-v2';
const urlsToCache = [
  '/OL_Ambalog/',
  '/OL_Ambalog/index.html',
  '/OL_Ambalog/logom2.jpg',
  '/OL_Ambalog/cargafc/index.html',
  '/OL_Ambalog/cargapedidosgp/index.html',
  '/OL_Ambalog/cargarepartogp/index.html',
  '/OL_Ambalog/carganovedadesgp/index.html',
  '/OL_Ambalog/consultadespachogp/index.html'
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar las peticiones de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
