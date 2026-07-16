'use client';
import { useState } from 'react';
import { BookOpen, HelpCircle, Plus, FileText, UploadCloud, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ModuleAndQuizPage() {
  const [activeTab, setActiveTab] = useState<'MODULE' | 'QUIZ'>('MODULE');
  
  // Dummy states for the UI
  const [moduleTitle, setModuleTitle] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: moduleTitle,
          content: 'Isi konten modul...',
          fileUrl: '',
          classId: 'dummy-class'
        })
      });
      alert('Modul Berhasil Dibuat!');
      setModuleTitle('');
    } catch(err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: quizTitle,
          durationMin: 60,
          classId: 'dummy-class',
          questions: [
            { text: 'Apa ibukota Indonesia?', optionA: 'Jakarta', optionB: 'Bandung', optionC: 'Surabaya', optionD: 'Bali', correctOpt: 'A' }
          ]
        })
      });
      alert('Kuis Berhasil Dibuat dengan 1 soal dummy!');
      setQuizTitle('');
    } catch(err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-black text-foreground tracking-tight">Modul & Kuis CBT</h1>
        <p className="text-muted-foreground mt-2 text-lg">Bangun materi pembelajaran terstruktur dan ujian berbasis komputer ala Moodle.</p>
      </div>

      <div className="flex space-x-2 bg-card p-2 rounded-2xl border-2 border-border w-fit">
        <button 
          onClick={() => setActiveTab('MODULE')}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'MODULE' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          <BookOpen className="w-4 h-4" /> Modul Materi
        </button>
        <button 
          onClick={() => setActiveTab('QUIZ')}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'QUIZ' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted'}`}
        >
          <HelpCircle className="w-4 h-4" /> Kuis CBT
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'MODULE' ? (
          <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm">
            <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Buat Modul Baru
            </h3>
            <form onSubmit={handleCreateModule} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Judul Bab / Modul</label>
                <input required value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} type="text" className="w-full p-3 rounded-xl border-2 border-border bg-background" placeholder="Contoh: Bab 1 - Pengenalan Sel" />
              </div>
              <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="font-bold text-foreground">Unggah Dokumen (PDF, PPT)</p>
                <p className="text-sm text-muted-foreground mt-2">Atau seret dan lepas file di sini</p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Konten Teks (Opsional)</label>
                <textarea rows={5} className="w-full p-3 rounded-xl border-2 border-border bg-background" placeholder="Tuliskan materi pengantar..."></textarea>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-md active:translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50">
                <Save className="w-5 h-5" />
                Simpan Modul
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm border-t-8 border-t-accent">
            <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-accent" />
              Buat Kuis CBT Baru
            </h3>
            <form onSubmit={handleCreateQuiz} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Judul Kuis</label>
                  <input required value={quizTitle} onChange={e => setQuizTitle(e.target.value)} type="text" className="w-full p-3 rounded-xl border-2 border-border bg-background" placeholder="Contoh: Ujian Tengah Semester" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Durasi (Menit)</label>
                  <input type="number" defaultValue={60} className="w-full p-3 rounded-xl border-2 border-border bg-background" />
                </div>
              </div>
              
              <div className="border-2 border-border rounded-2xl p-6 bg-muted/20">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold">Bank Soal (Pilihan Ganda)</h4>
                  <button type="button" className="text-accent font-bold flex items-center gap-1 text-sm bg-accent/10 px-3 py-1.5 rounded-lg hover:bg-accent/20">
                    <Plus className="w-4 h-4" /> Tambah Soal
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Dummy Question UI */}
                  <div className="bg-background border-2 border-border p-4 rounded-xl">
                    <p className="font-medium text-sm mb-3">1. Apa ibukota Indonesia?</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 border-2 border-green-500 bg-green-500/10 rounded-lg flex items-center gap-2 font-bold text-green-700"><span className="w-6 h-6 rounded bg-green-500 text-white flex items-center justify-center">A</span> Jakarta</div>
                      <div className="p-2 border-2 border-border rounded-lg flex items-center gap-2"><span className="w-6 h-6 rounded bg-muted flex items-center justify-center font-bold">B</span> Bandung</div>
                      <div className="p-2 border-2 border-border rounded-lg flex items-center gap-2"><span className="w-6 h-6 rounded bg-muted flex items-center justify-center font-bold">C</span> Surabaya</div>
                      <div className="p-2 border-2 border-border rounded-lg flex items-center gap-2"><span className="w-6 h-6 rounded bg-muted flex items-center justify-center font-bold">D</span> Bali</div>
                    </div>
                  </div>
                </div>
              </div>

              <button disabled={isSubmitting} type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-xl transition-all shadow-md active:translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50">
                <Save className="w-5 h-5" />
                Terbitkan Kuis
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
