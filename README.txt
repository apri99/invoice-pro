# InvoicePro

InvoicePro adalah aplikasi faktur digital modular yang dapat diedit, diubah tema, dan diekspor ke PDF/Word. Dirancang untuk tim WarungDigital99 dan siap diwariskan.

## 🔧 Fitur Utama
- Desain profesional dengan warna elegan
- Logo usaha drag & drop
- Ubah tema: Default, Dark, Promo
- Export PDF dan Word (tanpa elemen UI)
- Semua data editable langsung di browser
- PWA stabil dan bisa di-install

## 📁 Struktur Folder
invoice-pro/ ├── index.html ├── style.css ├── theme.css ├── script.js ├── manifest.json ├── service-worker.js ├── assets/ │ └── logo.png ├── .nojekyll


## 🚀 Deploy ke GitHub Pages
1. Push ke repo `apri99/invoice-pro`
2. Aktifkan GitHub Pages dari branch `main`, folder `/root`
3. Tambahkan file `.nojekyll` agar folder `assets/` tidak diabaikan

## 📦 Teknologi
- HTML, CSS, JS
- jsPDF + html2canvas
- PWA manifest + service worker

## 🧠 Siap Diwariskan
- Modular dan bisa dikembangkan untuk invoice, etalase, atau dashboard
- Semua warna dan fungsi bisa disesuaikan via `theme.css` dan `script.js`
