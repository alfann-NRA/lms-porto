'use client';
import { useState, useEffect } from 'react';
import { Fingerprint, MessageCircle, Video, CheckCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentClassPage() {
  const [activeTab, setActiveTab] = useState<'ATTENDANCE' | 'VCLASS' | 'DISCUSSION'>('ATTENDANCE');
  const [hasAttended, setHasAttended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock checking if attendance is open
  const isAttendanceOpen = true; 

  const handleAttend = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendanceId: 'dummy-attendance-id' })
      });
      setHasAttended(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ATTENDANCE':
        return (
          <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm text-center">
            {hasAttended ? (
              <>
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2 text-green-600">Anda Sudah Hadir!</h3>
                <p className="text-muted-foreground">Presensi hari ini telah tercatat di sistem pada pukul {new Date().toLocaleTimeString('id-ID')}.</p>
              </>
            ) : isAttendanceOpen ? (
              <>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Fingerprint className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">Presensi Dibuka</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Guru Anda telah membuka sesi presensi. Silakan ketuk tombol di bawah untuk mencatatkan kehadiran Anda.
                </p>
                <button 
                  onClick={handleAttend}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 px-10 rounded-full transition-all shadow-[0_4px_0_0_rgb(13,148,136)] hover:shadow-[0_2px_0_0_rgb(13,148,136)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] text-lg inline-flex items-center gap-2"
                >
                  <Fingerprint className="w-6 h-6" />
                  {isLoading ? 'Memverifikasi...' : 'Ketuk untuk Hadir'}
                </button>
              </>
            ) : (
              <p className="text-muted-foreground py-10">Belum ada sesi presensi yang dibuka oleh guru.</p>
            )}
          </div>
        );
      
      case 'VCLASS':
        return (
          <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm">
            <h3 className="text-xl font-bold font-heading mb-6">Jadwal Kelas Virtual Terdekat</h3>
            
            <div className="bg-accent/10 border-2 border-accent/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-accent-foreground shadow-md">
                  <Video className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Pertemuan 3 - Aljabar Linear</h4>
                  <p className="text-muted-foreground text-sm">Hari ini, 14:00 WIB • Zoom Meeting</p>
                </div>
              </div>
              <button className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-6 rounded-xl transition-all shadow-md active:translate-y-1 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Gabung Kelas
              </button>
            </div>
          </div>
        );

      case 'DISCUSSION':
        return (
          <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm">
            <h3 className="text-xl font-bold font-heading mb-6">Forum Diskusi Aktif</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-border rounded-2xl p-5 hover:border-green-500/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-500/20 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Aljabar Linear</span>
                  <span className="text-xs text-muted-foreground">2 jam yang lalu</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Diskusi Bab 3: Matriks Inverse</h4>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  Bagaimana menurut kalian penerapan matriks inverse dalam komputer grafis? Apakah ada algoritma spesifik yang lebih cepat dari Gauss-Jordan?
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <MessageCircle className="w-4 h-4" />
                  12 Komentar
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-black text-foreground tracking-tight">Ruang Kelas</h1>
        <p className="text-muted-foreground mt-2 text-lg">Presensi, Konferensi Video, dan Diskusi Interaktif.</p>
      </div>

      <div className="flex space-x-2 bg-card p-2 rounded-2xl border-2 border-border w-fit">
        <button 
          onClick={() => setActiveTab('ATTENDANCE')}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'ATTENDANCE' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          <Fingerprint className="w-4 h-4" /> Presensi
        </button>
        <button 
          onClick={() => setActiveTab('VCLASS')}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'VCLASS' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          <Video className="w-4 h-4" /> Kelas Virtual
        </button>
        <button 
          onClick={() => setActiveTab('DISCUSSION')}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'DISCUSSION' ? 'bg-green-500 text-white shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          <MessageCircle className="w-4 h-4" /> Diskusi
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
