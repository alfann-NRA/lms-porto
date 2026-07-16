import Sidebar from '@/components/layouts/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted font-sans">
      <Sidebar role="TEACHER" />
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-card border-b-2 border-border flex items-center px-8 shadow-sm">
          <h2 className="text-xl font-heading font-bold text-foreground">Teacher Dashboard</h2>
          <div className="ml-auto flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md">
              T
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
