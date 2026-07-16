# LMS Porto (Learning Management System)

Selamat datang di repositori **LMS Porto**! Aplikasi ini adalah platform *Learning Management System* yang dibangun menggunakan teknologi modern untuk mempermudah proses belajar mengajar secara digital.

![Screenshot Halaman Awal LMS Porto](./public/screenshot.png)
*(Catatan: Silakan tambahkan screenshot halaman awal ke folder `public/` dengan nama `screenshot.png` agar gambar muncul)*

---

## 🎯 Tujuan Membuat Website Ini

Tujuan utama dari LMS Porto adalah untuk menyediakan platform edukasi digital yang interaktif, *user-friendly*, dan terpusat. Website ini bertujuan untuk menjembatani komunikasi antara guru dan murid, menyederhanakan manajemen tugas (assignments) dan materi pelajaran, serta menyediakan ruang kelas virtual yang terintegrasi di era pembelajaran modern.

## ✨ Kelebihan (Advantages)

- **UI/UX Modern & Responsif**: Dibangun dengan Tailwind CSS dan Shadcn UI, memberikan tampilan yang estetis dan pengalaman pengguna yang mulus di berbagai perangkat (Desktop & Mobile).
- **Fitur Lengkap (All-in-One)**: Menyediakan fungsionalitas menyeluruh mulai dari manajemen kelas, pembuatan modul materi, penugasan, kuis interaktif, hingga absensi terstruktur.
- **Integrasi Kelas Virtual**: Dukungan fitur kelas virtual yang tertaut langsung dengan platform *video conference* eksternal seperti Zoom dan Google Meet dari dalam dashboard.
- **Performa Cepat & SEO Friendly**: Menggunakan arsitektur Next.js 15 (App Router) terkini yang menjamin waktu muat halaman yang optimal.
- **Keamanan Data**: Mengimplementasikan sistem autentikasi solid (NextAuth) dengan enkripsi *password* aman menggunakan `bcryptjs`.

## 👥 Manfaat yang Didapat Pengguna

**Untuk Guru (Teacher):**
- Kemudahan dalam membuat dan mendistribusikan modul pembelajaran (Teks/Dokumen/Video).
- Manajemen penugasan dan sistem penilaian (grading) yang terorganisir di satu tempat.
- Memantau kehadiran (*attendance*) siswa dan perkembangan nilai secara efisien.
- Memfasilitasi ujian melalui kuis dan memimpin forum diskusi interaktif.

**Untuk Siswa (Student):**
- Akses ke seluruh materi pelajaran di dashboard tunggal yang terorganisir.
- Notifikasi dan pengingat *deadline* tugas yang jelas, serta fitur pengumpulan tugas yang mudah (*drag and drop*).
- Dapat berpartisipasi dalam kelas virtual, mengambil kuis secara *real-time*, dan berdiskusi dengan teman sekelas.
- Memantau hasil ujian dan nilai tugas secara transparan.

## 🏗️ Arsitektur Flow Website

Arsitektur aplikasi LMS Porto mengedepankan kecepatan dan keamanan data, dengan alur kerja sistem sebagai berikut:

1. **Authentication Flow**:
   - Pengguna melakukan Registrasi/Login.
   - Sistem memvalidasi input, mencocokkan kredensial di database, dan mengembalikan sesi otorisasi menggunakan JSON Web Token (NextAuth).
   - *Role-Based Access Control* memisahkan akses tampilan untuk Guru (*Teacher*) dan Siswa (*Student*).
2. **Dashboard Routing & Data Fetching**:
   - Pengguna diarahkan ke dashboard spesifik berdasarkan *role*.
   - Menggunakan *React Server Components* (Next.js) dan *React Query* untuk melakukan pengambilan dan *caching* data secara efisien tanpa membebani sisi klien (browser).
3. **Database & ORM Flow**:
   - Setiap interaksi data (seperti membuat tugas baru atau mengirim jawaban kuis) memanggil API Route.
   - Prisma ORM menerima *request* tersebut dan mengeksekusi operasi CRUD (Create, Read, Update, Delete) ke dalam database SQLite (`dev.db`).
4. **Interactive UI Flow**:
   - Komponen berbasis *client* (seperti *rich-text editor* Tiptap, grafik Recharts, dan tabel dinamis) memproses *state* lokal untuk memberikan umpan balik (feedback) visual instan kepada pengguna sebelum data permanen disimpan.

## 🚀 Guidelines (Panduan Instalasi)

Ikuti langkah-langkah di bawah ini untuk menjalankan project ini secara lokal di perangkat Anda:

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18+)
- npm / yarn / pnpm

### 2. Kloning Repositori
```bash
git clone <url-repositori-anda>
cd "LMS Porto"
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Pengaturan Database & Environment
- Buat file `.env` di *root* folder aplikasi.
- Isi dengan variabel berikut:
  ```env
  DATABASE_URL="file:./dev.db"
  NEXTAUTH_SECRET="ganti-dengan-rahasia-anda-sendiri"
  NEXTAUTH_URL="http://localhost:3000"
  ```

### 5. Inisialisasi Database (Prisma)
Jalankan migrasi untuk membentuk skema tabel di dalam database SQLite lokal Anda:
```bash
npx prisma generate
npx prisma db push
```

### 6. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka **[http://localhost:3000](http://localhost:3000)** di browser Anda. Aplikasi LMS Porto sekarang siap digunakan dan dimodifikasi!
