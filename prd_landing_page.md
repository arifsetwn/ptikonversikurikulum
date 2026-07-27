# PRD: Landing Page Informasi Kurikulum 2026 — Prodi Pendidikan Teknik Informatika

## 1. Latar Belakang
Program Studi Pendidikan Teknik Informatika (PTI) menerapkan Kurikulum 2026 menggantikan Kurikulum 2022. Perubahan ini mencakup visi keilmuan baru, penambahan/pengurangan mata kuliah, perubahan bobot SKS, serta aturan konversi bagi mahasiswa yang masih menjalani kurikulum lama. Mahasiswa PTI existing membutuhkan satu halaman rujukan yang merangkum seluruh perubahan ini secara jelas, sekaligus menjadi pintu masuk ke tool simulasi konversi kurikulum yang sudah dirancang sebelumnya (lihat `prd_simulasi.md`).

## 2. Tujuan
- Menjadi **satu sumber informasi resmi** yang merangkum perubahan Kurikulum 2022 → 2026 secara ringkas dan mudah dipahami.
- Mengarahkan mahasiswa ke **tool simulasi konversi kurikulum** sebagai tindak lanjut (CTA utama).
- Mengurangi kebingungan/pertanyaan berulang ke prodi terkait perubahan kurikulum.

## 3. Target Pengguna
- **Mahasiswa PTI aktif** (kurikulum 2022) yang akan terdampak konversi ke kurikulum 2026.
- Tidak memerlukan login — halaman bersifat publik/terbuka bagi siapa pun yang mengakses.

## 4. Tujuan Utama Halaman (CTA)
- Landing page ini dan tool simulasi konversi **digabung menjadi satu website** — landing page berfungsi sebagai **halaman utama (homepage)**, sedangkan tool simulasi menjadi **halaman/route berikutnya** (mis. `/` untuk landing page, `/simulasi` untuk tool konversi).
- **CTA utama**: tombol/link menuju route tool simulasi konversi kurikulum (mis. "Cek Konversi Nilai Saya Sekarang").
- Tidak ada CTA sekunder untuk unduh dokumen (lihat Bagian 5.9 & 8 — dokumen lengkap tidak ditampilkan di landing page).

## 5. Struktur Konten & Informasi (Information Architecture)
Landing page menampilkan **seluruh bagian** dari dokumen sumber, disusun sebagai berikut:

### 5.1 Hero Section
- Judul: "Kurikulum 2026 — Program Studi Pendidikan Teknik Informatika"
- Sub-judul singkat: penjelasan 1-2 kalimat bahwa kurikulum berubah dan mahasiswa perlu mengecek konversi nilainya.
- Tombol CTA utama: **"Simulasikan Konversi Nilai Saya"** (menuju tool konversi).

### 5.2 Visi Keilmuan Program Studi
- Menampilkan visi lengkap: *"Menyelenggarakan dan mengembangkan keilmuan Pedagogi Informatika yang future-oriented berbasis computational thinking untuk mendukung transformasi digital pendidikan berlandaskan nilai keislaman."*
- 4 kata kunci visi ditampilkan sebagai poin/kartu ringkas: Pedagogi Informatika, Future-oriented, Computational Thinking, Transformasi Digital Pendidikan, Nilai Keislaman.

### 5.3 Profil Lulusan (PL)
Ditampilkan sebagai 3 kartu/tab:
- **PL1 – Pendidik Informatika**: deskripsi sektor pendidikan + contoh pekerjaan (guru, instruktur, tenaga kependidikan, asisten peneliti, konsultan pendidikan).
- **PL2 – IT Engineer**: deskripsi sektor informatika + contoh pekerjaan (programmer, software engineer, web developer, dll — daftar panjang, gunakan format "lihat selengkapnya").
- **PL3 – Technopreneur**: deskripsi wirausaha teknologi + contoh pekerjaan (bisnis digital, konsultan AI, dll).

### 5.4 Tujuan Pendidikan Program Studi (PEO)
Tabel/daftar 3 PEO: Career Professionalism (PEO-01), Academic (PEO-02), Social Engagement (PEO-03), masing-masing dengan deskripsi singkat.

### 5.5 Capaian Pembelajaran Lulusan (CPL)
Tabel 7 CPL (CPL-1 s/d CPL-7) dengan kolom: Kode CPL, Deskripsi, Keterangan (kategori Sikap/Pengetahuan/Keterampilan).

### 5.6 Alur Kurikulum & Learning Path
- Gambar alur kurikulum — lihat `src/img/alur_kurikulum.png`
- Penjelasan bahwa kurikulum 2026 tidak memakai sistem konsentrasi, melainkan **Learning Path** (jalur pembelajaran karir).
- Tabel 6 Learning Path beserta sebaran MK pilihannya (AI, Software Engineering, Cybersecurity/Network/Cloud, Educational Technology, Digital Creative Media & Immersive Technology, Digital Entrepreneurship).

### 5.7 Aturan Konversi Kurikulum
Ditampilkan sebagai poin bernomor, **bagian penting yang perlu ditonjolkan** (menuju CTA simulasi):
1. Mahasiswa Wisuda Periode I 2026/2027 → **tidak berlaku konversi**.
2. Seluruh mahasiswa PTI yang KRS Semester Gasal TA 2026/2027 → **berlaku konversi kurikulum 2026**.
3. Mahasiswa yang sudah bebas teori dan sedang menempuh skripsi → **berlaku konversi kurikulum 2026**.
- Setelah poin ini, tampilkan **tombol CTA utama** kembali (agar mahasiswa yang scroll sampai sini langsung bisa lanjut ke simulasi).

### 5.8 Catatan Perubahan Umum
Tabel ringkas 5 poin perubahan umum: Total SKS (144→146), MK Pilihan (30 MK, 5→3 wajib diambil sesuai learning path), Praktik Industri (2 SKS/1 bulan → 4 SKS/3 bulan), PLP (I & II terpisah → jadi satu di semester 7), Life Skill (terintegrasi KKN → berdiri sendiri).

### 5.9 Catatan Perubahan Khusus
Ditampilkan sebagai 4 sub-bagian (bisa berupa tab atau accordion agar tidak terlalu panjang):
- **Mata Kuliah Baru**: Life Skills (2 SKS), Seminar Proposal (2 SKS), Instructional Capstone Project (2 SKS).
- **Perubahan Nama Mata Kuliah**: tabel lengkap 18 baris pemetaan nama lama → nama baru (mis. Transformasi Digital → Literasi Digital, Skripsi → Seminar Proposal + Tugas Akhir, dll).
- **Perubahan Bobot SKS**: tabel 7 mata kuliah dengan perubahan SKS (Kalkulus 3→2, Praktik Industri 2→4, Skripsi 4 → Seminar Proposal 2 + Tugas Akhir 4, dll).
- **Perubahan MK Pilihan menjadi MK Wajib**: Kecerdasan Buatan (wajib semester 4), Internet of Things (wajib semester 6).

### 5.10 CTA Penutup (Footer Section)
- Ringkasan ajakan: "Sudah tahu perubahannya? Cek langsung bagaimana nilai kurikulum 2022 Anda dikonversi."
- Tombol CTA utama sekali lagi menuju route tool simulasi.
- Tidak ada tautan unduh dokumen maupun kontak/kanal bantuan di bagian ini (lihat Bagian 8 — di luar cakupan).

## 6. Kebutuhan Fungsional
| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | Navigasi antar-section | Sticky nav atau anchor link agar mahasiswa bisa lompat ke bagian tertentu (mis. langsung ke "Aturan Konversi") |
| 2 | CTA ke tool simulasi | Tombol yang mengarah (link/route internal) ke halaman tool simulasi konversi kurikulum dalam satu website yang sama |
| 3 | Tabel & accordion interaktif | Konten panjang (perubahan nama MK, learning path) ditampilkan ringkas dengan opsi expand/collapse |
| 4 | Gambar alur kurikulum | Menampilkan gambar pengganti (bukan dari dokumen asli) dengan kualitas terbaca |

## 7. Kebutuhan Non-Fungsional
- Responsif (mobile-friendly), karena mahasiswa kemungkinan besar akses lewat HP.
- Waktu muat cepat — halaman statis, tanpa perlu backend/database.
- Konten panjang (terutama tabel perubahan nama MK & bobot SKS) menggunakan **accordion/collapsible** agar halaman tidak terlalu panjang untuk di-scroll.
- Visual jelas membedakan: info **umum** (visi, profil lulusan) vs info **actionable** (aturan konversi + CTA).

## 8. Batasan (Out of Scope)
- Tidak ada mesin konversi nilai di landing page — itu ada di route/halaman tool simulasi terpisah dalam website yang sama.
- Tidak ada login/personalisasi konten per mahasiswa.
- Tidak menampilkan status kelulusan/IPK individual.
- Tidak menampilkan/menyediakan unduhan dokumen kurikulum versi lengkap di landing page.
- Tidak mencantumkan kontak/kanal bantuan prodi.

## 9. Konfirmasi Final (Keputusan Prodi)
1. **Struktur website**: landing page dan tool simulasi konversi **digabung dalam satu website** — landing page sebagai homepage, tool simulasi sebagai route/halaman berikutnya.
2. **Kontak/kanal bantuan**: tidak perlu dicantumkan.
3. **Gambar alur kurikulum**: gambar dari dokumen asli **akan diganti** dengan gambar lain — perlu menunggu file gambar pengganti dari prodi sebelum bagian 5.6 difinalisasi di desain.
4. **Dokumen lengkap**: **tidak ditampilkan/diunduh** di landing page. Versi PDF dari dokumen Word sumber sudah **dibuat sebagai referensi internal** (lihat file terlampir `Dokumen_Kurikulum_2026_PTI.pdf`), namun tidak menjadi bagian dari fitur landing page.

## 10. Rencana Teknis (Usulan)
- **Satu website, dua route utama**: `/` (landing page) dan `/simulasi` (tool simulasi konversi dari PRD sebelumnya).
- **Frontend**: React/Next.js dengan section-section landing page sesuai Bagian 5, dan CTA berupa internal link (`<Link>`) ke route simulasi — bukan link eksternal.
- **Konten**: disimpan sebagai data terstruktur (JSON/Markdown) agar mudah diperbarui prodi tanpa mengubah kode (mis. tabel perubahan MK, learning path).
- Karena tidak ada login/database, seluruh website (landing page + tool simulasi) bisa **sepenuhnya statis/client-side**, sesuai rencana teknis tool simulasi sebelumnya.