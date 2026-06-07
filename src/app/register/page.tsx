"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";

export default function Register() {
  const { t, isRTL } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
    } else {
      if (data.user?.identities?.length === 0) {
        setError(t("account_exists") || "Un compte existe déjà avec cet email.");
      } else {
        setSuccess(t("register_success") || "Inscription réussie ! Vérifiez vos emails pour confirmer votre compte.");
      }
    }
  };

  return (
    <div className={`flex h-screen items-center justify-center bg-[#050505] text-white ${isRTL ? 'rtl:dir-rtl' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl max-w-sm w-full shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 blur-xl"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

        <h1 className="text-3xl font-bold mb-2 text-center tracking-tight">{t("register_title") || "Créer un compte"}</h1>
        <p className="text-zinc-400 text-sm mb-8 text-center">{t("register_subtitle") || "Votre vCard Pro en 2 minutes"}</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
            {error}
          </div>
        )}
        
        {success ? (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm text-center">
            {success}
            <a href="/login" className="block mt-4 text-white font-bold hover:underline">
              {t("go_to_login") || "Aller à la connexion"}
            </a>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">{t("email") || "Email"}</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">{t("password") || "Mot de passe"}</label>
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
              className="w-full py-3 mt-4 bg-white text-black rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> : t("register_button") || "S'inscrire"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-xs text-zinc-500">
          <p>{t("has_account") || "Déjà un compte ?"} <a href="/login" className="text-white hover:underline">{t("login_link") || "Se connecter"}</a></p>
        </div>
      </motion.div>
    </div>
  );
}
