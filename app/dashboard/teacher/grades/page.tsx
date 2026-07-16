import GradesTable from '@/components/teacher/GradesTable';

export default function GradesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Penilaian</h1>
        <p className="text-muted-foreground mt-2 font-sans text-lg">Kelola nilai dan tugas murid dengan mudah.</p>
      </div>

      <GradesTable />
    </div>
  );
}
