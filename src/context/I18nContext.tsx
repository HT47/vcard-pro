"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Static imports to fix Webpack/Turbopack dynamic loading issues
import fr from "../i18n/locales/fr.json";
import en from "../i18n/locales/en.json";
import ar from "../i18n/locales/ar.json";
import fa from "../i18n/locales/fa.json";
import kuBadini from "../i18n/locales/ku-badini.json";
import kuHawrami from "../i18n/locales/ku-hawrami.json";
import ckb from "../i18n/locales/ckb.json";
import ku from "../i18n/locales/ku.json";
import es from "../i18n/locales/es.json";
import de from "../i18n/locales/de.json";
import it from "../i18n/locales/it.json";
import sv from "../i18n/locales/sv.json";
import no from "../i18n/locales/no.json";
import ru from "../i18n/locales/ru.json";
import tr from "../i18n/locales/tr.json";
import zh from "../i18n/locales/zh.json";

const dictionaries: Record<string, Record<string, string>> = {
  fr,
  en,
  ar,
  fa,
  "ku-badini": kuBadini,
  "ku-hawrami": kuHawrami,
  ckb,
  ku,
  es,
  de,
  it,
  sv,
  no,
  ru,
  tr,
  zh,
};

type Translations = Record<string, string>;

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  translations: Translations;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// RTL Languages
const rtlLocales = ["ar", "fa", "ku-badini", "ku-hawrami", "ckb"];

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState("fr");
  const [translations, setTranslations] = useState<Translations>(fr);

  useEffect(() => {
    // Load saved locale from localStorage if available
    const savedLocale = localStorage.getItem("vcard-locale");
    if (savedLocale && dictionaries[savedLocale]) {
      setLocale(savedLocale);
      setTranslations(dictionaries[savedLocale]);
    }
  }, []);

  useEffect(() => {
    // Use the statically imported dictionary
    if (dictionaries[locale]) {
      setTranslations(dictionaries[locale]);
    }

    // Set RTL direction
    const isRtl = rtlLocales.includes(locale);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = locale;

    // Save to localStorage
    localStorage.setItem("vcard-locale", locale);
  }, [locale]);

  // t() reads from latest translations synchronously
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const isRTL = rtlLocales.includes(locale);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translations, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
