"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { QrCode, Zap, Share2, Download, Palette, Globe, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LandingPage() {
  const { t, isRTL } = useI18n();

  const localizedFeatures = [
    { icon: Palette, label: t("templates") || "Modèles Premium", desc: t("feature_desc_templates") || "Des designs créés pour convertir. Business, Créatif, Immobilier.", color: "text-white" },
    { icon: Globe, label: t("your_public_link") || "Lien Universel", desc: t("feature_desc_public_link") || "votre-nom.com ou hosyardigital.com/u/nom, accessible instantanément.", color: "text-zinc-300" },
    { icon: QrCode, label: t("qr_code_auto") || "Scan & Connect", desc: t("feature_desc_qrcode") || "Génération automatique d'un QR code haute définition.", color: "text-zinc-400" },
    { icon: Download, label: t("feature_vcf_title") || "Export Natif", desc: t("feature_desc_vcf") || "Ajout direct aux contacts (VCF) en un seul clic.", color: "text-zinc-500" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 overflow-hidden font-sans" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Background ambient light */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Nav - Ultra minimal */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm">
            V
          </div>
          <span className="font-semibold text-sm tracking-tight hidden sm:block">VCard Pro</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">
            {t("login_action") || "Connexion"}
          </Link>
          <Link href="/register" className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
            {t("create_my_vcard") || "Créer ma vCard"}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-full text-xs font-medium text-zinc-300 mb-8 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-zinc-400" />
          <span>La nouvelle génération de cartes de visite.</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight leading-[1.05] mb-8"
        >
          Votre identité. <br className="hidden md:block" />
          <span className="text-zinc-500">Sans friction.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12 font-light"
        >
          Oubliez le papier. Créez une carte digitale au design exceptionnel en quelques secondes. Partagez-la d'un simple scan. Laissez une impression mémorable.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-semibold text-sm hover:bg-zinc-200 transition-colors"
          >
            {t("start_free") || "Commencer maintenant"}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-xl font-medium text-sm transition-colors text-white"
          >
            Explorer l'éditeur
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 w-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
          <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-2xl border border-white/[0.05] bg-black/50 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Mockup UI simple pour illustrer l'app */}
            <div className="w-[300px] h-[600px] bg-[#111] rounded-[40px] border-8 border-[#222] shadow-2xl relative overflow-hidden flex flex-col mt-32">
              <div className="h-40 bg-gradient-to-br from-zinc-800 to-black w-full" />
              <div className="flex-1 bg-black p-6 flex flex-col items-center -mt-12">
                <div className="w-24 h-24 rounded-2xl bg-white mb-4 border-4 border-black" />
                <div className="w-32 h-4 bg-zinc-800 rounded-full mb-2" />
                <div className="w-20 h-3 bg-zinc-900 rounded-full mb-8" />
                <div className="w-full space-y-3">
                  <div className="w-full h-12 bg-zinc-900 rounded-xl" />
                  <div className="w-full h-12 bg-zinc-900 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Minimal Features */}
      <section className="py-32 px-6 border-t border-white/[0.02] bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">L'essentiel, perfectionné.</h2>
            <p className="text-zinc-400 text-lg">Une architecture conçue pour la vitesse et la simplicité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localizedFeatures.map((feat, i) => (
              <div key={feat.label} className="p-10 bg-[#0a0a0a] border border-white/[0.03] rounded-3xl group hover:border-white/[0.08] transition-colors">
                <feat.icon size={28} className={`${feat.color} mb-6`} strokeWidth={1.5} />
                <h3 className="text-xl font-medium mb-3">{feat.label}</h3>
                <p className="text-zinc-500 leading-relaxed font-light">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 text-center border-t border-white/[0.02]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
            Prêt à transformer votre réseau ?
          </h2>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-xl font-semibold text-base hover:scale-105 active:scale-95 transition-transform"
          >
            Créer ma carte gratuite
          </Link>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-zinc-500">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Gratuit</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Sans carte bancaire</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-[10px]">V</div>
          <span>VCard Pro © 2026</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
          <Link href="/demo" className="hover:text-white transition-colors">Éditeur</Link>
          <Link href="/login" className="hover:text-white transition-colors">Connexion</Link>
        </div>
      </footer>
    </div>
  );
}

