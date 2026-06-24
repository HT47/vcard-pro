"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, Settings, LogOut, Copy, CheckCircle2,
  ExternalLink, PlusCircle, Trash2, Eye, QrCode, Share2, User
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

interface VCard {
  id: string;
  slug: string;
  data: { name?: string; role?: string; layout?: string };
  created_at: string;
  is_primary: boolean;
}

export default function Dashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const [vcards, setVcards] = useState<VCard[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
      return;
    }
    if (user) fetchVcards();
  }, [user, loading]);

  const fetchVcards = async () => {
    const { data } = await supabase
      .from("vcards")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    setVcards(data || []);
    setLoadingCards(false);
  };

  const deleteVcard = async (id: string) => {
    await supabase.from("vcards").delete().eq("id", id);
    setVcards(prev => prev.filter(v => v.id !== id));
  };

  const setPrimary = async (id: string) => {
    // Unset all primary for user
    await supabase.from("vcards").update({ is_primary: false }).eq("user_id", user!.id);
    // Set new primary
    await supabase.from("vcards").update({ is_primary: true }).eq("id", id);
    setVcards(prev => prev.map(v => ({ ...v, is_primary: v.id === id })));
  };

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const publicUrl = profile ? `${APP_URL}/u/${profile.username}` : "";

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !profile) return null;

  const primaryCard = vcards.find(v => v.is_primary);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/20">
            V
          </div>
          <span className="font-bold text-sm tracking-tight">VCard Pro</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/settings" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors" title="Paramètres">
            <Settings size={18} className="text-zinc-400" />
          </Link>
          <button onClick={signOut} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-zinc-400 hover:text-red-400" title="Déconnexion">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* Profile Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-xl p-6 md:p-8"
        >
          {/* Background gradient orbs */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-2xl shadow-blue-500/30 overflow-hidden flex-shrink-0">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={36} className="text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold truncate">{profile.display_name || profile.username}</h1>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">PRO</span>
              </div>
              <p className="text-zinc-400 text-sm mb-1">@{profile.username}</p>
              {profile.bio && <p className="text-zinc-500 text-sm truncate">{profile.bio}</p>}
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto flex-shrink-0">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap"
              >
                <PlusCircle size={16} />
                Éditer ma vCard
              </Link>
              <Link
                href="/settings"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Settings size={16} />
                Paramètres
              </Link>
            </div>
          </div>

          {/* Public URL Block */}
          <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">Votre lien public</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-sm text-white font-mono truncate">{publicUrl}</span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={copyUrl}
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-all"
                >
                  {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  {copied ? "Copié !" : "Copier"}
                </button>
                <button
                  onClick={() => setShowQR(true)}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="QR Code"
                >
                  <QrCode size={18} />
                </button>
                <a
                  href={`/u/${profile.username}`}
                  target="_blank"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Voir mon profil"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* VCards List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Mes vCards</h2>
            <span className="text-xs text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {vcards.length} vCard{vcards.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loadingCards ? (
            <div className="flex justify-center py-16">
              <div className="w-7 h-7 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : vcards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 border border-dashed border-white/10 rounded-2xl"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard size={28} className="text-zinc-500" />
              </div>
              <p className="text-zinc-400 font-semibold mb-2">Aucune vCard publiée</p>
              <p className="text-zinc-600 text-sm mb-6">Créez et publiez votre première carte digitale</p>
              <Link href="/demo" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors">
                <PlusCircle size={16} />
                Créer ma vCard
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-3">
              {vcards.map((vcard, idx) => (
                <motion.div
                  key={vcard.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    vcard.is_primary
                      ? "bg-blue-600/10 border-blue-500/30"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Template color dot */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-zinc-300 uppercase">
                      {(vcard.data?.layout || "vc").slice(0, 2)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm truncate">{vcard.data?.name || "Sans titre"}</p>
                      {vcard.is_primary && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded-full border border-blue-500/20 flex-shrink-0">
                          PRINCIPALE
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs truncate">{vcard.data?.role || "—"} · {vcard.data?.layout || "classic"}</p>
                    <p className="text-zinc-600 text-[11px] mt-0.5">/v/{vcard.slug}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!vcard.is_primary && (
                      <button
                        onClick={() => setPrimary(vcard.id)}
                        className="px-3 py-1.5 text-[11px] font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white whitespace-nowrap"
                        title="Définir comme principale"
                      >
                        Principale
                      </button>
                    )}
                    <a
                      href={`/v/${vcard.slug}`}
                      target="_blank"
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white"
                    >
                      <Eye size={16} />
                    </a>
                    <button
                      onClick={() => deleteVcard(vcard.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl transition-colors text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowQR(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] border border-white/10 rounded-3xl p-8 z-[60] flex flex-col items-center gap-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold">QR Code de votre profil</h3>
              <div className="p-5 bg-white rounded-2xl shadow-xl">
                <QRCodeSVG value={publicUrl} size={200} fgColor="#000" bgColor="#fff" level="Q" />
              </div>
              <p className="text-zinc-500 text-xs">{publicUrl}</p>
              <div className="flex gap-3 w-full">
                <button onClick={copyUrl} className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                  {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  {copied ? "Copié !" : "Copier le lien"}
                </button>
                <button
                  onClick={() => navigator.share?.({ title: `@${profile.username}`, url: publicUrl })}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                >
                  <Share2 size={16} />
                  Partager
                </button>
              </div>
              <button onClick={() => setShowQR(false)} className="text-zinc-500 text-sm hover:text-white transition-colors">Fermer</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
