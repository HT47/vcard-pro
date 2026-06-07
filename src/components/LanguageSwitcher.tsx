"use client";

import { useI18n } from "../context/I18nContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const RTL_CODES = new Set(["ar","fa","ku-badini","ku-hawrami","ckb"]);

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find(l => l.code === locale) || languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger — 28px pill */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(v => !v)}
        className="flex items-center gap-1.5 h-7 px-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all shadow-sm"
      >
        <img
          src={current.flag}
          alt={current.name}
          className="w-4 h-4 rounded-full object-cover flex-shrink-0"
          onError={(e) => { e.currentTarget.style.opacity = "0"; }}
        />
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="text-white/50 flex-shrink-0">
          <path d={isOpen ? "M7 4L4 1L1 4" : "M1 1L4 4L7 1"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-1.5 right-0 w-40 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-[9999]"
          >
            <div className="p-1 max-h-64 overflow-y-auto scrollbar-hide">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLocale(lang.code); setIsOpen(false); }}
                  dir={RTL_CODES.has(lang.code) ? "rtl" : "ltr"}
                  className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg transition-all text-left ${
                    locale === lang.code
                      ? "bg-white/12 text-white"
                      : "text-zinc-400 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <img
                    src={lang.flag}
                    alt=""
                    className="w-4 h-4 rounded-full object-cover flex-shrink-0"
                    onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                  />
                  <span className="text-[11px] font-medium flex-1 truncate leading-none">
                    {lang.name}
                  </span>
                  {locale === lang.code && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
