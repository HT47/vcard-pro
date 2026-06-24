"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { QrCode, Zap, Share2, Download, Palette, Globe, Star, ArrowRight, CheckCircle2, Sparkles, Lock, Infinity } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const TEMPLATES_PREVIEW = [
  { name: "Classic Pro", color: "from-blue-600 to-indigo-700", emoji: "💼" },
  { name: "Wave", color: "from-cyan-500 to-blue-600", emoji: "🌊" },
  { name: "Glass", color: "from-purple-500 to-pink-600", emoji: "✨" },
  { name: "Freelance", color: "from-emerald-500 to-teal-600", emoji: "🚀" },
  { name: "Immobilier", color: "from-orange-500 to-red-600", emoji: "🏠" },
  { name: "Link Bio", color: "from-rose-500 to-purple-600", emoji: "🔗" },
];

export default function LandingPage() {
  const { t, isRTL } = useI18n();
  const [activeTemplate, setActiveTemplate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTemplate(prev => (prev + 1) % TEMPLATES_PREVIEW.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const localizedFeatures = [
    { icon: Palette, label: t("templates") || "Modèles", desc: t("feature_desc_templates") || "Business, Yoga, Immobilier, Événements", color: "text-blue-400" },
    { icon: Globe, label: t("your_public_link") || "Lien Public", desc: t("feature_desc_public_link") || "hosyardigital.com/u/ton-nom partageable partout", color: "text-emerald-400" },
    { icon: QrCode, label: t("qr_code_auto") || "QR Code Auto", desc: t("feature_desc_qrcode") || "Généré instantanément pour chaque vCard", color: "text-purple-400" },
    { icon: Download, label: t("feature_vcf_title") || "Export .vcf", desc: t("feature_desc_vcf") || "Contact ajouté en 1 tap dans le téléphone", color: "text-orange-400" },
    { icon: Share2, label: t("share") || "Partage Natif", desc: t("feature_desc_share") || "WhatsApp, Email, Instagram, Airdrop", color: "text-pink-400" },
    { icon: Infinity, label: t("feature_free_title") || "100% Gratuit", desc: t("feature_desc_free") || "Aucun abonnement, aucune limite", color: "text-yellow-400" },
  ];

  const localizedReviews = [
    { name: "Sophie M.", role: t("review_role_1") || "Directrice Marketing", rating: 5, text: t("review_text_1") || "Mon équipe entière utilise VCard Pro. Le gain de temps est incroyable." },
    { name: "Karim B.", role: t("review_role_2") || "Freelance Designer", rating: 5, text: t("review_text_2") || "Enfin une app gratuite sans limitation cachée. Les templates sont magnifiques." },
    { name: "Laura D.", role: t("review_role_3") || "Agent Immobilier", rating: 5, text: t("review_text_3") || "Le template immobilier est parfait pour mes annonces. Mes clients adorent !" },
  ];

  const localizedSteps = [
    { step: "1", title: t("step_title_1") || "Créez votre compte", desc: t("step_desc_1") || "Choisissez votre identifiant unique ex: @marie.dupont", icon: "👤" },
    { step: "2", title: t("step_title_2") || "Personnalisez", desc: t("step_desc_2") || "Sélectionnez un template et remplissez vos infos", icon: "✏️" },
    { step: "3", title: t("step_title_3") || "Partagez !", desc: t("step_desc_3") || "Via QR code, lien ou partage direct", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-sm shadow-lg shadow-blue-500/30">
            V
          </div>
          <span className="font-bold text-sm tracking-tight">VCard Pro</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/login" className="text-xs text-zinc-400 hover:text-white transition-colors font-medium">
            {t("login_action") || "Connexion"}
          </Link>
          <Link href="/register" className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold hover:bg-zinc-200 transition-all shadow-lg">
            {t("create_my_vcard") || "Créer ma vCard ⚡"}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-zinc-300 mb-8 backdrop-blur-sm"
          >
            <Sparkles size={12} className="text-yellow-400" />
            {t("hero_badge") || "100% Gratuit · Aucun abonnement · Aucune limite"}
            <Sparkles size={12} className="text-yellow-400" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            {t("hero_title_part1") || "Votre carte de visite"}
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t("hero_title_part2") || "digitale professionnelle"}
            </span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t("hero_desc") || "Créez une vCard élégante en 2 minutes. Partagez-la via QR code, lien ou NFC. Choisissez parmi 30+ templates — Business, Yoga, Immobilier et plus."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-base hover:opacity-90 transition-all shadow-2xl shadow-blue-500/30"
            >
              <Zap size={18} className="group-hover:scale-110 transition-transform" />
              {t("create_vcard_free") || "Créer ma vCard gratuite"}
              <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""}`} />
            </Link>
            <Link
              href="/demo"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-semibold text-sm transition-all text-zinc-300"
            >
              <Star size={16} />
              {t("view_templates") || "Voir les templates"}
            </Link>
          </div>
        </motion.div>

        {/* Template Carousel Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 mt-16 flex justify-center gap-3 flex-wrap"
        >
          {TEMPLATES_PREVIEW.map((tmpl, i) => (
            <motion.div
              key={tmpl.name}
              animate={{
                scale: i === activeTemplate ? 1.1 : 0.95,
                opacity: i === activeTemplate ? 1 : 0.5,
              }}
              transition={{ duration: 0.4 }}
              className={`flex flex-col items-center justify-center w-24 h-32 rounded-2xl bg-gradient-to-br ${tmpl.color} cursor-pointer shadow-2xl border border-white/10`}
              onClick={() => setActiveTemplate(i)}
            >
              <span className="text-3xl mb-2">{tmpl.emoji}</span>
              <span className="text-[10px] font-bold text-white/80 text-center px-2">{tmpl.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">{t("features_title") || "Tout ce dont vous avez besoin"}</h2>
            <p className="text-zinc-400">{t("features_subtitle") || "Aucun compte payant requis. Tout est inclus gratuitement."}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {localizedFeatures.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] transition-all group"
              >
                <feat.icon size={24} className={`${feat.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-base mb-1">{feat.label}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12">{t("how_it_works_title") || "En 3 étapes simples"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {localizedSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-black mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">{t("reviews_title") || "Ils adorent VCard Pro ❤️"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {localizedReviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 mb-4 leading-relaxed italic">"{review.text}"</p>
                <div>
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="text-xs text-zinc-500">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold mb-6">
            <Lock size={12} />
            {t("cta_badge") || "Gratuit pour toujours · Aucune carte bancaire requise"}
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            {t("cta_title_part1") || "Prêt à créer votre"}
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t("cta_title_part2") || "carte digitale ?"}
            </span>
          </h2>
          <p className="text-zinc-400 mb-8">
            {t("cta_desc") || "Rejoignez les professionnels qui ont déjà adopté la carte de visite du futur."}
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-black text-base hover:opacity-90 transition-all shadow-2xl shadow-blue-500/30"
          >
            <Zap size={20} />
            {t("start_free") || "Commencer gratuitement"}
          </Link>
          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-zinc-600 flex-wrap">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> {t("signup_time") || "Inscription en 30 sec"}</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> {t("zero_subscription") || "0 abonnement"}</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> {t("zero_card_required") || "0 carte requise"}</span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-xs">V</div>
          <span className="text-sm font-bold">VCard Pro</span>
        </div>
        <div className="flex items-center justify-center gap-6 text-xs text-zinc-600">
          <Link href="/privacy" className="hover:text-white transition-colors">{t("privacy_policy") || "Politique de confidentialité"}</Link>
          <Link href="/demo" className="hover:text-white transition-colors">{t("templates") || "Templates"}</Link>
          <Link href="/login" className="hover:text-white transition-colors">{t("login_action") || "Connexion"}</Link>
        </div>
        <p className="text-xs text-zinc-700 mt-4">{t("copyright") || "© 2026 VCard Pro · hosyardigital.com · Tous droits réservés"}</p>
      </footer>
    </div>
  );
}
