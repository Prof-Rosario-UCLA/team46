// public/service-worker.js

const CACHE_NAME = 'pantrypal-shell-v1';
const STATIC_ASSETS = ['/', '/index.html', '/vite.svg', '/manifest.json'];

// IndexedDB helpers
function openDB() {
  return new Promise((res, rej) => {
    const rq = indexedDB.open('pantrypal-db', 1);
    rq.onupgradeneeded = () => {
      rq.result.createObjectStore('keyval');
    };
    rq.onsuccess = () => res(rq.result);
    rq.onerror = () => rej(rq.error);
  });
}
function idbPut(key, val) {
  return openDB().then((db) => {
    const tx = db.transaction('keyval', 'readwrite');
    tx.objectStore('keyval').put(val, key);
    return tx.complete;
  });
}
function idbGet(key) {
  return openDB().then(
    (db) =>
      new Promise((res, rej) => {
        const tx = db.transaction('keyval', 'readonly');
        const rq = tx.objectStore('keyval').get(key);
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => rej(rq.error);
      })
  );
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // Network-first for /api/pantry
  if (url.pathname === '/api/pantry') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          res.clone().json().then((data) => idbPut('pantry', data));
          return res;
        })
        .catch(() =>
          idbGet('pantry')
            .then((data) =>
              new Response(JSON.stringify(data || []), {
                headers: { 'Content-Type': 'application/json' },
              })
            )
            .catch(() =>
              new Response(JSON.stringify([]), {
                headers: { 'Content-Type': 'application/json' },
              })
            )
        )
    );
    return;
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
