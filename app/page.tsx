'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/20">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b-2 border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Belajarkuu Logo" width={40} height={40} className="object-contain" />
          <span className="text-2xl font-bold font-heading text-foreground">Belajarkuu</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-foreground font-bold hover:text-primary transition-colors px-4 py-2">
            Masuk
          </Link>
          <Link href="/register" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-bold transition-all shadow-[0_4px_0_0_rgb(13,148,136)] hover:shadow-[0_2px_0_0_rgb(13,148,136)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]">
            Daftar Gratis
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-64 h-64 bg-green-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 text-accent font-bold text-sm mb-6 border-2 border-accent/20">
            ✨ Platform Belajar Generasi Baru
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-foreground mb-6 leading-tight">
            Belajar Jadi Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Menyenangkan!</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
            LMS Pro menggabungkan pengalaman pengguna terbaik dengan fitur canggih untuk guru, siswa, dan orang tua.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-xl">
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-card hover:bg-muted text-foreground border-2 border-border px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center shadow-sm">
              Sudah punya akun?
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 relative z-10 max-w-5xl w-full"
        >
          <div className="bg-card p-6 rounded-3xl border-2 border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-left group">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Manajemen Kelas</h3>
            <p className="text-muted-foreground">Buat dan kelola materi pelajaran dengan Rich Text Editor yang modern.</p>
          </div>

          <div className="bg-card p-6 rounded-3xl border-2 border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-left group">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Papan Kanban</h3>
            <p className="text-muted-foreground">Siswa dapat mengatur tugas mereka layaknya profesional menggunakan Kanban.</p>
          </div>

          <div className="bg-card p-6 rounded-3xl border-2 border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-left group">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-green-500" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Pantau Anak</h3>
            <p className="text-muted-foreground">Orang tua bisa memantau grafik perkembangan nilai anak secara real-time.</p>
          </div>
        </motion.div>

        {/* Keunggulan Section */}
        <div className="w-full max-w-6xl mt-32 relative z-10 text-left">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-heading text-foreground mb-4">Mengapa Memilih Belajarkuu?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Dibandingkan dengan LMS tradisional, kami menawarkan pendekatan modern yang berpusat pada kenyamanan pengguna.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-black text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Desain UI/UX Super Modern</h3>
                  <p className="text-muted-foreground">Tinggalkan antarmuka kaku ala tahun 2010-an. Kami membawa pengalaman layaknya menggunakan media sosial modern ke dalam ruang kelas.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-accent font-black text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Fitur Setara Standar Enterprise</h3>
                  <p className="text-muted-foreground">Dilengkapi Kuis CBT (Computer Based Test), Modul interaktif, dan Buku Nilai otomatis layaknya sistem e-learning kelas dunia.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <span className="text-green-500 font-black text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Pantauan Orang Tua Real-time</h3>
                  <p className="text-muted-foreground">Satu-satunya platform yang memberikan akses khusus bagi orang tua untuk memantau grafik perkembangan belajar anak secara transparan.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-8 rounded-[3rem] border-4 border-white dark:border-card shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center animate-bounce shadow-lg text-white font-black text-center leading-tight transform rotate-12">
                #1<br/>LMS
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-sm border-2 border-border mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="flex-1 h-4 bg-muted rounded-full"></div>
                </div>
                <div className="w-full h-24 bg-muted/50 rounded-xl mb-2"></div>
                <div className="w-3/4 h-4 bg-muted rounded-full"></div>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-sm border-2 border-border translate-x-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-1/3 h-4 bg-primary/20 rounded-full"></div>
                  <div className="w-8 h-8 bg-accent/20 rounded-full"></div>
                </div>
                <div className="w-full h-12 bg-muted/50 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivasi Tokoh Section */}
        <div className="w-full max-w-6xl mt-32 mb-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-heading text-foreground mb-4">Inspirasi Para Tokoh</h2>
            <p className="text-xl text-muted-foreground">Membangkitkan semangat belajar melalui petuah tokoh-tokoh besar dunia.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm flex flex-col items-center text-center hover:border-primary transition-colors">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-primary/20 p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Ki_Hadjar_Dewantara_Portrait.jpg" alt="Ki Hajar Dewantara" className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="italic text-muted-foreground mb-6 flex-1">"Ing ngarso sung tulodo, ing madyo mangun karso, tut wuri handayani. (Di depan memberi teladan, di tengah membangun kemauan, di belakang memberi dorongan.)"</p>
              <h4 className="font-bold font-heading text-lg">Ki Hajar Dewantara</h4>
              <span className="text-sm text-primary font-medium">Bapak Pendidikan Indonesia</span>
            </div>

            <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm flex flex-col items-center text-center hover:border-accent transition-colors">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-accent/20 p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg" alt="Albert Einstein" className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="italic text-muted-foreground mb-6 flex-1">"Belajar dari kemarin, hidup untuk hari ini, berharap untuk besok. Yang penting jangan sampai berhenti bertanya."</p>
              <h4 className="font-bold font-heading text-lg">Albert Einstein</h4>
              <span className="text-sm text-accent font-medium">Fisikawan Teoritis</span>
            </div>

            <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm flex flex-col items-center text-center hover:border-green-500 transition-colors">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-green-500/20 p-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg" alt="Nelson Mandela" className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="italic text-muted-foreground mb-6 flex-1">"Pendidikan adalah senjata paling ampuh yang dapat kamu gunakan untuk mengubah dunia."</p>
              <h4 className="font-bold font-heading text-lg">Nelson Mandela</h4>
              <span className="text-sm text-green-500 font-medium">Bapak Bangsa Afrika Selatan</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
