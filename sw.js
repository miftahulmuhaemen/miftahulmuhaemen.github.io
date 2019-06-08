importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/background1.jpg",
    "revision": "2ee73c4608366037656308cd63ce17c7"
  },
  {
    "url": "assets/font-icon.woff2",
    "revision": "d7e60f9d1433a45ed71817f6d23abeca"
  },
  {
    "url": "css/materialize.css",
    "revision": "b0663391a6dd5efed956259f29fa18dd"
  },
  {
    "url": "css/materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "css/style.css",
    "revision": "e7cb203225f236311282b2686cb839c1"
  },
  {
    "url": "detail-team.html",
    "revision": "1b2db8ec748eebbd16436479013ebe32"
  },
  {
    "url": "Endpoint.txt",
    "revision": "76a3da59612b3ce4936fb42430ee7eec"
  },
  {
    "url": "icon.png",
    "revision": "1f88823fe772650844f569ccde5035fa"
  },
  {
    "url": "index.html",
    "revision": "9c4e8389ae9ab2f86e38a409c9503b79"
  },
  {
    "url": "js/api.js",
    "revision": "ce30751dbfa20ebea78284f30347bd33"
  },
  {
    "url": "js/idb.js",
    "revision": "c06c5349be2a5370c8ff50145d5fc269"
  },
  {
    "url": "js/jquery-3.2.1.min.js",
    "revision": "27a8f25e65bfe1872ebd62e021a0c6ca"
  },
  {
    "url": "js/materialize.js",
    "revision": "74ac8fd1cd0b94f532c54d4c707a86ae"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "5dcfc8944ed380b2215dc28b3f13835f"
  },
  {
    "url": "js/nav.js",
    "revision": "c72ec3f42d232b222fa88b9533dde91d"
  },
  {
    "url": "js/notification.js",
    "revision": "4c21faf61a6d48fadca37cc42f795eb1"
  },
  {
    "url": "manifest.json",
    "revision": "63b4925468f99d9ca6b183cbd2e9e2f3"
  },
  {
    "url": "nav.html",
    "revision": "8c4456dbd867753f2a853589a061e397"
  },
  {
    "url": "pages/favorite.html",
    "revision": "4261190bb2066c4a04fffe93d4437739"
  },
  {
    "url": "pages/home.html",
    "revision": "bc878e3d86bd873d521db3cdefd604a0"
  },
  {
    "url": "push.js",
    "revision": "c6622e55f6a9e33bb98d1af48448d7c2"
  },
  {
    "url": "README.md",
    "revision": "1983b90732b1f5fc4e35e8106ad3fc81"
  }
]);
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.cacheFirst({
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ]
    })
  );

  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  