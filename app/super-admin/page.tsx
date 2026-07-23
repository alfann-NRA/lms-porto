import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuperAdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col">
      <header className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary font-heading">
            Super Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back, Pani. You have access to all monitoring features.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline" className="border-2">
            Kembali ke Beranda
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {/* Card 1: Monitoring Pengguna */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 font-heading mb-2">Monitoring Pengguna</h2>
          <p className="text-slate-500 text-sm mb-4">
            Pantau semua aktivitas pengguna, guru, dan siswa di platform.
          </p>
          <Button variant="secondary" className="w-full">Lihat Detail</Button>
        </div>

        {/* Card 2: Monitoring Keuangan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 font-heading mb-2">Sistem Keuangan</h2>
          <p className="text-slate-500 text-sm mb-4">
            Akses log transaksi, laporan pendapatan, dan pengeluaran.
          </p>
          <Button variant="secondary" className="w-full">Lihat Detail</Button>
        </div>

        {/* Card 3: Manajemen Sistem */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 font-heading mb-2">Manajemen Sistem</h2>
          <p className="text-slate-500 text-sm mb-4">
            Konfigurasi aplikasi, keamanan, backup data, dan integrasi API.
          </p>
          <Button variant="secondary" className="w-full">Lihat Detail</Button>
        </div>
      </div>
    </div>
  );
}
