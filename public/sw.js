const CACHE_NAME = 'casey-friedrich-v3';
const STATIC_CACHE_NAME = 'casey-friedrich-static-v3';
const IMAGE_CACHE_NAME = 'casey-friedrich-images-v3';
const JS_CACHE_NAME = 'casey-friedrich-js-v3';
const CSS_CACHE_NAME = 'casey-friedrich-css-v3';
const FONT_CACHE_NAME = 'casey-friedrich-fonts-v3';

// Performance: Cache static assets for GitHub Pages
// GitHub Pages doesn't support custom headers, so we rely on service worker caching
const staticAssets = [
  '/',
  '/favicon.ico',
];

// Performance: Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(staticAssets);
      }),
    ]).then(() => {
      return self.skipWaiting(); // Activate immediately
    })
  );
});

// Performance: Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => 
            name !== CACHE_NAME && 
            name !== STATIC_CACHE_NAME && 
            name !== IMAGE_CACHE_NAME &&
            name !== JS_CACHE_NAME &&
            name !== CSS_CACHE_NAME &&
            name !== FONT_CACHE_NAME
          )
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim(); // Take control of all pages
    })
  );
});

// Performance: Fetch event - cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Performance: Cache images with cache-first strategy (1 year)
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            if (response.ok) {
              // Clone response before caching
              const responseToCache = response.clone();
              cache.put(request, responseToCache);
            }
            return response;
          });
        });
      })
    );
    return;
  }

  // Performance: Cache fonts with cache-first (woff2, woff, ttf)
  if (url.pathname.match(/\.(woff2?|ttf|eot)$/) || url.pathname.includes('/_next/static/media/')) {
    event.respondWith(
      caches.open(FONT_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          return fetch(request).then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Performance: Cache JavaScript files with long cache (1 year)
  if (url.pathname.match(/\.js$/) || url.pathname.includes('/chunks/') || url.pathname.includes('/_next/static/')) {
    event.respondWith(
      caches.open(JS_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  // Performance: Cache CSS files with long cache (1 year)
  if (url.pathname.match(/\.css$/) || url.pathname.includes('/_next/static/css/')) {
    event.respondWith(
      caches.open(CSS_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  // Performance: Network-first strategy for HTML/API, fallback to cache
  if (request.destination === 'document' || url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Performance: Cache-first strategy for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((response) => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      });
    })
  );
}); 