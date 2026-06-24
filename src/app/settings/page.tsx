"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { Globe, Moon, Bell, Shield, LogOut, ArrowLeft, Trash2, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const { t, isRTL, language, setLanguage } = useI18n();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      t('delete_account_confirm') || "Supprimer définitivement votre compte ? Cette action est irréversible."
    );
    if (!confirmed) return;
    alert(t('delete_account_contact') || "Contactez le support pour supprimer votre compte.");
  };

  const SettingItem = ({ icon: Icon, label, value, onClick, danger = false }: {
    icon: React.ElementType;
    label: string;
    value?: string;
    onClick?: () => void;
    danger?: boolean;
  }) => (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all ${danger ? 'text-red-400 hover:text-red-300 border-red-500/20 bg-red-500/5' : 'text-zinc-200'}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={danger ? "text-red-400" : "text-zinc-400"} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-500">
        {value && <span className="text-xs">{value}</span>}
        <ChevronRight size={16} className={isRTL ? "rotate-180" : ""} />
      </div>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans relative overflow-hidden flex flex-col items-center" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 relative">
        <header className="flex items-center justify-between mb-10">
          <Link href="/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
            <ArrowLeft size={20} className={isRTL ? "rotate-180" : ""} />
          </Link>
          <h1 className="text-xl font-bold tracking-wider">{t('settings') || 'Paramètres'}</h1>
          <div className="w-9" />
        </header>

        <div className="space-y-6">
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest pl-2">{t('account_settings') || 'Compte'}</h3>
            <div className="space-y-2">
              <Link href="/profile" className="block w-full">
                <SettingItem icon={User} label={t('my_profile') || 'Mon Profil'} />
              </Link>
              <SettingItem
                icon={Globe}
                label={t('language') || 'Langue'}
                value={language.toUpperCase()}
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              />
              <SettingItem icon={Moon} label={t('theme') || 'Thème'} value="Dark" />
              <SettingItem icon={Bell} label="Notifications" />
              <SettingItem icon={Shield} label="Sécurité" />
            </div>
          </section>

          <section className="space-y-3 pt-6">
            <h3 className="text-xs font-semibold text-red-500/70 uppercase tracking-widest pl-2">{t('danger_zone') || 'Zone de danger'}</h3>
            <div className="space-y-2">
              <SettingItem icon={LogOut} label={t('logout') || 'Déconnexion'} onClick={handleLogout} />
              <SettingItem icon={Trash2} label={t('delete_account') || 'Supprimer le compte'} onClick={handleDeleteAccount} danger />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
