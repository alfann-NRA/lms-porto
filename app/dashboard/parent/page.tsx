import ProgressChart from '@/components/parent/ProgressChart';

export default function ParentDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Dashboard Orang Tua</h1>
          <p className="text-muted-foreground mt-2 text-lg">Pantau perkembangan nilai dan aktivitas anak Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/10 border-2 border-primary/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-heading font-bold text-primary mb-2">95</span>
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Rata-rata Nilai</span>
        </div>
        <div className="bg-accent/10 border-2 border-accent/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-heading font-bold text-accent mb-2">100%</span>
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Tingkat Kehadiran</span>
        </div>
        <div className="bg-green-500/10 border-2 border-green-500/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-heading font-bold text-green-600 mb-2">4</span>
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Tugas Selesai (Minggu Ini)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProgressChart />
        
        <div className="bg-card p-6 rounded-2xl border-2 border-border shadow-sm">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 border-2 border-transparent hover:border-border transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">{i}</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Tugas Biologi Diserahkan</h4>
                  <p className="text-sm text-muted-foreground mt-1">Anak Anda telah mengumpulkan tugas "Sistem Pencernaan" tepat waktu.</p>
                  <span className="text-xs font-bold text-accent mt-2 inline-block">2 jam yang lalu</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
