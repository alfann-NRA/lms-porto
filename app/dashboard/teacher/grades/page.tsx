'use client';
import { useState } from 'react';
import { Search, Download, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for Gradebook
const STUDENTS = [
  { id: '1', name: 'Alfan Nur' },
  { id: '2', name: 'Budi Santoso' },
  { id: '3', name: 'Citra Kirana' },
  { id: '4', name: 'Deni Pratama' },
];

const COLUMNS = [
  { id: 't1', title: 'Tugas 1: Esai', type: 'ASSIGNMENT', max: 100 },
  { id: 't2', title: 'Tugas 2: Matriks', type: 'ASSIGNMENT', max: 100 },
  { id: 'q1', title: 'Kuis UTS', type: 'QUIZ', max: 100 },
];

const GRADES: any = {
  '1': { 't1': 85, 't2': 90, 'q1': 88 },
  '2': { 't1': 70, 't2': null, 'q1': 65 },
  '3': { 't1': 95, 't2': 95, 'q1': 100 },
  '4': { 't1': null, 't2': 80, 'q1': 75 },
};

export default function GradebookPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-heading font-black text-foreground tracking-tight">Buku Nilai (Gradebook)</h1>
          <p className="text-muted-foreground mt-2 text-lg">Rekapitulasi seluruh nilai tugas dan kuis siswa secara terpadu.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-xl transition-all shadow-[0_4px_0_0_rgb(13,148,136)] hover:shadow-[0_2px_0_0_rgb(13,148,136)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Ekspor CSV
        </button>
      </div>

      <div className="bg-card p-6 rounded-3xl border-2 border-border shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 bg-background border-2 border-border rounded-xl w-full max-w-sm mb-6">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari nama siswa..." 
            className="bg-transparent border-none outline-none w-full font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border-2 border-border">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-muted/50 border-b-2 border-border">
                <th className="p-4 font-bold text-foreground w-64 border-r-2 border-border sticky left-0 bg-muted/95 backdrop-blur z-10">Nama Siswa</th>
                {COLUMNS.map(col => (
                  <th key={col.id} className="p-4 font-bold text-foreground text-center border-r-2 border-border last:border-r-0 min-w-[150px]">
                    <div className="text-sm text-muted-foreground mb-1">{col.type === 'QUIZ' ? '🏆 Kuis CBT' : '📝 Tugas'}</div>
                    {col.title}
                  </th>
                ))}
                <th className="p-4 font-black text-primary text-center bg-primary/5 min-w-[120px]">Rata-rata</th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student, idx) => {
                const studentGrades = GRADES[student.id];
                let total = 0;
                let count = 0;
                COLUMNS.forEach(col => {
                  if (studentGrades[col.id] !== null && studentGrades[col.id] !== undefined) {
                    total += studentGrades[col.id];
                    count++;
                  }
                });
                const avg = count > 0 ? (total / count).toFixed(1) : '-';

                return (
                  <motion.tr 
                    key={student.id} 
                    className="border-b border-border hover:bg-muted/30 transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="p-4 font-bold text-foreground border-r-2 border-border sticky left-0 bg-card group-hover:bg-muted/30 transition-colors z-10">
                      {student.name}
                    </td>
                    {COLUMNS.map(col => {
                      const score = studentGrades[col.id];
                      return (
                        <td key={col.id} className="p-4 text-center border-r-2 border-border last:border-r-0">
                          {score !== null ? (
                            <span className={`font-bold ${score >= 80 ? 'text-green-600' : score < 70 ? 'text-red-500' : 'text-foreground'}`}>
                              {score}
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded-md">
                              Kosong
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-4 text-center font-black text-primary bg-primary/5">
                      {avg}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
