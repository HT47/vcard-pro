"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const { t, isRTL } = useI18n();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated with a recovery token
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Redirect to login if no session is found
        router.push("/login");
      }
    });
  }, [router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  };

  return (
    <div className={`flex h-screen items-center justify-center bg-[#050505] text-white ${isRTL ? 'rtl' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl max-w-sm w-full shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500/30 blur-xl"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <h1 className="text-2xl font-bold mb-2 tracking-tight">{t("reset_password") || "Nouveau mot de passe"}</h1>
        <p className="text-zinc-400 text-sm mb-8">{t("reset_password_desc") || "Entrez votre nouveau mot de passe ci-dessous."}</p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center space-y-4"
          >
            <CheckCircle2 size={32} className="mx-auto" />
            <p>{t("password_updated") || "Mot de passe mis à jour avec succès !"}</p>
            <p className="text-xs text-zinc-500">Redirection...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">{t("new_password") || "Nouveau mot de passe"}</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-emerald-500/20"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                t("update_password") || "Mettre à jour"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
