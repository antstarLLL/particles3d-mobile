const CACHE_NAME = 'gesture-3d-cache-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './js/three.min.js',
  './js/camera_utils.js',
  './js/control_utils.js',
  './js/hands.js',
  './js/hands.binarypb',
  './js/hands_solution_packed_assets.data',
  './js/hands_solution_packed_assets_loader.js',
  './js/hands_solution_simd_wasm_bin.js',
  './js/hands_solution_simd_wasm_bin.wasm',
  './js/hands_solution_wasm_bin.js',
  './js/hands_solution_wasm_bin.wasm'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).catch(() => cached);
    })
  );
});

