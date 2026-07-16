'use client';
import { Badge } from '@/components/ui/badge';

type Submission = {
  id: string;
  studentName: string;
  assignmentTitle: string;
  status: 'GRADED' | 'PENDING' | 'LATE';
  grade: number | null;
};

const MOCK_DATA: Submission[] = [
  { id: '1', studentName: 'Alfan', assignmentTitle: 'Logika Algoritma', status: 'GRADED', grade: 95 },
  { id: '2', studentName: 'Budi', assignmentTitle: 'Logika Algoritma', status: 'PENDING', grade: null },
];

export default function GradesTable() {
  return (
    <div className="w-full bg-card rounded-2xl shadow-md border-2 border-border overflow-hidden transition-all duration-300 hover:shadow-lg font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="bg-muted text-foreground border-b-2 border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Nama Siswa</th>
              <th className="px-6 py-4 font-medium">Tugas</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Nilai</th>
              <th className="px-6 py-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-border">
            {MOCK_DATA.map((row) => (
              <tr key={row.id} className="hover:bg-muted/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-foreground">{row.studentName}</td>
                <td className="px-6 py-4">{row.assignmentTitle}</td>
                <td className="px-6 py-4">
                  <Badge variant={row.status === 'GRADED' ? 'default' : row.status === 'PENDING' ? 'secondary' : 'destructive'}>
                    {row.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  {row.grade ? (
                    <span className="font-bold text-primary text-base">{row.grade}</span>
                  ) : (
                    <span className="text-muted-foreground italic">Belum dinilai</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-accent hover:text-accent/80 font-bold transition-all hover:translate-x-1 cursor-pointer">
                    Beri Nilai
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
