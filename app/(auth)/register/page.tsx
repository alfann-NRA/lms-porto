'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
  role: z.enum(["STUDENT", "TEACHER"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'STUDENT' }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || 'Terjadi kesalahan saat pendaftaran');
      }
      
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="max-w-md w-full bg-card rounded-2xl shadow-xl border border-border p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Daftar Akun Baru</h1>
          <p className="text-muted-foreground mt-2 font-sans">Bergabung ke LMS Pro sekarang</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-xl text-sm font-sans font-medium text-center border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-sans">Nama Lengkap</label>
            <input 
              type="text"
              {...register('name')}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-4 focus:ring-ring/20 focus:border-ring outline-none transition-all font-sans"
              placeholder="Budi Santoso"
            />
            {errors.name && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-destructive font-sans">
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-sans">Email</label>
            <input 
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-4 focus:ring-ring/20 focus:border-ring outline-none transition-all font-sans"
              placeholder="budi@sekolah.com"
            />
            {errors.email && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-destructive font-sans">
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-sans">Peran Anda</label>
            <select
              {...register('role')}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-4 focus:ring-ring/20 focus:border-ring outline-none transition-all font-sans appearance-none"
            >
              <option value="STUDENT">Siswa</option>
              <option value="TEACHER">Guru</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-sans">Password</label>
            <input 
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-4 focus:ring-ring/20 focus:border-ring outline-none transition-all font-sans"
              placeholder="••••••••"
            />
            {errors.password && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-destructive font-sans">
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md active:translate-y-0 font-sans"
          >
            {isSubmitting ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground font-sans">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-primary hover:underline font-bold transition-all">
            Masuk di sini
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
