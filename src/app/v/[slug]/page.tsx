"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/context/I18nContext";
import { Save, Share2 } from "lucide-react";

import BusinessCardV1 from "@/components/templates/BusinessCardV1";
import BusinessCardV2 from "@/components/templates/BusinessCardV2";
import DailySchedule from "@/components/templates/DailySchedule";
import WeeklyEvents from "@/components/templates/WeeklyEvents";
import YogaPoster from "@/components/templates/YogaPoster";
import YogaSchedule from "@/components/templates/YogaSchedule";
import RealEstateSimple from "@/components/templates/RealEstateSimple";
import RealEstateModern from "@/components/templates/RealEstateModern";
import RealEstateGrid from "@/components/templates/RealEstateGrid";
import BusinessCardV3 from "@/components/templates/BusinessCardV3";
import BusinessCardV4 from "@/components/templates/BusinessCardV4";
import EventFlyerV1 from "@/components/templates/EventFlyerV1";
import EventFlyerV2 from "@/components/templates/EventFlyerV2";
import BusinessCardStructure from "@/components/templates/BusinessCardStructure";
import BusinessCardClassic from "@/components/templates/BusinessCardClassic";
import BusinessCardWave from "@/components/templates/BusinessCardWave";
import BusinessCardGlass from "@/components/templates/BusinessCardGlass";
import BusinessCardFreelance from "@/components/templates/BusinessCardFreelance";
import LinkInBioTree from "@/components/templates/LinkInBioTree";
import LinkInBioBeacons from "@/components/templates/LinkInBioBeacons";
import LinkInBioSites from "@/components/templates/LinkInBioSites";

export default function PublishedVCard() {
  const params = useParams();
  const { t, isRTL } = useI18n();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVCard = async () => {
      const slug = params?.slug as string;
      if (!slug) return;

      const { data: vcardData, error: vcardError } = await supabase
        .from("vcards")
        .select("data")
        .eq("slug", slug)
        .single();

      if (vcardError || !vcardData) {
        setError(true);
      } else {
        setData(vcardData.data);
      }
      setLoading(false);
    };

    const isClient = typeof window !== 'undefined';
    if (isClient) {
      fetchVCard();
    }
  }, [params]);

  const handleDownloadVCF = () => {
    if (!data) return;
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
ORG:${data.company || ''}
TITLE:${data.role || ''}
TEL;TYPE=CELL:${data.phone || ''}
EMAIL:${data.email || ''}
URL:${data.website || ''}
ADR;TYPE=WORK:;;${data.location || ''}
NOTE:${data.bio || ''}
END:VCARD`;

    const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${data.name.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (!data) return;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shareUrl = `${APP_URL}/v/${params?.slug}`;

    if (navigator.share) {
      navigator.share({
        title: data.name,
        text: t("share_vcard_desc")?.replace("{role}", data.role || "").replace("{company}", data.company || "") || `Découvrez ma carte de visite vCard : ${data.role} chez ${data.company}`,
        url: shareUrl,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(t("link_copied") || "Lien copié dans le presse-papier !");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center p-8 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl max-w-sm">
          <h1 className="text-2xl font-bold mb-2">{t("vcard_not_found") || "vCard Introuvable"}</h1>
          <p className="text-zinc-400 mb-6">{t("vcard_not_found_desc") || "Ce lien est invalide ou la vCard a été supprimée."}</p>
          <a href="/" className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">{t("create_my_vcard") || "Créer ma vCard"}</a>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    switch(data.layout) {
      case 'link-tree': return <LinkInBioTree data={data} />;
      case 'link-beacons': return <LinkInBioBeacons data={data} />;
      case 'link-biosites': return <LinkInBioSites data={data} />;
      case 'pro-v1': return <BusinessCardV1 data={data} />;
      case 'pro-v2': return <BusinessCardV2 data={data} />;
      case 'agenda-jour': return <DailySchedule data={data} />;
      case 'agenda-semaine': return <WeeklyEvents data={data} />;
      case 'yoga-poster': return <YogaPoster data={data} />;
      case 'yoga-schedule': return <YogaSchedule data={data} />;
      case 'immo-simple': return <RealEstateSimple data={data} />;
      case 'immo-modern': return <RealEstateModern data={data} />;
      case 'immo-grid': return <RealEstateGrid data={data} />;
      case 'pro-v3': return <BusinessCardV3 data={data} />;
      case 'pro-v4': return <BusinessCardV4 data={data} />;
      case 'event-gradient': return <EventFlyerV1 data={data} />;
      case 'event-retro': return <EventFlyerV2 data={data} />;
      case 'structure-pro': return <BusinessCardStructure data={data} />;
      case 'classic-pro': return <BusinessCardClassic data={data} />;
      case 'wave-pro': return <BusinessCardWave data={data} />;
      case 'glass-pro': return <BusinessCardGlass data={data} />;
      case 'freelance-pro': return <BusinessCardFreelance data={data} />;
      default: return <BusinessCardClassic data={data} />;
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center py-10 ${data.mode === 'light' ? 'bg-[#f0f2f5]' : 'bg-[#050505]'}`} dir={isRTL ? "rtl" : "ltr"}>
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
