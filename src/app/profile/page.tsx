"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { User, Mail, Briefcase, Building, FileText, Camera, ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { t, isRTL } = useI18n();
  const { user, profile, loading, refetchProfile } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (profile) {
      setFormData({
        display_name: profile.display_name || "",
        bio: profile.bio || "",
      });
    }
  }, [user, profile, loading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSuccess(false);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: formData.display_name,
        bio: formData.bio,
      })
      .eq("id", user.id);

    setSaving(false);
    if (!error) {
      setSuccess(true);
      refetchProfile?.();
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert("Erreur : " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans relative overflow-hidden flex flex-col items-center" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 relative">
        <header className="flex items-center justify-between mb-10">
          <Link href="/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
            <ArrowLeft size={20} className={isRTL ? "rotate-180" : ""} />
          </Link>
          <h1 className="text-xl font-bold tracking-wider">{t('my_profile') || 'Mon Profil'}</h1>
          <div className="w-9" />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl relative"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8 relative">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-white/50" />
                  )}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white text-black rounded-full shadow-lg hover:scale-105 transition-transform">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="mt-4 text-lg font-semibold">{profile?.display_name || profile?.username}</h2>
            <p className="text-sm text-zinc-400">@{profile?.username}</p>
            <p className="text-xs text-zinc-600 mt-1">{user?.email}</p>
          </div>

          {success && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center">
              ✓ Profil mis à jour !
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            {/* Username (readonly) */}
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium ml-1 uppercase tracking-wider">Identifiant (non modifiable)</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input
                  type="text"
                  value={profile?.username || ""}
                  readOnly
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Display Name */}
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium ml-1 uppercase tracking-wider">{t('name') || 'Nom affiché'}</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  placeholder="Jean Dupont"
                />
              </div>
            </div>

            {/* Email (readonly) */}
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium ml-1 uppercase tracking-wider">Email (non modifiable)</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium ml-1 uppercase tracking-wider">{t('bio') || 'Bio'}</label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-3 text-zinc-500" />
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                  placeholder="Une courte description de vous..."
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
              className="w-full mt-6 bg-white text-black py-3 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  {t('save_changes') || 'Enregistrer'}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
