"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";

export default function Login() {
  const { t, isRTL } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResendSuccess(false);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) return;
    setResending(true);
    setError(null);
    setResendSuccess(false);
    
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });
    
    setResending(false);
    if (error) {
      setError(error.message);
    } else {
      setResendSuccess(true);
    }
  };

  const getErrorMessage = (msg: string) => {
    if (msg.toLowerCase().includes("email not confirmed")) {
      return t("error_email_not_confirmed") || "Email non confirmé. Veuillez vérifier votre boîte mail.";
    }
    if (msg.toLowerCase().includes("invalid login credentials")) {
      return t("error_invalid_credentials") || "Identifiants de connexion invalides.";
    }
    return msg;
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
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

        <h1 className="text-3xl font-bold mb-2 text-center tracking-tight">{t("login_title") || "Connexion"}</h1>
        <p className="text-zinc-400 text-sm mb-8 text-center">{t("login_subtitle") || "Gérez votre vCard Premium"}</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
            <div>{getErrorMessage(error)}</div>
            {error.toLowerCase().includes("email not confirmed") && (
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={resending}
                className="mt-2 text-xs font-semibold text-white underline hover:text-zinc-300 focus:outline-none disabled:opacity-50"
              >
                {resending ? t("resending") || "Renvoi..." : t("resend_confirmation") || "Renvoyer le lien de confirmation"}
              </button>
            )}
          </div>
        )}

        {resendSuccess && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center">
            {t("resend_success") || "Lien de confirmation renvoyé ! Veuillez vérifier vos e-mails."}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> : t("login_button") || "Se connecter"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-500">
          <p>{t("no_account") || "Pas encore de compte ?"} <a href="/register" className="text-white hover:underline">{t("register_link") || "Créer une vCard"}</a></p>
        </div>
      </motion.div>
    </div>
  );
}
