const CACHE = "joy-pwa-v10";
const PRECACHE = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/joy-avatar.jpg",
  "./icons/joy-avatar-male.jpg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.all(PRECACHE.map(function (url) {
        return cache.add(url).catch(function () {});
      }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (/\.(jpg|jpeg|png|webp|gif|svg|ico)$/i.test(url.pathname) || url.pathname.indexOf("conversations.json") !== -1) {
    return;
  }

  if (req.mode === "navigate" || url.pathname.endsWith("index.html") || url.pathname === "/" || /\/$/.test(url.pathname)) {
    event.respondWith(
      fetch(req).then(function (res) {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put("./index.html", copy); });
        }
        return res;
      }).catch(function () {
        return caches.match("./index.html");
      })
    );
  }
});
