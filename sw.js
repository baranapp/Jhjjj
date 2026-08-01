// نام ورژن را هر بار که کد را تغییر دادید، عوض کنید (مثلاً baran-v2)
// این کار باعث می‌شود مرورگر بفهمد نسخه جدید آمده است
const CACHE_NAME = "baran-v2"; 

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./logo.png"
];

// مرحله نصب: ذخیره فایل‌ها در کش
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Service Worker: Caching files...");
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting(); // اجبار به فعال شدن نسخه جدید بلافاصله
});

// مرحله فعال‌سازی: پاک کردن کش‌های قدیمی برای جلوگیری از سنگین شدن حافظه
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache...", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// استراتژی هوشمند: Network-First (اول اینترنت، اگر قطع بود کش)
// این کار باعث می‌شود کاربر همیشه آخرین نسخه را ببیند
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // اگر درخواست موفق بود، آن را در کش ذخیره کن تا برای دفعات بعد سریع‌تر باز شود
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // اگر اینترنت قطع بود، از فایل‌های ذخیره شده در کش استفاده کن
        return caches.match(event.request);
      })
  );
});
