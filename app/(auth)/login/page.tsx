'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

// 1. Skema Validasi Pro Max
const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Logika NextAuth
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });
    
    if (result?.error) {
      alert("Email atau password salah");
    } else {
      window.location.href = "/dashboard/student"; // Default redirect
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
          <h1 className="text-3xl font-heading font-bold text-foreground">Selamat Datang</h1>
          <p className="text-muted-foreground mt-2 font-sans">Masuk untuk melanjutkan pembelajaran</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-sans">Email</label>
            <input 
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-4 focus:ring-ring/20 focus:border-ring outline-none transition-all font-sans"
              placeholder="nama@sekolah.com"
            />
            {errors.email && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-destructive font-sans">
                {errors.email.message}
              </motion.p>
            )}
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
            {isSubmitting ? 'Memproses...' : 'Masuk ke Sistem'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
