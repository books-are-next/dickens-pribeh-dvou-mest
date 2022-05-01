/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-668cf2d';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./pribeh_dvou_mest_002.html","./pribeh_dvou_mest_005.html","./pribeh_dvou_mest_006.html","./pribeh_dvou_mest_007.html","./pribeh_dvou_mest_008.html","./pribeh_dvou_mest_009.html","./pribeh_dvou_mest_010.html","./pribeh_dvou_mest_011.html","./pribeh_dvou_mest_012.html","./pribeh_dvou_mest_013.html","./pribeh_dvou_mest_014.html","./pribeh_dvou_mest_015.html","./pribeh_dvou_mest_016.html","./pribeh_dvou_mest_017.html","./pribeh_dvou_mest_018.html","./pribeh_dvou_mest_019.html","./pribeh_dvou_mest_020.html","./pribeh_dvou_mest_021.html","./pribeh_dvou_mest_022.html","./pribeh_dvou_mest_023.html","./pribeh_dvou_mest_024.html","./pribeh_dvou_mest_025.html","./pribeh_dvou_mest_026.html","./pribeh_dvou_mest_027.html","./pribeh_dvou_mest_028.html","./pribeh_dvou_mest_029.html","./pribeh_dvou_mest_030.html","./pribeh_dvou_mest_031.html","./pribeh_dvou_mest_032.html","./pribeh_dvou_mest_033.html","./pribeh_dvou_mest_034.html","./pribeh_dvou_mest_035.html","./pribeh_dvou_mest_036.html","./pribeh_dvou_mest_037.html","./pribeh_dvou_mest_038.html","./pribeh_dvou_mest_039.html","./pribeh_dvou_mest_040.html","./pribeh_dvou_mest_041.html","./pribeh_dvou_mest_042.html","./pribeh_dvou_mest_043.html","./pribeh_dvou_mest_044.html","./pribeh_dvou_mest_045.html","./pribeh_dvou_mest_046.html","./pribeh_dvou_mest_047.html","./pribeh_dvou_mest_048.html","./pribeh_dvou_mest_049.html","./pribeh_dvou_mest_050.html","./pribeh_dvou_mest_051.html","./pribeh_dvou_mest_052.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/mzk_logo_tyrkys_transparent.jpg","./resources/obalka_pribeh_dvou_mest.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
