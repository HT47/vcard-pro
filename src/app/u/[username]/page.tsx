"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import {
  Save, Share2, Globe, Mail, Phone, MapPin, Download,
  ExternalLink, CheckCircle2, User, Loader2
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import BusinessCardV1 from "@/components/templates/BusinessCardV1";
import BusinessCardV2 from "@/components/templates/BusinessCardV2";
import BusinessCardV3 from "@/components/templates/BusinessCardV3";
import BusinessCardV4 from "@/components/templates/BusinessCardV4";
import BusinessCardClassic from "@/components/templates/BusinessCardClassic";
import BusinessCardWave from "@/components/templates/BusinessCardWave";
import BusinessCardGlass from "@/components/templates/BusinessCardGlass";
import BusinessCardFreelance from "@/components/templates/BusinessCardFreelance";
import BusinessCardStructure from "@/components/templates/BusinessCardStructure";
import DailySchedule from "@/components/templates/DailySchedule";
import WeeklyEvents from "@/components/templates/WeeklyEvents";
import YogaPoster from "@/components/templates/YogaPoster";
import YogaSchedule from "@/components/templates/YogaSchedule";
import RealEstateSimple from "@/components/templates/RealEstateSimple";
import RealEstateModern from "@/components/templates/RealEstateModern";
import RealEstateGrid from "@/components/templates/RealEstateGrid";
import EventFlyerV1 from "@/components/templates/EventFlyerV1";
import EventFlyerV2 from "@/components/templates/EventFlyerV2";

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

interface VCardData {
  name?: string;
  role?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;
  theme?: { bg?: string; gradient?: string };
  layout?: string;
  mode?: string;
  socialLinks?: { id: string; platform: string; url: string }[];
  [key: string]: unknown;
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { t, isRTL } = useI18n();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [vcardData, setVcardData] = useState<VCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [addedToContacts, setAddedToContacts] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [activeView, setActiveView] = useState<"card" | "contact">("card");

  useEffect(() => {
    if (!username) return;
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username.toLowerCase())
      .single();

    if (profileError || !profileData) { setError(true); setLoading(false); return; }
    setProfile(profileData);

    // Fetch primary vcard
    const { data: vcardRow, error: vcardError } = await supabase
      .from("vcards")
      .select("data")
      .eq("user_id", profileData.id)
      .eq("is_primary", true)
      .single();

    if (!vcardError && vcardRow) {
      setVcardData(vcardRow.data as VCardData);
    } else {
      // Fallback: get latest vcard
      const { data: latestCard } = await supabase
        .from("vcards")
        .select("data")
        .eq("user_id", profileData.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (latestCard) setVcardData(latestCard.data as VCardData);
    }
    setLoading(false);
  };

  const handleDownloadVCF = () => {
    const data = vcardData;
    if (!data && !profile) return;

    const name = data?.name || profile?.display_name || profile?.username || "Contact";
    const vcfContent = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${name}`,
      data?.company ? `ORG:${data.company}` : "",
      data?.role ? `TITLE:${data.role}` : "",
      data?.phone ? `TEL;TYPE=CELL:${data.phone}` : "",
      data?.email ? `EMAIL:${data.email}` : "",
      data?.website ? `URL:${data.website}` : "",
      data?.location ? `ADR;TYPE=WORK:;;${data.location}` : "",
      data?.bio ? `NOTE:${data.bio}` : (profile?.bio ? `NOTE:${profile.bio}` : ""),
      data?.avatarUrl ? `PHOTO;ENCODING=B;TYPE=JPEG:${data.avatarUrl}` : "",
      `X-SOCIALPROFILE;type=vcard-pro:${typeof window !== "undefined" ? window.location.href : ""}`,
      "END:VCARD",
    ].filter(Boolean).join("\n");

    const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name.replace(/\s+/g, "_")}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAddedToContacts(true);
    setTimeout(() => setAddedToContacts(false), 3000);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: vcardData?.name || profile?.display_name || `@${username}`,
        text: t("share_profile_desc")?.replace("@{username}", `@${username}`) || `Découvrez la vCard de @${username}`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert(t("link_copied") || "Lien copié dans le presse-papier !");
    }
  };

  const renderTemplate = () => {
    if (!vcardData) return null;
    switch (vcardData.layout) {
      case "pro-v1": return <BusinessCardV1 data={vcardData} />;
      case "pro-v2": return <BusinessCardV2 data={vcardData} />;
      case "pro-v3": return <BusinessCardV3 data={vcardData} />;
      case "pro-v4": return <BusinessCardV4 data={vcardData} />;
      case "agenda-jour": return <DailySchedule data={vcardData} />;
      case "agenda-semaine": return <WeeklyEvents data={vcardData} />;
      case "yoga-poster": return <YogaPoster data={vcardData} />;
      case "yoga-schedule": return <YogaSchedule data={vcardData} />;
      case "immo-simple": return <RealEstateSimple data={vcardData} />;
      case "immo-modern": return <RealEstateModern data={vcardData} />;
      case "immo-grid": return <RealEstateGrid data={vcardData} />;
      case "event-gradient": return <EventFlyerV1 data={vcardData} />;
      case "event-retro": return <EventFlyerV2 data={vcardData} />;
      case "structure-pro": return <BusinessCardStructure data={vcardData} />;
      case "wave-pro": return <BusinessCardWave data={vcardData} />;
      case "glass-pro": return <BusinessCardGlass data={vcardData} />;
      case "freelance-pro": return <BusinessCardFreelance data={vcardData} />;
      case "classic-pro":
      default: return <BusinessCardClassic data={vcardData} />;
    }
  };

  const PLATFORM_ICONS: Record<string, string> = {
    LinkedIn: "🔗", Twitter: "🐦", Instagram: "📸", Facebook: "👥",
    Github: "💻", Youtube: "▶️", Website: "🌐",
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">{t("loading_profile") || "Chargement du profil..."}</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center p-8 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl max-w-sm">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-zinc-500" />
          </div>
          <h1 className="text-xl font-bold mb-2">{t("profile_not_found") || "Profil introuvable"}</h1>
          <p className="text-zinc-400 text-sm mb-6">
            {t("profile_not_found_desc")?.replace("@{username}", `@${username}`) || `@${username} n'existe pas ou a supprimé son profil.`}
          </p>
          <a href="/" className="px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors inline-block text-sm">
            {t("create_my_vcard") || "Créer ma vCard ⚡"}
          </a>
        </div>
      </div>
    );
  }

  const accentColor = vcardData?.theme?.bg || "#3b82f6";
  const accentGradient = vcardData?.theme?.gradient || `linear-gradient(135deg, ${accentColor} 0%, #7c3aed 100%)`;
  const isLight = vcardData?.mode === "light";
  const displayName = vcardData?.name || profile.display_name || profile.username;

  return (
    <div className={`min-h-screen w-full ${isLight ? "bg-[#f0f2f5]" : "bg-[#050505]"}`} dir={isRTL ? "rtl" : "ltr"}>

      {/* Hero Banner */}
      <div className="relative h-52 w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: accentGradient }} />
        <div className="absolute inset-0 bg-black/30" />
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        {/* Wave SVG */}
        <svg className="absolute bottom-0 w-full" preserveAspectRatio="none" viewBox="0 0 1440 60" fill={isLight ? "#f0f2f5" : "#050505"}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-16 relative z-10 pb-24">
        {/* Profile Card */}
        <div className={`rounded-3xl border shadow-2xl overflow-hidden ${isLight ? "bg-white border-zinc-100" : "bg-zinc-950 border-white/10"}`}>

          {/* Avatar & Name */}
          <div className="flex flex-col items-center pt-6 pb-5 px-6 text-center">
            <div className="w-24 h-24 rounded-2xl border-4 overflow-hidden flex-shrink-0 shadow-xl mb-4"
              style={{ borderColor: accentColor + "40", boxShadow: `0 8px 30px ${accentColor}30` }}>
              {(vcardData?.avatarUrl || profile.avatar_url) ? (
                <img src={vcardData?.avatarUrl || profile.avatar_url!} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold" style={{ background: accentGradient }}>
                  <span className="text-white">{displayName.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <h1 className={`text-2xl font-bold mb-1 ${isLight ? "text-zinc-900" : "text-white"}`}>{displayName}</h1>
            {vcardData?.role && (
              <p className="text-sm font-semibold mb-0.5 bg-clip-text text-transparent" style={{ backgroundImage: accentGradient }}>
                {vcardData.role}
              </p>
            )}
            {vcardData?.company && (
              <p className={`text-sm ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>{vcardData.company}</p>
            )}
            <div className={`mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${isLight ? "bg-zinc-100 text-zinc-500" : "bg-white/5 text-zinc-400"}`}>
              @{profile.username}
            </div>
            {(vcardData?.bio || profile.bio) && (
              <p className={`mt-3 text-sm leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-300"}`}>
                {vcardData?.bio || profile.bio}
              </p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="px-5 pb-5 grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownloadVCF}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm font-bold shadow-lg transition-all relative overflow-hidden"
              style={{ background: accentGradient, boxShadow: `0 8px 24px ${accentColor}40` }}
            >
              {addedToContacts ? (
                <><CheckCircle2 size={18} /> {t("contact_added") || "Contact ajouté !"}</>
              ) : (
                <><Save size={18} /> {t("add_to_contacts") || "Ajouter aux contacts"}</>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold border transition-all ${isLight ? "bg-white border-zinc-200 text-zinc-700" : "bg-white/5 border-white/10 text-white"}`}
            >
              <Share2 size={18} />
              {t("share") || "Partager"}
            </motion.button>
          </div>

          {/* Tab switch — Card / Contact Info */}
          <div className="mx-5 mb-4 flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
            {(["card", "contact"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeView === v ? "bg-white text-black shadow" : isLight ? "text-zinc-500 hover:text-zinc-700" : "text-zinc-400 hover:text-white"}`}
              >
                {v === "card" ? `🎨 ${t("vcard_tab") || "Ma vCard"}` : `📋 ${t("contact_tab") || "Contact"}`}
              </button>
            ))}
          </div>

          {/* Card View */}
          <AnimatePresence mode="wait">
            {activeView === "card" && vcardData && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="px-3 pb-5"
              >
                {renderTemplate()}
              </motion.div>
            )}

            {/* Contact Info View */}
            {activeView === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="px-5 pb-5 space-y-3"
              >
                {[
                  { icon: Mail, label: t("email") || "Email", value: vcardData?.email, href: `mailto:${vcardData?.email}` },
                  { icon: Phone, label: t("phone") || "Téléphone", value: vcardData?.phone, href: `tel:${vcardData?.phone}` },
                  { icon: Globe, label: t("website") || "Site Web", value: vcardData?.website, href: vcardData?.website },
                  { icon: MapPin, label: t("address") || "Adresse", value: vcardData?.location, href: `https://maps.google.com/?q=${encodeURIComponent(vcardData?.location || "")}` },
                ].filter(item => item.value).map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${isLight ? "bg-zinc-50 border-zinc-100 hover:bg-white" : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"}`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0" style={{ background: accentGradient }}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>{item.label}</p>
                      <p className={`text-sm font-semibold truncate ${isLight ? "text-zinc-800" : "text-zinc-200"}`}>{item.value}</p>
                    </div>
                    <ExternalLink size={15} className={`flex-shrink-0 ${isLight ? "text-zinc-300" : "text-zinc-600"} group-hover:text-white transition-colors`} />
                  </motion.a>
                ))}

                {/* Social Links */}
                {vcardData?.socialLinks && vcardData.socialLinks.filter(l => l.url).length > 0 && (
                  <div className="pt-2">
                    <p className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>{t("networks") || "Réseaux"}</p>
                    <div className="flex flex-wrap gap-2">
                      {vcardData.socialLinks.filter(l => l.url).map((link) => (
                        <motion.a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${isLight ? "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900" : "bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10"}`}
                        >
                          <span>{PLATFORM_ICONS[link.platform] || "🔗"}</span>
                          {link.platform}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download VCF button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDownloadVCF}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-4 rounded-2xl text-white text-sm font-bold relative overflow-hidden shadow-xl"
                  style={{ background: accentGradient, boxShadow: `0 8px 24px ${accentColor}40` }}
                >
                  <Download size={18} />
                  {t("download_vcf") || "Télécharger ma fiche contact (.vcf)"}
                </motion.button>

                {/* QR Code */}
                <button
                  onClick={() => setShowQR(true)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold border transition-all ${isLight ? "bg-zinc-50 border-zinc-200 text-zinc-600" : "bg-white/5 border-white/10 text-zinc-300"}`}
                >
                  <span>🔍</span>
                  {t("show_qrcode") || "Afficher le QR Code"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* "Created with" badge */}
        <a
          href="/"
          className={`mt-6 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs font-semibold border transition-all hover:scale-105 ${isLight ? "bg-white/70 border-zinc-200 text-zinc-500" : "bg-black/60 border-white/10 text-zinc-500 backdrop-blur-md"}`}
        >
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-[10px]">V</div>
          {t("created_with") || "Créé avec"} <strong className="text-white">VCard Pro</strong> ⚡
        </a>
      </div>

      {/* Floating action bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        <button
          onClick={handleDownloadVCF}
          className="flex items-center gap-2 px-5 py-2.5 text-white text-xs font-bold rounded-full transition-all"
          style={{ background: accentGradient }}
        >
          {addedToContacts ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {addedToContacts ? (t("contact_added") || "Ajouté !") : (t("add_to_contacts") || "Ajouter aux contacts")}
        </button>
        <button
          onClick={handleShare}
          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <Share2 size={18} className="text-white" />
        </button>
      </div>

      {/* QR Modal */}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] border border-white/10 rounded-3xl p-8 z-[60] flex flex-col items-center gap-5 shadow-2xl w-80"
            >
              <h3 className="text-lg font-bold text-white">{t("scan_profile") || "Scanner mon profil"}</h3>
              <div className="p-4 bg-white rounded-2xl shadow-xl">
                <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : ""} size={180} fgColor="#000" bgColor="#fff" level="Q" />
              </div>
              <p className="text-zinc-500 text-xs text-center">@{profile.username}</p>
              <button onClick={() => setShowQR(false)} className="text-zinc-400 text-sm hover:text-white transition-colors">{t("close") || "Fermer"}</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
