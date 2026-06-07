"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { I18nProvider } from "@/context/I18nContext";

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

export default function PublishedVCard() {
  const params = useParams();
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

    fetchVCard();
  }, [params]);

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
          <h1 className="text-2xl font-bold mb-2">vCard Introuvable</h1>
          <p className="text-zinc-400 mb-6">Ce lien est invalide ou la vCard a été supprimée.</p>
          <a href="/" className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">Créer ma vCard</a>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    switch(data.layout) {
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
    <I18nProvider>
      <div className={`min-h-screen w-full flex items-center justify-center py-10 ${data.mode === 'light' ? 'bg-[#f0f2f5]' : 'bg-[#050505]'}`}>
        <div className="w-full max-w-md mx-auto relative px-4">
          {renderTemplate()}
        </div>
        
        {/* Floating "Create your own" badge */}
        <a 
          href="/" 
          className="fixed bottom-6 right-6 bg-black/80 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl hover:scale-105 transition-transform"
        >
          Créé avec vCard Builder ⚡
        </a>
      </div>
    </I18nProvider>
  );
}
