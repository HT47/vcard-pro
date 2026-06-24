"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import { Globe, Moon, Bell, Shield, LogOut, ArrowLeft, Trash2, ChevronRight, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const KURDISH_FLAG = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Kurdistan.svg/40px-Flag_of_Kurdistan.svg.png";
const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code}.png`;

const languages = [
  { code: "fr",         name: "Français",    flag: getFlagUrl("fr") },
  { code: "en",         name: "English",     flag: getFlagUrl("gb") },
  { code: "ar",         name: "العربية",     flag: getFlagUrl("sa") },
  { code: "fa",         name: "فارسی",       flag: getFlagUrl("ir") },
  { code: "ku-badini",  name: "بادینی",      flag: KURDISH_FLAG },
  { code: "ku-hawrami", name: "هەورامانی",   flag: KURDISH_FLAG },
  { code: "ckb",        name: "سۆرانی",      flag: KURDISH_FLAG },
  { code: "ku",         name: "Kurmancî",    flag: KURDISH_FLAG },
  { code: "es",         name: "Español",     flag: getFlagUrl("es") },
  { code: "de",         name: "Deutsch",     flag: getFlagUrl("de") },
  { code: "it",         name: "Italiano",    flag: getFlagUrl("it") },
  { code: "sv",         name: "Svenska",     flag: getFlagUrl("se") },
  { code: "no",         name: "Norsk",       flag: getFlagUrl("no") },
  { code: "ru",         name: "Русский",     flag: getFlagUrl("ru") },
  { code: "tr",         name: "Türkçe",      flag: getFlagUrl("tr") },
  { code: "zh",         name: "中文",        flag: getFlagUrl("cn") },
];

export default function SettingsPage() {
  const { t, isRTL, locale, setLocale } = useI18n();
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

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

  const currentLanguage = languages.find(l => l.code === locale) || languages[0];

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
              <Link href="/demo" className="block w-full">
                <SettingItem icon={User} label={t('my_profile') || 'Mon Profil'} />
              </Link>
              <SettingItem
                icon={Globe}
                label={t('language') || 'Langue'}
                value={currentLanguage.name}
                onClick={() => setShowLanguageModal(true)}
              />
              <SettingItem icon={Moon} label={t('theme') || 'Thème'} value={t('theme_dark') || "Sombre"} />
              <SettingItem icon={Bell} label={t('notifications') || "Notifications"} />
              <SettingItem icon={Shield} label={t('security') || "Sécurité"} />
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

      {/* Language Selector Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLanguageModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-zinc-950 border border-white/10 rounded-3xl p-6 z-[60] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-lg font-bold">{t('language') || 'Langue'}</h3>
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto pr-1 space-y-1 select-none flex-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setShowLanguageModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      locale === lang.code
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={lang.flag}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                        onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                      />
                      <span className="text-sm font-medium">{lang.name}</span>
                    </div>
                    {locale === lang.code && (
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
