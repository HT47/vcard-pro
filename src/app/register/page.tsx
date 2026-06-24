"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import { checkUsernameAvailable, isValidUsername } from "@/lib/auth";
import { CheckCircle2, XCircle, Loader2, AtSign } from "lucide-react";

export default function Register() {
  const { t, isRTL } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Debounced username check
  useEffect(() => {
    if (!username) { setUsernameStatus("idle"); return; }
    if (!isValidUsername(username)) { setUsernameStatus("invalid"); return; }

    setUsernameStatus("checking");
    const timer = setTimeout(async () => {
      const available = await checkUsernameAvailable(username);
      setUsernameStatus(available ? "available" : "taken");
    }, 600);
    return () => clearTimeout(timer);
  }, [username]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameStatus !== "available") return;
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

    // Create profile with username
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: username.toLowerCase(),
        display_name: email.split("@")[0],
      });

      if (profileError) {
        setError((t("profile_creation_error") || "Erreur création profil : ") + profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSuccess((t("register_success") || "Inscription réussie ! Bienvenue @{username}. Vérifiez vos emails pour confirmer votre compte.").replace("{username}", username));
  };

  const UsernameIcon = () => {
    if (usernameStatus === "checking") return <Loader2 size={16} className="text-zinc-400 animate-spin" />;
    if (usernameStatus === "available") return <CheckCircle2 size={16} className="text-emerald-400" />;
    if (usernameStatus === "taken") return <XCircle size={16} className="text-red-400" />;
    if (usernameStatus === "invalid") return <XCircle size={16} className="text-orange-400" />;
    return null;
  };

  const usernameHint = () => {
    if (usernameStatus === "available") return <span className="text-emerald-400">{(t("username_available") || "@{username} est disponible ✓").replace("{username}", username)}</span>;
    if (usernameStatus === "taken") return <span className="text-red-400">{t("username_taken") || "Ce nom est déjà pris"}</span>;
    if (usernameStatus === "invalid") return <span className="text-orange-400">{t("username_invalid") || "3-20 caractères, lettres minuscules, chiffres, _ ou -"}</span>;
    return <span className="text-zinc-600">{t("url_preview") || "Votre URL sera : "}<strong className="text-zinc-400">{(process.env.NEXT_PUBLIC_APP_URL || 'tegere.com').replace('https://', '')}/u/</strong><strong className="text-white">{username || "votre-nom"}</strong></span>;
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
            <p>{success}</p>
            <a href="/login" className="block mt-2 px-4 py-2 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors">
              {t("login_action") || "Se connecter"}
            </a>
          </motion.div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                {t("unique_id") || "Votre identifiant unique *"}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <AtSign size={15} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className={`w-full bg-white/5 border rounded-xl pl-9 pr-10 py-3 text-sm focus:outline-none transition-all ${
                    usernameStatus === "available" ? "border-emerald-500/50 focus:border-emerald-500" :
                    usernameStatus === "taken" ? "border-red-500/50 focus:border-red-500" :
                    usernameStatus === "invalid" ? "border-orange-500/50 focus:border-orange-500" :
                    "border-white/10 focus:border-white/30 focus:bg-white/10"
                  }`}
                  placeholder="alexdubois"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <UsernameIcon />
                </div>
              </div>
              <p className="mt-1.5 text-[11px] ml-1">{usernameHint()}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                placeholder="you@example.com"
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
              disabled={loading || usernameStatus !== "available"}
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
