"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SuperAdminTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Pani" && password === "555666") {
      setIsOpen(false);
      setUsername("");
      setPassword("");
      setError("");
      router.push("/super-admin");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-0 left-0 w-8 h-8 opacity-0 hover:opacity-10 cursor-pointer z-[9999] bg-white transition-opacity"
        title="Secret Admin Access"
        aria-label="Admin Access"
      />

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-center text-primary mb-6 font-heading">
              Super Admin Access
            </h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username..."
                  className="w-full border-2 focus-visible:ring-primary/50"
                  autoFocus
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password / Kode</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password/kode..."
                  className="w-full border-2 focus-visible:ring-primary/50"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setError("");
                  }}
                  className="w-full border-2 hover:bg-slate-50"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="w-full shadow-lg hover:shadow-xl transition-all"
                >
                  Akses
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
