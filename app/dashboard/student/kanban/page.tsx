import KanbanBoard from '@/components/student/KanbanBoard';
import FileUpload from '@/components/student/FileUpload';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Dashboard Siswa</h1>
          <p className="text-muted-foreground mt-2 text-lg">Kelola tugas dan progres belajar Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Papan Kanban Tugas</h2>
          <div className="h-[600px]">
            <KanbanBoard />
          </div>
        </section>

        <section className="bg-card p-6 rounded-2xl border-2 border-border shadow-sm">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Unggah Tugas</h2>
          <FileUpload />
        </section>
      </div>
    </div>
  );
}
