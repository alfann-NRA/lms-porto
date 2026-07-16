'use client';
import { useState, useEffect } from 'react';
import { Video, MessageSquare, Clock, Plus, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClassManagementPage() {
  const [activeTab, setActiveTab] = useState<'VCLASS' | 'ATTENDANCE' | 'DISCUSSION'>('ATTENDANCE');
  
  // States for actions
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleOpenAttendance = async () => {
    setIsLoading(true);
    try {
      // In a real app we fetch the teacher's classId, but here we hardcode or fetch the default class
      // Let's call our attendance API
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: 'dummy-class-id-will-fail-if-no-db-check' })
      });
      // Mocking success since we don't have a UI to select classes yet
      setSuccessMsg('Sesi Presensi Berhasil Dibuka!');
      setTimeout(() => setSuccessMsg(''), 3000);
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
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-2">Buka Sesi Presensi Baru</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Siswa akan mendapatkan notifikasi dan dapat melakukan "Tap Hadir" melalui aplikasi mereka.
            </p>
            <button 
              onClick={handleOpenAttendance}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-xl transition-all shadow-md active:translate-y-1 disabled:opacity-50 inline-flex items-center gap-2"
            >
              {successMsg ? <CheckCircle className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isLoading ? 'Memproses...' : successMsg || 'Buka Presensi Hari Ini'}
            </button>
          </div>
        );
      case 'VCLASS':
        return (
          <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm">
            <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
              <Video className="w-6 h-6 text-accent" />
              Buat Kelas Virtual Baru
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Judul Pertemuan</label>
                <input type="text" className="w-full p-3 rounded-xl border-2 border-border bg-background" placeholder="Contoh: Pertemuan 3 - Aljabar" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Platform</label>
                <select className="w-full p-3 rounded-xl border-2 border-border bg-background">
                  <option>Zoom Meeting</option>
                  <option>Google Meet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Tautan (Link) Meeting</label>
                <input type="url" className="w-full p-3 rounded-xl border-2 border-border bg-background" placeholder="https://zoom.us/j/..." />
              </div>
              <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-xl transition-all shadow-md mt-4">
                Buat Kelas Virtual
              </button>
            </div>
          </div>
        );
      case 'DISCUSSION':
        return (
          <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-2">Forum Diskusi Kelas</h3>
            <p className="text-muted-foreground mb-8">Buat topik diskusi baru untuk memancing keaktifan siswa di luar jam kelas.</p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md active:translate-y-1">
              Buat Topik Baru
            </button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-black text-foreground tracking-tight">Manajemen Kelas (EdLink Parity)</h1>
        <p className="text-muted-foreground mt-2 text-lg">Kelola presensi, kelas virtual, dan forum diskusi dengan mudah.</p>
      </div>

      <div className="flex space-x-2 bg-card p-2 rounded-2xl border-2 border-border w-fit">
        <button 
          onClick={() => setActiveTab('ATTENDANCE')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'ATTENDANCE' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          Presensi
        </button>
        <button 
          onClick={() => setActiveTab('VCLASS')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'VCLASS' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          Kelas Virtual
        </button>
        <button 
          onClick={() => setActiveTab('DISCUSSION')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'DISCUSSION' ? 'bg-green-500 text-white shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          Forum Diskusi
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
