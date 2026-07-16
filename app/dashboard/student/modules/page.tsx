'use client';
import { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, FileText, CheckCircle, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const DUMMY_MODULES = [
  { id: '1', title: 'Bab 1 - Pengenalan Aljabar Linear', type: 'MODULE' },
  { id: '2', title: 'Kuis UTS: Aljabar', type: 'QUIZ', durationMin: 60, questionsCount: 20 },
];

export default function StudentModuleAndQuizPage() {
  const [activeTab, setActiveTab] = useState<'LIST' | 'MODULE_VIEW' | 'QUIZ_PLAY'>('LIST');
  const [activeItem, setActiveItem] = useState<any>(null);
  
  // Quiz states
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timer: any;
    if (activeTab === 'QUIZ_PLAY' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && activeTab === 'QUIZ_PLAY') {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [activeTab, timeLeft]);

  const handleOpenModule = (item: any) => {
    setActiveItem(item);
    if (item.type === 'MODULE') setActiveTab('MODULE_VIEW');
    if (item.type === 'QUIZ') {
      setTimeLeft(item.durationMin * 60);
      setActiveTab('QUIZ_PLAY');
      setCurrentQuestion(1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      // Dummy submit
      await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId: activeItem.id, score: 85 })
      });
      alert('Kuis Berhasil Disubmit! Nilai Anda: 85');
      setActiveTab('LIST');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans max-w-5xl mx-auto">
      
      {activeTab === 'LIST' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          <div>
            <h1 className="text-4xl font-heading font-black text-foreground tracking-tight">Modul & Kuis CBT</h1>
            <p className="text-muted-foreground mt-2 text-lg">Akses materi pembelajaran dan kerjakan kuis CBT Anda di sini.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DUMMY_MODULES.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleOpenModule(item)}
                className={`bg-card p-6 rounded-3xl border-2 hover:border-${item.type === 'QUIZ' ? 'accent' : 'primary'} border-border shadow-sm cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between h-48 relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.type === 'QUIZ' ? 'accent' : 'primary'}/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150`}></div>
                
                <div>
                  <div className={`w-12 h-12 bg-${item.type === 'QUIZ' ? 'accent' : 'primary'}/10 rounded-xl flex items-center justify-center mb-4 text-${item.type === 'QUIZ' ? 'accent' : 'primary'}`}>
                    {item.type === 'QUIZ' ? <HelpCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold font-heading line-clamp-2 relative z-10">{item.title}</h3>
                </div>
                
                <div className="flex justify-between items-end relative z-10">
                  <p className="text-sm text-muted-foreground font-medium">
                    {item.type === 'QUIZ' ? `${item.questionsCount} Soal • ${item.durationMin} Menit` : 'Modul PDF & Teks'}
                  </p>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'MODULE_VIEW' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <button onClick={() => setActiveTab('LIST')} className="text-muted-foreground hover:text-foreground font-bold flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar
          </button>
          <div className="bg-card p-10 rounded-3xl border-2 border-border shadow-sm min-h-[500px]">
            <h2 className="text-3xl font-black font-heading mb-8">{activeItem?.title}</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>Ini adalah area tempat konten modul ditampilkan. Guru dapat mengetikkan teks panjang di sini, menyisipkan gambar, atau menyematkan dokumen PDF.</p>
              <div className="w-full h-[400px] bg-muted/30 border-2 border-dashed border-border rounded-2xl flex items-center justify-center flex-col text-muted-foreground mt-8">
                <FileText className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-bold">Dokumen PDF Modul</p>
                <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold">Unduh PDF</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'QUIZ_PLAY' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-2xl border-2 border-border shadow-sm sticky top-4 z-50">
            <div>
              <h2 className="text-xl font-bold font-heading">{activeItem?.title}</h2>
              <p className="text-sm text-muted-foreground">Kerjakan dengan jujur dan teliti.</p>
            </div>
            <div className={`px-6 py-3 rounded-xl font-black text-2xl flex items-center gap-3 border-2 shadow-inner ${timeLeft < 300 ? 'bg-red-500/10 border-red-500 text-red-600 animate-pulse' : 'bg-muted/30 border-border'}`}>
              <Clock className="w-6 h-6" /> {formatTime(timeLeft)}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 bg-card p-8 rounded-3xl border-2 border-border shadow-sm min-h-[400px] flex flex-col justify-between">
              <div>
                <span className="bg-accent text-accent-foreground text-xs font-black px-3 py-1 rounded-full mb-4 inline-block">Soal No. {currentQuestion}</span>
                <h3 className="text-xl font-medium mb-8">Apa ibukota negara Indonesia saat ini?</h3>
                
                <div className="space-y-3">
                  {['Jakarta', 'Bandung', 'Surabaya', 'Nusantara'].map((opt, i) => (
                    <label key={i} className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-accent hover:bg-accent/5 cursor-pointer transition-colors group">
                      <input type="radio" name="answer" className="w-5 h-5 text-accent focus:ring-accent accent-accent" />
                      <span className="font-medium group-hover:font-bold">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-10 pt-6 border-t-2 border-border">
                <button 
                  disabled={currentQuestion === 1}
                  onClick={() => setCurrentQuestion(p => p - 1)} 
                  className="px-6 py-3 font-bold text-muted-foreground hover:bg-muted rounded-xl transition-colors disabled:opacity-30 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Sebelumnya
                </button>
                {currentQuestion < 20 ? (
                  <button 
                    onClick={() => setCurrentQuestion(p => p + 1)} 
                    className="px-6 py-3 font-bold bg-accent text-accent-foreground rounded-xl shadow-md hover:bg-accent/90 transition-all flex items-center gap-2"
                  >
                    Selanjutnya <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmitQuiz}
                    disabled={isSubmitting}
                    className="px-8 py-3 font-black bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? 'Memproses...' : 'Kumpulkan Kuis'} <CheckCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quiz Navigator Sidebar */}
            <div className="bg-card p-6 rounded-3xl border-2 border-border shadow-sm h-fit">
              <h4 className="font-bold mb-4 text-center">Navigasi Soal</h4>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentQuestion(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all border-2
                      ${currentQuestion === i + 1 
                        ? 'bg-accent text-accent-foreground border-accent shadow-md scale-110 z-10' 
                        : i === 0 ? 'bg-primary/20 border-primary/30 text-primary' /* mock answered */
                        : 'bg-background border-border text-muted-foreground hover:border-accent/50'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t-2 border-border flex flex-col gap-2 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary/20 border border-primary/30 rounded-sm"></div> Sudah Dijawab</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-background border border-border rounded-sm"></div> Belum Dijawab</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent rounded-sm"></div> Posisi Saat Ini</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
