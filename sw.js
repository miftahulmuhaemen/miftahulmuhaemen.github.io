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
    "revision": "8b4f1cce30fb65fa0275d27e42a54a77"
  },
  {
    "url": "detail-team.html",
    "revision": "1b2db8ec748eebbd16436479013ebe32"
  },
  {
    "url": "Endpoint.txt",
    "revision": "dbcef4fa193c8b6a323768c0614a340c"
  },
  {
    "url": "icon.png",
    "revision": "1f88823fe772650844f569ccde5035fa"
  },
  {
    "url": "index.html",
    "revision": "0daa3bf2f240de983b93152722e0bf3a"
  },
  {
    "url": "js/api.js",
    "revision": "ce30751dbfa20ebea78284f30347bd33"
  },
  {
    "url": "js/idb.js",
    "revision": "a66942528a8af114e8a0ae4b517ab0be"
  },
  {
    "url": "js/jquery-3.2.1.min.js",
    "revision": "27a8f25e65bfe1872ebd62e021a0c6ca"
  },
  {
    "url": "js/materialize.js",
    "revision": "9832259e6e013b2e55f342c053c26104"
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
    "revision": "562b1d3ca5e2c3ff468b8177b6294463"
  },
  {
    "url": "README.md",
    "revision": "159913b434e9f525d54dc6e97d18118d"
  },
  {
    "url": "service-worker.js",
    "revision": "22da9380bc23124985a70c384e2471f6"
  }
]);
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.cacheFirst()
  );