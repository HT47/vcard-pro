"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const { t, isRTL } = useI18n();
  const router = useRouter();
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

    const { data, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user?.identities?.length === 0) {
      setError(t("account_exists") || "Un compte existe déjà avec cet email.");
      setLoading(false);
      return;
    }

    setLoading(false);
    
    // If auto-sign-in works (email confirmation is disabled in Supabase), redirect to dashboard
    if (data.session) {
      router.push("/dashboard");
    } else {
      setSuccess(t("register_success_email") || "Inscription réussie ! Veuillez vérifier votre boîte mail pour confirmer votre compte.");
    }
  };

        const getErrorMessage = (msg: string) => {
          if (msg.toLowerCase().includes("user already registered")) {
            return t("error_user_exists") || "Un compte existe déjà avec cet email.";
          }
          return msg;
        };

        return (
          <div className={`flex min-h-screen items-center justify-center bg-[#050505] text-white p-4 ${isRTL ? "rtl" : ""}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              {/* Glow effects */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500/30 blur-xl" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-1 text-center tracking-tight">{t("register_title") || "Créer votre vCard Pro"}</h1>
              <p className="text-zinc-400 text-sm mb-8 text-center">{t("register_subtitle") || "Votre carte digitale en 2 minutes"}</p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
                  {getErrorMessage(error)}
                </div>
              )}

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center space-y-4"
          >
            <CheckCircle2 size={32} className="mx-auto" />
            <p>{success}</p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="block w-full mt-2 px-4 py-2 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors"
            >
              Aller à l'application
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                placeholder="vous@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">{t("password") || "Mot de passe"}</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (t("create_button") || "Créer ma vCard Pro ⚡")}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>{t("already_account") || "Déjà un compte ?"} <a href="/login" className="text-white hover:underline font-semibold">{t("login_action") || "Se connecter"}</a></p>
        </div>
      </motion.div>
    </div>
  );
}
