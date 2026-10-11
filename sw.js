const CACHE = "studybox-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  const sameOrigin = u.origin === location.origin;
  const cdn = u.hostname === "cdn.jsdelivr.net" || u.hostname === "cdnjs.cloudflare.com";
  // Model files (Hugging Face) are left to the AI library's own cache.
  if (!sameOrigin && !cdn) return;

  const store = res => {
    if (res && (res.ok || res.type === "opaque")) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  };

  if (sameOrigin) {
    // Your own files: network first so updates show up, cache when offline.
    e.respondWith(fetch(req).then(store).catch(() => caches.match(req).then(h => h || caches.match("./index.html"))));
  } else {
    // Libraries from CDNs: cache first.
    e.respondWith(caches.match(req).then(h => h || fetch(req).then(store)));
  }
});
