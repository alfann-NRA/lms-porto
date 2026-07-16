'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, CheckSquare, BarChart, Users, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MENU_CONFIG = {
  TEACHER: [
    { name: 'Dashboard', path: '/dashboard/teacher', icon: BarChart },
    { name: 'Manajemen Kelas', path: '/dashboard/teacher/classes', icon: Users },
    { name: 'Penilaian', path: '/dashboard/teacher/grades', icon: CheckSquare },
  ],
  STUDENT: [
    { name: 'Dashboard', path: '/dashboard/student', icon: BarChart },
    { name: 'Tugas Saya', path: '/dashboard/student/assignments', icon: BookOpen },
    { name: 'Kanban Board', path: '/dashboard/student/kanban', icon: CheckSquare },
  ],
  PARENT: [
    { name: 'Pantau Anak', path: '/dashboard/parent', icon: Users },
  ],
};

export default function Sidebar({ role }: { role: 'TEACHER' | 'STUDENT' | 'PARENT' }) {
  const pathname = usePathname();
  const menus = MENU_CONFIG[role] || [];

  return (
  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-colors duration-300">
      <div className="h-20 flex items-center px-6 border-b border-sidebar-border">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold mr-3 shadow-md">
          L
        </div>
        <span className="text-2xl font-bold font-heading text-sidebar-foreground">LMS Pro</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menus.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path} className="relative block group">
              <span className={cn(
                "relative z-10 flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 font-sans",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-1"
              )}>
                <Icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="active-nav-item"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
