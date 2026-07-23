# Platform Informasi Kurikulum 2026 & Simulasi Konversi Nilai
### Program Studi Pendidikan Teknik Informatika (PTI) — Universitas Muhammadiyah Surakarta

![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

Platform web terpadu self-service bagi mahasiswa Pendidikan Teknik Informatika UMS untuk memahami pembaruan **Kurikulum 2026** serta melakukan **simulasi konversi transkrip nilai Kurikulum 2022 ke Kurikulum 2026** secara instan, akurat, dan dapat dicetak ke dokumen PDF.

---

## 🌟 Fitur Utama

### 1. Landing Page Informasi Kurikulum 2026
- **Visi Keilmuan & 5 Pilar**: Penjelasan visi keilmuan *Pedagogi Informatika* berbasis *Computational Thinking* & nilai Keislaman.
- **Profil Lulusan (PL)**: 3 Profil Lulusan (Pendidik Informatika, IT Engineer, & Technopreneur) beserta daftar prospek karirnya.
- **Standar Kompetensi Lulusan (PEO & CPL)**: Rincian PEO-01 s/d PEO-03 dan filter kategori 7 Capaian Pembelajaran Lulusan (CPL).
- **Peta Alur Kurikulum & Fullscreen Lightbox Zoom**: Visualisasi alur perkuliahan Semester 1 s/d 8 yang dapat diperbesar layar penuh (*fullscreen interactive lightbox*).
- **6 Learning Path Karir**: Pilihan jalur spesialisasi (AI & Data Science, Software Engineering, Cybersecurity/Cloud, EdTech, Immersive Tech/Game, & Technopreneurship) dengan rekomendasi MK pilihannya.
- **Kebijakan & Aturan Konversi**: Poin penting aturan konversi bagi mahasiswa KRS Gasal 2026/2027, peserta skripsi, dan lulusan periode I.
- **Catatan Perubahan Umum & Khusus**: Tab rincian 18 Perubahan Nama MK, 7 Perubahan Bobot SKS, Mata Kuliah Baru, dan MK Pilihan jadi Wajib.

### 2. Tool Simulasi Konversi Nilai Mandiri (2022 → 2026)
- **Input Transkrip Mudah**: Ketik nama mata kuliah atau unggah file transkrip Excel/CSV (`.xlsx`, `.xls`, `.csv`).
- **Skala Penilaian & Bobot Nilai**: Mendukung penilaian A (4.00), A/B (3.50), B (3.00), B/C (2.50), C (2.00), C/D (1.50), D (1.00), & E (0.00).
- **Evaluasi & Perbandingan IPK**: Menghitung secara otomatis **IPK 2022 (Sebelum Konversi)** dan **IPK 2026 (Setelah Konversi)** beserta indikator selisihnya.
- **Pemetaan Konversi Cerdas**: Memetakan konversi 1:1, opsi pemecahan 1:Many, serta mendeteksi MK tidak dikonversi (SKS hilang).
- **Rekapitulasi SKS Kurikulum 2026 Belum Diambil**: Menampilkan daftar seluruh mata kuliah 2026 yang belum terpenuhi dan menghitung sisa SKS kelulusan mengacu target 145 SKS.
- **Cetak & Ekspor PDF**: Menghasilkan dokumen resmi simulasi mandiri bertanda Kop Prodi PTI UMS yang siap dicetak/diunduh.
- **100% Client-Side & Privasi Terjaga**: Seluruh proses berlangsung di browser tanpa menyimpan data pribadi mahasiswa di server.

---

## 🛠️ Teknologi (Tech Stack)

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS + Vanilla CSS (Glassmorphism & Micro-animations)
- **Icons**: Lucide React
- **Excel Parser**: SheetJS (`xlsx`)
- **PDF Export**: `html2canvas` + `jspdf`

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat
- Node.js versi 18.x atau lebih baru
- npm / yarn / pnpm

### Langkah Instalasi & Pengoperasian Lokal

1. **Clone Repository**
   ```bash
   git clone https://github.com/arifsetwn/ptikonversikurikulum.git
   cd ptikonversikurikulum
   ```

2. **Install Dependensi**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembang (Dev Server)**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173`.

4. **Build untuk Produksi**
   ```bash
   npm run build
   ```
   Hasil build siap deploy tersedia di direktori `dist/`.

---

## 📁 Struktur Direktori Proyek

```
ptikonversikurikulum/
├── src/
│   ├── components/         # Komponen UI (Navbar, Hero, LandingPage, Forms, ResultTable, PDF Modal)
│   ├── data/               # Master Data JSON (mappingData, courses2022, courses2026, landingData)
│   ├── img/                # Asset Gambar (logo_pti.png, alur_kurikulum.png)
│   ├── types/              # Type Definitions TypeScript (Course, Mapping, Stats, Grade)
│   ├── utils/              # Conversion Engine, Excel Parser, PDF Generator, & Sample Data
│   ├── App.tsx             # Main App Router & View Controller
│   └── main.tsx            # Application Entrypoint
├── public/                 # Static Assets
├── index.html              # HTML Document Shell
├── package.json            # Dependencies & Scripts
├── tsconfig.json           # TypeScript Config
└── vite.config.ts          # Vite Config
```

---

## 🚀 Panduan Deployment ke Shared Hosting (cPanel / Hostinger / Niagahoster)

Aplikasi berbasis **Vite + React SPA** (Single Page Application) ini berjalan 100% di browser *client-side*, sehingga dapat di-deploy dengan mudah ke layanan **Shared Hosting (Apache / Nginx)** tanpa memerlukan Node.js server aktif.

### Langkah 1: Build Produksi
Jalankan perintah build pada terminal lokal Anda:
```bash
npm run build
```
Perintah ini akan menghasilkan bundel produksi teroptimasi di dalam direktori **`dist/`**.

---

### Langkah 2: Menyiapkan File `.htaccess` (Untuk Apache / cPanel / Subdirektori)
Untuk memastikan routing Single Page Application berjalan lancar tanpa error `404 Not Found` atau MIME type error saat halaman di-refresh (baik di root domain maupun sub-folder seperti `/kurikulum26/`), sertakan file **`.htaccess`** di folder hosting Anda:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# Gzip Compression for Fast Loading
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>
```

---

### Langkah 3: Upload ke Shared Hosting via File Manager / cPanel
1. Buka dashboard **cPanel** / **Hostinger hPanel** / **Niagahoster** / **Rumahweb**.
2. Masuk ke **File Manager** dan buka direktori tujuan (misal **`public_html/`** untuk domain utama, atau **`public_html/kurikulum26/`** untuk subdirektori).
3. Compress/Zip seluruh isi folder **`dist/`** di lokal komputer Anda, lalu upload file ZIP tersebut ke folder tujuan di hosting.
4. Extrak file ZIP di folder tujuan. Pastikan file `index.html`, folder `assets/`, dan file `.htaccess` berada langsung di dalam folder tersebut:
   ```
   public_html/kurikulum26/  (atau public_html/)
   ├── assets/
   │   ├── index-XXXX.js
   │   ├── index-XXXX.css
   │   └── ...
   ├── index.html
   └── .htaccess
   ```
5. Buka `https://domainanda.com/kurikulum26/` di browser. Aplikasi Konversi Kurikulum PTI UMS 2026 kini dapat diakses secara instan tanpa error 404/MIME type!

---

## 📄 Lisensi & Hak Cipta

Hak Cipta © 2026 **Program Studi Pendidikan Teknik Informatika (PTI) — Universitas Muhammadiyah Surakarta**. All rights reserved.

