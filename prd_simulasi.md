# PRD: Website Simulasi Konversi Kurikulum Teknik Informatika (2022 → 2026)

## 1. Latar Belakang
Program studi Teknik Informatika melakukan pembaruan kurikulum dari kurikulum 2022 ke kurikulum 2026. Mahasiswa yang masih menjalani kurikulum 2022 perlu mengetahui bagaimana mata kuliah yang telah mereka tempuh dikonversi ke struktur kurikulum baru. Website ini dibuat sebagai alat bantu simulasi mandiri (self-service) bagi mahasiswa untuk memasukkan nilai transkrip dan melihat hasil konversinya secara otomatis.

## 2. Tujuan
- Memudahkan mahasiswa mengecek posisi mata kuliahnya dalam struktur kurikulum 2026.
- Mengurangi beban administratif prodi dalam menjawab pertanyaan konversi kurikulum secara manual satu per satu.
- Menyediakan output yang jelas dan dapat diunduh sebagai dokumen pendukung akademik.

## 3. Target Pengguna
- **Mahasiswa** aktif program studi Teknik Informatika yang menjalani kurikulum 2022.
- Tidak ada login/akun — sistem bersifat **self-service tanpa autentikasi**.
- Tidak ada peran admin dalam versi awal ini; data mapping dikelola langsung oleh tim pengembang/prodi melalui file sumber (lihat Bagian 6).

## 4. Alur Pengguna (User Flow)
1. Mahasiswa membuka website.
2. Mahasiswa mengisi **Nama** dan **NIM** (untuk header PDF nanti).
3. Mahasiswa memilih metode input nilai:
   - **Input manual**: mengisi form per mata kuliah (nama MK, SKS) satu per satu, atau
   - **Upload file**: mengunggah transkrip dalam format Excel/CSV, sistem membaca otomatis daftar mata kuliah + SKS.
   - Kedua metode bisa dikombinasikan (upload dulu, lalu edit/tambah manual).
4. Sistem mencocokkan (matching) **nama** mata kuliah yang diinput terhadap **tabel pemetaan resmi** kurikulum 2022 → 2026 (fuzzy match by name, dibantu autocomplete saat input manual).
5. Sistem menampilkan **tabel hasil konversi** berisi: Nama Mata Kuliah (2022) → Nama Mata Kuliah (2026) + SKS, termasuk baris khusus untuk MK yang 1-ke-banyak dan MK yang tidak dikonversi (SKS hilang).
6. Mahasiswa dapat mengunduh hasil tersebut sebagai **file PDF** lengkap dengan Nama, NIM, dan tanggal simulasi.

## 5. Fitur Utama
| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1 | Input manual nilai | Form tambah/edit/hapus baris mata kuliah (nama, SKS) |
| 2 | Upload transkrip Excel/CSV | Parsing otomatis kolom nama MK & SKS dari file |
| 3 | Mesin pemetaan kurikulum | Mencocokkan MK 2022 ke MK 2026 berdasarkan tabel resmi prodi |
| 4 | Tabel hasil konversi | Menampilkan hasil mapping: MK lama → MK baru + SKS |
| 5 | Export PDF | Tombol unduh hasil konversi dalam bentuk PDF siap cetak |
| 6 | Penanganan MK tidak ditemukan | Menandai MK yang tidak ada padanannya di kurikulum baru (perlu ditinjau prodi) |

## 6. Data & Sumber Pemetaan
Sumber data: file `12__Tabel_Konversi_keteranganxlsx.xlsx` dari prodi (sudah diterima).

**Struktur kolom aktual (Sheet1):**
| Kode MK Lama | Nama MK Lama | SKS Lama | Semester Lama | Kode MK Baru | Nama MK Baru | SKS Baru | Semester Baru |

**Pola data yang teridentifikasi & cara sistem menanganinya:**

| Pola | Contoh dari data | Perlakuan di sistem |
|------|-------------------|----------------------|
| 1:1 (paling umum) | "Sistem Digital" → "Sistem Digital" | Ditampilkan langsung sebagai satu baris hasil |
| 1 MK lama → banyak opsi MK baru | "Informatika Kependidikan" → bisa jadi "Informatika Kependidikan" **atau** MK pilihan "Transformasi Digital" | Ditampilkan sebagai pilihan/alternatif, mahasiswa/sistem menandai sebagai "opsi konversi" |
| Banyak MK baru dari 1 MK lama (pemecahan) | "Skripsi" (4 SKS) → "Seminar Proposal" (2 SKS) + "Tugas Akhir" (4 SKS) | Ditampilkan sebagai beberapa baris terpisah, keduanya muncul sebagai hasil konversi dari 1 input |
| MK lama tanpa padanan baru | "PLP I" tidak memiliki MK baru | Ditandai **"Tidak ada padanan — perlu konsultasi prodi"** |
| MK baru tanpa asal (murni baru) | "Life Skills" tidak berasal dari MK lama manapun | Tidak relevan untuk simulasi ini (hanya muncul jika suatu saat ditampilkan sebagai info tambahan) |

**Aturan pencocokan (matching):**
- Pencocokan dilakukan berdasarkan **Kode Mata Kuliah**, bukan nama — karena ditemukan variasi kecil penulisan nama (contoh: `"Etika dan Profesi "` dengan spasi ekstra).
- Mahasiswa yang input manual/upload transkrip sebaiknya memasukkan **kode MK** (jika tersedia di transkrip) agar matching akurat; jika hanya nama yang tersedia, sistem melakukan pencocokan nama secara *fuzzy* dengan toleransi spasi/kapitalisasi sebagai cadangan.
- Data mapping dimuat sebagai **sumber statis** (JSON hasil konversi dari Excel ini) yang dibaca sistem saat aplikasi berjalan — tidak perlu database maupun panel admin di versi awal.

## 7. Output
- Tabel hasil konversi ditampilkan di halaman web.
- Tombol "Unduh PDF" menghasilkan dokumen ringkasan konversi (bisa memuat nama mahasiswa/NIM opsional sebagai header, tanggal simulasi, dan tabel hasil).

## 8. Batasan (Out of Scope) — versi awal
- Tidak ada sistem login/akun mahasiswa.
- Tidak ada panel admin untuk mengelola data mapping via web (data mapping di-load dari file statis).
- Tidak menghitung ulang IPK atau status kelulusan mata kuliah.
- Bukan sistem resmi akademik — hasil bersifat **simulasi**, bukan pengganti keputusan resmi prodi/BAAK.

## 9. Kebutuhan Non-Fungsional
- Responsif (dapat diakses dari desktop & mobile).
- Waktu proses matching cepat (< 2 detik untuk transkrip standar ~40-60 MK).
- Validasi input: nama MK tidak boleh kosong, SKS harus berupa angka wajar (1-6).
- Disclaimer jelas bahwa hasil adalah simulasi, bukan dokumen resmi.

## 10. Konfirmasi Final (Keputusan Prodi)
Seluruh poin berikut sudah dikonfirmasi dan menjadi **aturan baku** sistem:

1. **File pemetaan resmi** — selesai, sudah dianalisis (lihat Bagian 6).
2. **Kasus 1 MK lama → 2 opsi MK baru** (contoh "Informatika Kependidikan"): **kedua MK baru ditampilkan** sebagai hasil konversi (bukan memilih salah satu). Mahasiswa akan melihat kedua MK tersebut muncul di kurikulum 2026 sebagai konsekuensi dari 1 MK lama yang pernah ditempuh.
3. **Kasus MK lama tanpa padanan** (contoh "PLP I"): MK tersebut **tidak muncul** di kurikulum 2026, sehingga SKS/nilai yang pernah ditempuh untuk MK ini **dianggap hilang** dari hasil konversi. Sistem akan menandai baris ini secara eksplisit sebagai **"MK tidak dikonversi — SKS hilang"** agar mahasiswa sadar dan tidak menganggapnya sebagai kesalahan sistem.
4. **Format input transkrip**: mahasiswa hanya memasukkan **Nama Mata Kuliah** (tanpa kode MK). Konsekuensinya:
   - Matching **wajib menggunakan pencocokan nama** (bukan kode), dengan normalisasi teks (trim spasi, lowercase, abaikan tanda baca) untuk mengatasi variasi penulisan seperti `"Etika dan Profesi "`.
   - Perlu mekanisme **pencarian dengan saran (autocomplete/dropdown)** saat mahasiswa mengetik nama MK, agar mahasiswa memilih dari daftar nama MK 2022 yang valid (mengurangi risiko salah ketik/tidak ketemu saat matching).
   - Untuk upload Excel/CSV, sistem tetap mencocokkan berdasarkan kolom nama MK dengan logika fuzzy-match yang sama.
5. **Isi PDF hasil unduhan** wajib mencantumkan: **Nama Mahasiswa**, **NIM**, dan **Tanggal Simulasi Konversi**, selain tabel hasil konversi itu sendiri.
6. **Aturan MK Pilihan**: Mahasiswa **hanya perlu mengambil 3 mata kuliah pilihan saja** (total 9 SKS) dari seluruh opsi daftar MK Pilihan untuk memenuhi syarat kelulusan.

## 11. Ringkasan Perubahan pada Fitur Terkait
- **Fitur Input** (Bagian 5, No.1–2): form manual & upload perlu field **Nama** dan **NIM** di awal (sebelum isi transkrip), karena akan dipakai di header PDF.
- **Fitur Mesin Pemetaan** (Bagian 5, No.3): logika matching berbasis **nama MK** (fuzzy match), bukan kode MK.
- **Fitur Tabel Hasil** (Bagian 5, No.4): perlu mendukung **satu-ke-banyak** (1 input → 2 baris output) dan baris **"tidak dikonversi"** dengan gaya visual berbeda (misal warna merah/abu-abu) agar mahasiswa mudah membedakan MK yang hilang dari MK yang berhasil dikonversi.
- **Fitur Export PDF** (Bagian 5, No.5): header PDF memuat Nama, NIM, dan Tanggal Simulasi.

## 11. Rencana Teknis (Usulan)
- **Frontend**: React/Next.js dengan tabel interaktif untuk input & hasil.
- **Parsing Excel/CSV**: library seperti SheetJS (xlsx) di sisi client.
- **Generate PDF**: library seperti jsPDF/pdf-lib di sisi client, tanpa perlu backend/server.
- **Data mapping**: disimpan sebagai file JSON/Excel statis yang di-load saat aplikasi berjalan (tidak perlu database karena tidak ada login/admin).
- Karena tidak ada login dan tidak ada penyimpanan data permanen, aplikasi ini berpotensi **sepenuhnya berjalan di sisi client (browser)** tanpa backend — lebih sederhana dan murah untuk di-hosting.