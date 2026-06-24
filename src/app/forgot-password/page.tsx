"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const { t, isRTL } = useI18n();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Ensure we point the reset email to the /reset-password route
    const resetUrl = `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetUrl,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500/30 blur-xl"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="mb-6">
          <a href="/login" className="inline-flex items-center text-xs text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={14} className={isRTL ? "ml-1 rotate-180" : "mr-1"} />
            {t("back_to_login") || "Retour à la connexion"}
          </a>
        </div>

        <h1 className="text-2xl font-bold mb-2 tracking-tight">{t("forgot_password") || "Mot de passe oublié ?"}</h1>
        <p className="text-zinc-400 text-sm mb-8">{t("forgot_password_desc") || "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe."}</p>
        
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
            <p>{t("reset_link_sent") || "Lien de réinitialisation envoyé ! Vérifiez votre boîte mail."}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
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
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                t("send_reset_link") || "Envoyer le lien"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
