"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import { Save, Share2, User } from "lucide-react";
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
import LinkInBioTree from "@/components/templates/LinkInBioTree";
import LinkInBioBeacons from "@/components/templates/LinkInBioBeacons";
import LinkInBioSites from "@/components/templates/LinkInBioSites";

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
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!username) return;
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username.toLowerCase())
      .single();

    if (profileError || !profileData) { setError(true); setLoading(false); return; }
    setProfile(profileData);

    const { data: vcardRow, error: vcardError } = await supabase
      .from("vcards")
      .select("data")
      .eq("user_id", profileData.id)
      .eq("is_primary", true)
      .single();

    if (!vcardError && vcardRow) {
      setVcardData(vcardRow.data as VCardData);
    } else {
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
    switch(vcardData.layout) {
      case 'link-tree': return <LinkInBioTree data={vcardData} />;
      case 'link-beacons': return <LinkInBioBeacons data={vcardData} />;
      case 'link-biosites': return <LinkInBioSites data={vcardData} />;
      case 'pro-v1': return <BusinessCardV1 data={vcardData} />;
      case 'pro-v2': return <BusinessCardV2 data={vcardData} />;
      case 'agenda-jour': return <DailySchedule data={vcardData} />;
      case 'agenda-semaine': return <WeeklyEvents data={vcardData} />;
      case 'yoga-poster': return <YogaPoster data={vcardData} />;
      case 'yoga-schedule': return <YogaSchedule data={vcardData} />;
      case 'immo-simple': return <RealEstateSimple data={vcardData} />;
      case 'immo-modern': return <RealEstateModern data={vcardData} />;
      case 'immo-grid': return <RealEstateGrid data={vcardData} />;
      case 'pro-v3': return <BusinessCardV3 data={vcardData} />;
      case 'pro-v4': return <BusinessCardV4 data={vcardData} />;
      case 'event-gradient': return <EventFlyerV1 data={vcardData} />;
      case 'event-retro': return <EventFlyerV2 data={vcardData} />;
      case 'structure-pro': return <BusinessCardStructure data={vcardData} />;
      case 'classic-pro': return <BusinessCardClassic data={vcardData} />;
      case 'wave-pro': return <BusinessCardWave data={vcardData} />;
      case 'glass-pro': return <BusinessCardGlass data={vcardData} />;
      case 'freelance-pro': return <BusinessCardFreelance data={vcardData} />;
      default: return <BusinessCardClassic data={vcardData} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
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

  // Si l'utilisateur n'a aucune vCard créée
  if (!vcardData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center p-8 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl max-w-sm">
          <h1 className="text-xl font-bold mb-2">@{username}</h1>
          <p className="text-zinc-400 text-sm mb-6">Ce profil n'a pas encore publié de vCard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex items-center justify-center py-10 ${vcardData.mode === 'light' ? 'bg-[#f0f2f5]' : 'bg-[#050505]'}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="w-full max-w-md mx-auto relative px-4">
        {renderTemplate()}
      </div>

      {/* Floating Actions on Public Page */}
      <div className="fixed bottom-6 left-6 flex items-center gap-2.5 z-50">
        <button 
          onClick={handleDownloadVCF}
          className="p-3.5 bg-white text-black hover:bg-zinc-200 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title={t("save_contact") || "Enregistrer le contact"}
        >
          <Save size={18} />
        </button>
        <button 
          onClick={handleShare}
          className="p-3.5 bg-zinc-900 text-white hover:bg-zinc-800 border border-white/10 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title={t("share_vcard") || "Partager cette carte"}
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Floating "Create your own" badge */}
      <a 
        href="/" 
        className="fixed bottom-6 right-6 bg-black/80 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-2xl hover:scale-105 transition-transform"
      >
        {t("created_with") || "Créé avec"} <strong className="text-white">VCard Pro</strong> ⚡
      </a>
    </div>
  );
}

