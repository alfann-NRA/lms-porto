'use client';
import { useState } from 'react';
import RichTextEditor from '@/components/teacher/RichTextEditor';

export default function CreateAssignmentPage() {
  const [content, setContent] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Buat Tugas Baru</h1>
        <p className="text-muted-foreground mt-2 text-lg">Gunakan editor di bawah untuk menulis instruksi tugas.</p>
      </div>

      <div className="bg-card p-8 rounded-3xl border-2 border-border shadow-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Judul Tugas</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:ring-4 focus:ring-ring/20 focus:border-ring outline-none transition-all font-sans"
              placeholder="Contoh: Esai Sejarah Kemerdekaan"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Instruksi Tugas</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <button 
            type="button"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all hover:-translate-y-1 shadow-md active:translate-y-0 text-lg"
          >
            Terbitkan Tugas
          </button>
        </form>
      </div>
    </div>
  );
}
