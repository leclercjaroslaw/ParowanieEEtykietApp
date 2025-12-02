self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
  // Wymagane, aby PWA działało, nawet jeśli nic nie robi
});