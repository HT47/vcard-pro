"use client";

import { useState, useRef, useEffect } from "react";
import { Smartphone, Share2, Save, X, Edit3, Eye, UploadCloud, CheckCircle2, Settings2, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { supabase } from "@/lib/supabase";

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

const THEMES = [
  // Dark & Premium
  { id: 'neon-blue', name: 'Neon Blue', bg: '#0ea5e9', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', shadow: 'rgba(14, 165, 233, 0.4)', type: 'dark' },
  { id: 'emerald', name: 'Emerald', bg: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', shadow: 'rgba(16, 185, 129, 0.4)', type: 'dark' },
  { id: 'rose', name: 'Rose', bg: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', shadow: 'rgba(244, 63, 94, 0.4)', type: 'dark' },
  { id: 'purple', name: 'Purple', bg: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', shadow: 'rgba(139, 92, 246, 0.4)', type: 'dark' },
  { id: 'sunset', name: 'Sunset', bg: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', shadow: 'rgba(245, 158, 11, 0.4)', type: 'dark' },
  { id: 'dark-metal', name: 'Dark Metal', bg: '#3f3f46', gradient: 'linear-gradient(135deg, #3f3f46 0%, #18181b 100%)', shadow: 'rgba(63, 63, 70, 0.4)', type: 'dark' },
  { id: 'cyberpunk', name: 'Cyberpunk', bg: '#d946ef', gradient: 'linear-gradient(135deg, #d946ef 0%, #06b6d4 100%)', shadow: 'rgba(217, 70, 239, 0.5)', type: 'dark' },
  { id: 'midnight', name: 'Midnight', bg: '#4f46e5', gradient: 'linear-gradient(135deg, #312e81 0%, #000000 100%)', shadow: 'rgba(49, 46, 129, 0.5)', type: 'dark' },
  
  // Light & Soft
  { id: 'light-minimal', name: 'Light Minimal', bg: '#94a3b8', gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', shadow: 'rgba(0, 0, 0, 0.1)', type: 'light' },
  { id: 'lavender', name: 'Lavender', bg: '#a78bfa', gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', shadow: 'rgba(99, 102, 241, 0.2)', type: 'light' },
  { id: 'peach', name: 'Peach', bg: '#fb923c', gradient: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)', shadow: 'rgba(249, 115, 22, 0.2)', type: 'light' },
  { id: 'nature', name: 'Nature', bg: '#84cc16', gradient: 'linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%)', shadow: 'rgba(132, 204, 22, 0.2)', type: 'light' },
];

export default function DemoBuilder() {
  const { t, locale, translations } = useI18n();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: t("default_name") || "Alexandre Dubois",
    role: t("default_role") || "Directeur Créatif",
    company: t("default_company") || "NextLevel Agency",
    email: "alex@nextlevel.design",
    phone: "+33 6 12 34 56 78",
    website: "https://nextlevel.design",
    location: t("default_location") || "75008 Paris, France",
    bio: t("default_bio") || "Passionné par le design UI/UX et la création d'expériences numériques mémorables.",
    theme: THEMES[0],
    layout: 'classic',
    mode: 'light',
    avatarUrl: "",
    coverUrl: "",
    socialLinks: [
      { id: "1", platform: "LinkedIn", url: "https://linkedin.com/in/alexandredubois" },
      { id: "2", platform: "Twitter", url: "https://twitter.com/alexdesign" }
    ],
    scheduleData: [
      { id: "1", time: "8H", task: "Répondre aux emails" },
      { id: "2", time: "9H", task: "Finaliser présentation" },
      { id: "3", time: "11H", task: "Appel client" },
      { id: "4", time: "13H", task: "Relecture proposition" },
      { id: "5", time: "15H", task: "Envoi devis" },
      { id: "6", time: "16H", task: "Prospection" },
      { id: "7", time: "17H", task: "Suivi" },
    ],
    eventData: [
      { id: "1", day: "JEU.", date: "05", title: "Festival de musique", location: "ANYWHERE", time: "21H00 - MINUIT", desc: "Venez vibrer au rythme des meilleurs artistes locaux.", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" },
      { id: "2", day: "VEN.", date: "06", title: "Marché artisanal", location: "ANYWHERE", time: "9H00 - 12H00", desc: "Découvrez des créations uniques des artisans locaux.", img: "https://images.unsplash.com/photo-1533759413974-a7407c07e8a5?auto=format&fit=crop&w=800&q=80" },
      { id: "3", day: "SAM.", date: "07", title: "Cinéma en Pleine Air", location: "ANYWHERE", time: "21H - 23H30", desc: "Apportez vos couvertures pour une soirée cinéma en plein air !", img: "https://images.unsplash.com/photo-1595769816263-9b91059a8f4b?auto=format&fit=crop&w=800&q=80" },
    ],
    yoga: {
      title: "YOGA",
      subtitle: "Nouveau cours",
      day: "LUNDI",
      buttonText: "BOOK NOW",
      schedule: [
        { time: "10:00-11:00", name: "Ashtanga Yoga", level: "Débutant" },
        { time: "11:00-12:00", name: "Hatha Yoga", level: "Intermédiaire" },
        { time: "13:00-14:00", name: "Kundalini Yoga", level: "Avancé" },
      ]
    },
    realEstate: {
      status: "À VENDRE",
      price: "$2.000.000",
      discount: "30%",
      features: ["Easy Access", "Private Pool", "Fitness Center", "Finger Print Lock", "Best Security"],
      rooms: [
        { name: "Bedroom", img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=400&q=80" },
        { name: "Bathroom", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80" },
        { name: "Kitchen", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
        { name: "Livingroom", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
      ]
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Sync demo defaults whenever the active dictionary changes
  useEffect(() => {
    const getName = (key: string, fallback: string) => translations[key] && translations[key] !== key ? translations[key] : fallback;
    setFormData(prev => ({
      ...prev,
      name: getName("default_name", "Alexandre Dubois"),
      role: getName("default_role", "Directeur Créatif"),
      company: getName("default_company", "NextLevel Agency"),
      location: getName("default_location", "75008 Paris, France"),
      bio: getName("default_bio", "Passionné par le design UI/UX et la création d'expériences numériques mémorables.")
    }));
  }, [translations]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, coverUrl: url }));
    }
  };

  const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setFormData(prev => ({
      ...prev,
      theme: {
        id: 'custom',
        name: 'Sur Mesure',
        bg: color,
        gradient: `linear-gradient(135deg, ${color} 0%, #000000 100%)`,
        shadow: `${color}80`,
        type: 'dark'
      }
    }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { id: Date.now().toString(), platform: "Website", url: "" }]
    }));
  };

  const removeSocialLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== id)
    }));
  };

  const updateSocialLink = (id: string, field: "platform" | "url", value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => link.id === id ? { ...link, [field]: value } : link)
    }));
  };

  const updateScheduleItem = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      scheduleData: prev.scheduleData.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addScheduleItem = () => {
    setFormData(prev => ({
      ...prev,
      scheduleData: [...prev.scheduleData, { id: Date.now().toString(), time: "18H", task: "Nouvelle tâche" }]
    }));
  };

  const removeScheduleItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      scheduleData: prev.scheduleData.filter(item => item.id !== id)
    }));
  };

  const updateEventItem = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      eventData: prev.eventData.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addEventItem = () => {
    setFormData(prev => ({
      ...prev,
      eventData: [...prev.eventData, { id: Date.now().toString(), day: "DIM.", date: "08", title: "Nouvel événement", location: "Lieu", time: "20H00", desc: "Description", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" }]
    }));
  };

  const removeEventItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      eventData: prev.eventData.filter(item => item.id !== id)
    }));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    // Create a random slug
    const slug = Math.random().toString(36).substring(2, 10);
    
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    const { error } = await supabase
      .from('vcards')
      .insert([
        { 
          slug, 
          data: formData,
          user_id: session?.user?.id || null
        }
      ]);
      
    setIsPublishing(false);
    if (!error) {
      setPublishedSlug(slug);
    } else {
      console.error(error);
      alert("Erreur lors de la publication : " + error.message);
    }
  };

  const SOCIAL_PLATFORMS = ["LinkedIn", "Twitter", "Instagram", "Facebook", "Github", "Youtube", "Website", "Autre"];

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case "LinkedIn": return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
      case "Twitter": return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      );
      case "Instagram": return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
      case "Facebook": return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      );
      case "Github": return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      );
      case "Youtube": return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      );
      default: return <LinkIcon size={18} />;
    }
  };

  const ThemeSelector = () => (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative w-12 h-12 rounded-full border border-white/20 overflow-hidden flex items-center justify-center bg-zinc-900 transition-all hover:ring-2 hover:ring-white cursor-pointer shadow-lg group">
        <input 
          type="color" 
          onChange={handleCustomColor} 
          className="absolute inset-[-10px] w-20 h-20 opacity-0 cursor-pointer z-10" 
          title="Couleur Personnalisée" 
        />
        <img width="24" height="24" src="https://img.icons8.com/nolan/64/color-wheel.png" alt="color-wheel" className="pointer-events-none group-hover:scale-110 transition-transform"/>
        {formData.theme.id === 'custom' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
            <CheckCircle2 size={16} className="text-white drop-shadow-md" />
          </div>
        )}
      </div>
      {THEMES.map(theme => (
        <motion.button 
          key={theme.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFormData(prev => ({ ...prev, theme }))}
          className={`relative w-12 h-12 rounded-full transition-all flex items-center justify-center ${formData.theme.id === theme.id ? 'ring-2 ring-white ring-offset-4 ring-offset-[#0a0a0a]' : 'opacity-80 hover:opacity-100'}`}
          style={{ background: theme.gradient, boxShadow: formData.theme.id === theme.id ? `0 0 20px ${theme.shadow}` : 'none' }}
        >
          {formData.theme.id === theme.id && <CheckCircle2 size={20} className="text-white drop-shadow-md" />}
        </motion.button>
      ))}
    </div>
  );

  const LayoutSelector = () => (
    <div className="flex flex-wrap gap-2 w-full">
      {[
        { id: 'classic', label: 'Classic' },
        { id: 'wave', label: 'Wave' },
        { id: 'glass', label: 'Glass' },
        { id: 'minimal', label: 'Minimal' },
        { id: 'brutal', label: 'Brutal' },
        { id: 'structure-pro', label: 'Structure Pro' },
        { id: 'classic-pro', label: 'Classic Pro' },
        { id: 'wave-pro', label: 'Wave Pro' },
        { id: 'glass-pro', label: 'Glass Pro' },
        { id: 'freelance-pro', label: 'Freelance Pro' },
        { id: 'pro-v1', label: 'Business V1' },
        { id: 'pro-v2', label: 'Business V2' },
        { id: 'agenda-jour', label: 'Agenda Jour' },
        { id: 'agenda-semaine', label: 'Agenda Semaine' },
        { id: 'yoga-poster', label: 'Yoga Affiche' },
        { id: 'yoga-schedule', label: 'Yoga Semaine' },
        { id: 'immo-simple', label: 'Immo Simple' },
        { id: 'immo-modern', label: 'Immo Modern' },
        { id: 'immo-grid', label: 'Immo Grid' },
        { id: 'pro-v3', label: 'Pro Geometric' },
        { id: 'pro-v4', label: 'Pro Bright' },
        { id: 'event-gradient', label: 'Event Gradient' },
        { id: 'event-retro', label: 'Event Retro' }
      ].map((layoutObj) => (
        <button
          key={layoutObj.id}
          onClick={() => setFormData(prev => ({ ...prev, layout: layoutObj.id }))}
          className={`flex-1 min-w-[30%] py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all ${formData.layout === layoutObj.id ? 'bg-white text-black border-white shadow-lg' : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10'}`}
        >
          {layoutObj.label}
        </button>
      ))}
    </div>
  );

  const ModeSelector = () => (
    <div className="flex gap-3 w-full">
      {['dark', 'light'].map((mode) => (
        <button
          key={mode}
          onClick={() => setFormData(prev => ({ ...prev, mode }))}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all ${formData.mode === mode ? 'bg-white text-black border-white shadow-lg' : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10'}`}
        >
          {mode === 'dark' ? '🌙 Sombre' : '☀️ Clair'}
        </button>
      ))}
    </div>
  );

  const EditorPanel = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full md:w-1/2 lg:w-5/12 h-full flex flex-col z-10 bg-[#0a0a0a] md:border-r border-white/10"
    >
      <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{t('editor_title')}</h1>
          <p className="text-[10px] md:text-xs text-zinc-400 font-medium">Pro Max Edition</p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-colors shadow-lg shadow-blue-500/20"
          >
            {isPublishing ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <UploadCloud size={14} />}
            <span className="hidden sm:inline">Publier</span>
          </button>

          <Link href="/" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm group">
            <X size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 scrollbar-hide pb-32 md:pb-6">
        
        {/* Photo Upload Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">{t('profile_photo')}</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full bg-zinc-900 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{formData.name.charAt(0) || '👤'}</span>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border border-dashed border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.04] text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <UploadCloud size={18} />
                {t('avatar')}
              </motion.button>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">{t('cover_photo')}</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-16 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {formData.coverUrl ? (
                  <img src={formData.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl text-zinc-600">🖼️</span>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" ref={coverInputRef} onChange={handleCoverUpload} />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => coverInputRef.current?.click()}
                className="flex-1 border border-dashed border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.04] text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <UploadCloud size={18} />
                {t('cover')}
              </motion.button>
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-6 border-t border-white/5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{t('profile')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('full_name')}</label>
              <input 
                type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('role')}</label>
                <input 
                  type="text" name="role" value={formData.role} onChange={handleChange}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('company')}</label>
                <input 
                  type="text" name="company" value={formData.company} onChange={handleChange}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('bio')}</label>
              <textarea 
                name="bio" value={formData.bio} onChange={handleChange} rows={3}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all resize-none"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-6 border-t border-white/5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Email</label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Téléphone</label>
              <input 
                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Site Web</label>
              <input 
                type="url" name="website" value={formData.website} onChange={handleChange}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Adresse</label>
              <input 
                type="text" name="location" value={formData.location} onChange={handleChange}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Réseaux, Liens & Infos (Icones 3D)</h2>
            <button onClick={addSocialLink} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-zinc-300">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {formData.socialLinks.map((link, index) => (
              <div key={link.id} className="flex gap-2 items-start">
                <div className="w-1/3">
                  <input 
                    type="text"
                    placeholder="Nom/Icone"
                    value={link.platform} 
                    onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="flex-1 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="URL ou Texte (ex: Adresse)" 
                    value={link.url} 
                    onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all"
                  />
                  <button onClick={() => removeSocialLink(link.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/10">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {formData.socialLinks.length === 0 && (
              <p className="text-[11px] text-zinc-500 italic text-center py-2">Aucun lien ajouté.</p>
            )}
          </div>
        </section>

        {formData.layout === 'agenda-jour' && (
          <section className="space-y-4 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Programme de la journée</h2>
              <button onClick={addScheduleItem} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-zinc-300">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {formData.scheduleData.map((item) => (
                <div key={item.id} className="flex gap-2 items-start bg-white/[0.02] p-3 rounded-xl border border-white/10">
                  <div className="w-1/4">
                    <input 
                      type="text" 
                      placeholder="Heure" 
                      value={item.time} 
                      onChange={(e) => updateScheduleItem(item.id, "time", e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Tâche" 
                      value={item.task} 
                      onChange={(e) => updateScheduleItem(item.id, "task", e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                    />
                    <button onClick={() => removeScheduleItem(item.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/10">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {formData.layout === 'agenda-semaine' && (
          <section className="space-y-4 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Programme de la semaine</h2>
              <button onClick={addEventItem} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-zinc-300">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {formData.eventData.map((item) => (
                <div key={item.id} className="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-zinc-400">Événement</span>
                    <button onClick={() => removeEventItem(item.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Jour (ex: JEU.)" value={item.day} onChange={(e) => updateEventItem(item.id, "day", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                    <input type="text" placeholder="Date (ex: 05)" value={item.date} onChange={(e) => updateEventItem(item.id, "date", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                  <input type="text" placeholder="Titre" value={item.title} onChange={(e) => updateEventItem(item.id, "title", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Lieu" value={item.location} onChange={(e) => updateEventItem(item.id, "location", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                    <input type="text" placeholder="Heure" value={item.time} onChange={(e) => updateEventItem(item.id, "time", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                  </div>
                  <textarea placeholder="Description" value={item.desc} onChange={(e) => updateEventItem(item.id, "desc", e.target.value)} rows={2} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none resize-none" />
                </div>
              ))}
            </div>
          </section>
        )}
        
        {formData.layout.startsWith('yoga') && (
          <section className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Infos Yoga</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Titre (ex: YOGA, Sunday Schedule)" value={formData.yoga.title} onChange={(e) => setFormData(prev => ({...prev, yoga: {...prev.yoga, title: e.target.value}}))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
              <input type="text" placeholder="Sous-titre (ex: Nouveau cours)" value={formData.yoga.subtitle} onChange={(e) => setFormData(prev => ({...prev, yoga: {...prev.yoga, subtitle: e.target.value}}))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
              <input type="text" placeholder="Bouton (ex: BOOK NOW)" value={formData.yoga.buttonText} onChange={(e) => setFormData(prev => ({...prev, yoga: {...prev.yoga, buttonText: e.target.value}}))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
              <p className="text-xs text-zinc-500 mt-2 mb-1">Pour éditer le programme, basculez sur Agenda Jour/Semaine temporairement ou utilisez le code de l'application réelle. (Simplifié pour la démo)</p>
            </div>
          </section>
        )}
        
        {formData.layout.startsWith('immo') && (
          <section className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Infos Immobilier</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Statut (ex: À VENDRE)" value={formData.realEstate.status} onChange={(e) => setFormData(prev => ({...prev, realEstate: {...prev.realEstate, status: e.target.value}}))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
              <input type="text" placeholder="Prix (ex: $2.000.000)" value={formData.realEstate.price} onChange={(e) => setFormData(prev => ({...prev, realEstate: {...prev.realEstate, price: e.target.value}}))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
              <input type="text" placeholder="Réduction (ex: 30%)" value={formData.realEstate.discount} onChange={(e) => setFormData(prev => ({...prev, realEstate: {...prev.realEstate, discount: e.target.value}}))} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
            </div>

            <div className="pt-4 border-t border-white/5 mt-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Caractéristiques (Séparées par virgule)</h2>
              <input 
                type="text" 
                placeholder="Ex: Easy Access, Private Pool, Fitness Center..." 
                value={formData.realEstate.features.join(", ")} 
                onChange={(e) => {
                  const feats = e.target.value.split(",").map(f => f.trim()).filter(f => f);
                  setFormData(prev => ({...prev, realEstate: {...prev.realEstate, features: feats}}));
                }}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <div className="pt-4 border-t border-white/5 mt-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Galerie (4 Images)</h2>
              <div className="space-y-3">
                {formData.realEstate.rooms.map((room: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-start bg-white/[0.02] p-3 rounded-xl border border-white/10">
                    <div className="w-1/3">
                      <input 
                        type="text" 
                        placeholder="Pièce" 
                        value={room.name} 
                        onChange={(e) => {
                          const newRooms = [...formData.realEstate.rooms];
                          newRooms[idx] = { ...newRooms[idx], name: e.target.value };
                          setFormData(prev => ({...prev, realEstate: {...prev.realEstate, rooms: newRooms}}));
                        }}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="w-full cursor-pointer border border-dashed border-white/20 hover:border-white/40 bg-black/20 rounded-lg px-3 py-2 text-sm text-zinc-400 flex items-center justify-center gap-2 transition-colors">
                        <UploadCloud size={16} />
                        <span className="truncate">{room.img.startsWith('blob:') ? 'Image chargée' : 'Importer image'}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              const newRooms = [...formData.realEstate.rooms];
                              newRooms[idx] = { ...newRooms[idx], img: url };
                              setFormData(prev => ({...prev, realEstate: {...prev.realEstate, rooms: newRooms}}));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        <section className="space-y-4 pt-6 border-t border-white/5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Structure</h2>
          <LayoutSelector />
        </section>

        <section className="space-y-4 pt-6 border-t border-white/5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Mode UI</h2>
          <ModeSelector />
        </section>
        
        <section className="space-y-4 pt-6 border-t border-white/5 pb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Thème</h2>
          <ThemeSelector />
        </section>
      </div>

      <div className="hidden md:flex p-4 md:p-6 border-t border-white/10 bg-black/80 backdrop-blur-md">
        <Link href="/register" className="group w-full bg-white text-black py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 hover:shadow-white/20">
          <Save size={18} className="group-hover:scale-110 transition-transform" />
          Créer ma vCard Premium
        </Link>
      </div>
    </motion.div>
  );

  const PreviewPanel = () => {
    const isLight = formData.mode === 'light';
    return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full md:w-1/2 lg:w-7/12 h-full flex items-center justify-center bg-[#050505] md:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] md:from-zinc-900/50 md:via-[#050505] md:to-[#050505] relative overflow-y-auto perspective-1000"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden md:flex absolute top-6 items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-zinc-300 backdrop-blur-sm z-20"
      >
        <Smartphone size={14} className="animate-pulse" />
        Aperçu en direct
      </motion.div>

      {/* Settings Button Floating on Preview (Mobile & Desktop) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSettingsOpen(true)}
        className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 p-2 rounded-full backdrop-blur-xl shadow-2xl transition-colors group border ${isLight ? 'bg-white/60 border-zinc-200 hover:bg-white/90' : 'bg-black/60 border-white/10 hover:bg-white/10'}`}
      >
        <img width="40" height="40" src="https://img.icons8.com/nolan/64/settings--v1.png" alt="settings--v1" className="animate-[spin_4s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite]" />
      </motion.button>

      {/* Mobile Frame */}
      <motion.div 
        className={`w-full h-full md:w-[360px] md:h-[740px] ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-900'} md:rounded-[3rem] md:border-[8px] shadow-2xl relative flex flex-col pb-24 md:pb-0`}
        style={{ 
          boxShadow: `0 25px 50px -12px ${formData.theme.shadow}`,
          background: formData.layout === 'glass' ? formData.theme.gradient : undefined

        }}
      >
        <div className="hidden md:flex absolute top-0 w-full justify-center z-20">
          <div className={`w-1/3 h-6 ${isLight ? 'bg-zinc-200' : 'bg-zinc-900'} rounded-b-2xl`}></div>
        </div>

        {/* Global VCard Language Switcher */}
        <div className="absolute top-4 right-4 z-[60]">
          <LanguageSwitcher />
        </div>

        <div className={`flex-1 overflow-y-auto scrollbar-hide md:overflow-hidden md:rounded-[calc(3rem-8px)] ${formData.layout === 'glass' ? '' : isLight ? 'bg-zinc-50' : 'bg-[#09090b]'}`}>
          {formData.layout === 'pro-v1' && <BusinessCardV1 data={formData} />}
          {formData.layout === 'pro-v2' && <BusinessCardV2 data={formData} />}
          {formData.layout === 'agenda-jour' && <DailySchedule data={formData} />}
          {formData.layout === 'agenda-semaine' && <WeeklyEvents data={formData} />}
          {formData.layout === 'yoga-poster' && <YogaPoster data={formData} />}
          {formData.layout === 'yoga-schedule' && <YogaSchedule data={formData} />}
          {formData.layout === 'immo-simple' && <RealEstateSimple data={formData} />}
          {formData.layout === 'immo-modern' && <RealEstateModern data={formData} />}
          {formData.layout === 'immo-grid' && <RealEstateGrid data={formData} />}
          {formData.layout === 'pro-v3' && <BusinessCardV3 data={formData} />}
          {formData.layout === 'pro-v4' && <BusinessCardV4 data={formData} />}
          {formData.layout === 'event-gradient' && <EventFlyerV1 data={formData} />}
          {formData.layout === 'event-retro' && <EventFlyerV2 data={formData} />}
          
          {formData.layout === 'structure-pro' && <BusinessCardStructure data={formData} />}
          {formData.layout === 'classic-pro' && <BusinessCardClassic data={formData} />}
          {formData.layout === 'wave-pro' && <BusinessCardWave data={formData} />}
          {formData.layout === 'glass-pro' && <BusinessCardGlass data={formData} />}
          {formData.layout === 'freelance-pro' && <BusinessCardFreelance data={formData} />}
          
          {['classic', 'wave', 'glass', 'minimal', 'brutal'].includes(formData.layout) && (
            <>
          
          {/* Header Cover */}
          {formData.layout !== 'glass' && (
            <div 
              className={`w-full relative transition-all duration-700 ease-in-out overflow-hidden ${formData.layout === 'wave' ? 'h-56' : 'h-48'}`}
              style={{ background: formData.theme.gradient }}
            >
              {formData.coverUrl && (
                <img src={formData.coverUrl} className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500" alt="Cover" />
              )}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-50"></div>
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute top-10 -left-10 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
              
              {formData.layout === 'wave' && (
                <svg className="absolute bottom-0 w-full h-16 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ fill: isLight ? '#fafafa' : '#09090b' }}>
                  <path d="M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,122.7C672,128,768,160,864,160C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              )}
            </div>
          )}
          
          <div className={`px-6 relative z-10 flex flex-col items-center text-center ${formData.layout === 'glass' ? 'pt-24' : '-mt-20'}`}>
            
            {/* Avatar */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`w-32 h-32 rounded-full border-4 mb-5 flex items-center justify-center text-5xl font-bold shadow-2xl overflow-hidden relative group ${formData.layout === 'glass' ? 'bg-white/10 border-white/20 backdrop-blur-md text-white' : isLight ? 'bg-white border-zinc-50 text-zinc-300' : 'bg-zinc-900 border-[#09090b] text-zinc-500'}`}
            >
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <span className="group-hover:scale-110 transition-transform">{formData.name.charAt(0) || '👤'}</span>
              )}
              <div className="absolute inset-0 rounded-full ring-inset ring-2 ring-white/10"></div>
            </motion.div>

            {/* User Details */}
            <h2 className={`text-3xl font-bold tracking-tight mb-1.5 ${formData.layout === 'glass' ? 'text-white' : isLight ? 'text-zinc-900' : 'text-white'}`}>{formData.name || 'Votre Nom'}</h2>
            <p className={`text-base font-semibold mb-1.5 transition-colors duration-700 bg-clip-text text-transparent ${formData.layout === 'glass' ? '!text-white drop-shadow-md' : ''}`} style={{ backgroundImage: formData.layout === 'glass' ? 'none' : formData.theme.gradient }}>
              {formData.role || 'Votre Rôle'}
            </p>
            <p className={`text-sm mb-6 font-medium ${formData.layout === 'glass' ? 'text-white/80' : isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>{formData.company || 'Votre Entreprise'}</p>
            
            <p className={`text-sm leading-relaxed mb-8 px-2 font-light ${formData.layout === 'glass' ? 'text-white/90 drop-shadow-sm' : isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
              {formData.bio || 'Votre biographie courte apparaîtra ici...'}
            </p>

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-3 mb-8">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="py-3.5 rounded-2xl text-sm font-bold flex justify-center items-center gap-2 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_10px_20px_rgba(0,0,0,0.5)] transition-all relative overflow-hidden group" 
                style={{ background: formData.theme.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <Save size={18} className="relative z-10 drop-shadow-md" />
                <span className="relative z-10 drop-shadow-md tracking-wide">{t("save_button") || "Enregistrer"}</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`py-3.5 border rounded-2xl text-sm font-bold flex justify-center items-center gap-2 transition-all backdrop-blur-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.4)] relative overflow-hidden group ${isLight ? 'bg-white/80 border-zinc-200 text-zinc-900' : 'bg-zinc-900/80 border-white/10 text-white'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <Share2 size={18} className={`relative z-10 transition-colors ${isLight ? 'text-zinc-600 group-hover:text-zinc-900' : 'text-zinc-300 group-hover:text-white'}`} />
                <span className={`relative z-10 transition-colors tracking-wide ${isLight ? 'text-zinc-600 group-hover:text-zinc-900' : 'text-zinc-300 group-hover:text-white'}`}>{t("share") || "Partager"}</span>
              </motion.button>
            </div>

            {/* Contact Items with 3D Icons */}
            <div className={`w-full ${formData.layout === 'wave' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}`}>
              {[
                { icon: '✉️', label: t("email") || 'Email', value: formData.email, type: 'email' },
                { icon: '📱', label: t("phone") || 'Téléphone', value: formData.phone, type: 'tel' },
                { icon: '🌐', label: t("website") || 'Site', value: formData.website?.replace(/^https?:\/\//, ''), type: 'url' },
                { icon: '📍', label: t("address") || 'Adresse', value: formData.location, type: 'address' }
              ].filter(item => item.value).map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ scale: 1.02, x: formData.layout === 'wave' ? 0 : 4, y: formData.layout === 'wave' ? -4 : 0 }}
                  className={`flex ${formData.layout === 'wave' ? 'flex-col justify-center text-center p-5' : 'items-center gap-4 p-4'} rounded-3xl border backdrop-blur-xl cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all ${formData.layout === 'glass' ? 'bg-black/20 border-white/20' : isLight ? 'bg-white border-zinc-100' : 'bg-white/[0.02] border-white/5'}`}
                >
                  {/* 3D Glossy Icon Container */}
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-500 shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.5)] group-hover:rotate-6 group-hover:-translate-y-1 relative overflow-hidden ${formData.layout === 'wave' ? 'mb-3 mx-auto' : ''}`} 
                    style={{ background: formData.layout === 'glass' ? 'rgba(255,255,255,0.1)' : formData.theme.bg }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent mix-blend-overlay"></div>
                    <span className="text-2xl drop-shadow-xl relative z-10 group-hover:scale-110 transition-transform">{item.icon}</span>
                  </div>
                  <div className={`flex-1 ${formData.layout === 'wave' ? 'text-center w-full overflow-hidden' : 'text-left'}`}>
                    <p className={`text-[10px] uppercase tracking-widest font-extrabold mb-1 ${formData.layout === 'glass' ? 'text-white/60' : isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.label}</p>
                    <p className={`text-sm font-semibold transition-colors drop-shadow-sm truncate ${formData.layout === 'glass' ? 'text-white group-hover:text-white' : isLight ? 'text-zinc-800 group-hover:text-zinc-900' : 'text-zinc-200 group-hover:text-white'}`}>{item.value}</p>
                  </div>
                  {formData.layout !== 'wave' && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${formData.layout === 'glass' ? 'bg-white/20 text-white group-hover:bg-white/30' : isLight ? 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-700' : 'bg-white/5 text-zinc-500 group-hover:bg-white/10 group-hover:text-white'}`}>
                      <Share2 size={12} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links Icons */}
            {formData.socialLinks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {formData.socialLinks.filter(l => l.url).map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border backdrop-blur-md shadow-lg group ${formData.layout === 'glass' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : isLight ? 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300' : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'}`}
                    style={formData.layout !== 'glass' && !isLight ? { background: formData.theme.bg, borderColor: 'transparent' } : undefined}
                  >
                    <span className="drop-shadow-md group-hover:scale-110 transition-transform">{getPlatformIcon(link.platform)}</span>
                  </motion.a>
                ))}
              </div>
            )}

            {/* QR Code Section */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`mt-10 mb-10 w-full p-8 border rounded-3xl flex flex-col items-center backdrop-blur-xl relative overflow-hidden group ${isLight ? 'bg-white/80 border-zinc-200' : 'bg-white/5 border-white/10'}`}
            >
              <div className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40" style={{ background: formData.theme.gradient }}></div>
              <div className="relative z-10 p-4 bg-white rounded-2xl shadow-xl">
                <QRCodeSVG 
                  value={formData.website || formData.email || "https://vcard.pro"} 
                  size={150} fgColor="#000000" bgColor="#ffffff" level="Q"
                />
              </div>
              <p className={`relative z-10 text-[11px] font-bold mt-5 uppercase tracking-widest flex items-center gap-2 ${isLight ? 'text-zinc-500' : 'text-zinc-300'}`}>
                {t("scan_profile") || "Scanner le profil"} <span className="animate-bounce">↓</span>
              </p>
            </motion.div>

          </div>
          </>)}
        </div>
      </motion.div>

      {/* Settings Drawer Overlay */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 z-40 bg-transparent"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-white/10 rounded-t-3xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Personnaliser</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Structure</p>
                <LayoutSelector />
              </div>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Mode UI</p>
                <ModeSelector />
              </div>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Thème & Couleurs</p>
                <ThemeSelector />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
  };

  return (
    <div className="flex h-[100dvh] bg-[#050505] text-zinc-100 overflow-hidden font-sans">
      
      {/* Desktop Split View */}
      <div className="hidden md:flex w-full h-full">
        <EditorPanel />
        <PreviewPanel />
      </div>

      {/* Mobile Tab View */}
      <div className="md:hidden w-full h-full flex flex-col relative">
        <AnimatePresence mode="wait">
          {activeTab === "edit" ? <EditorPanel key="edit" /> : <PreviewPanel key="preview" />}
        </AnimatePresence>

        {/* Mobile Bottom Floating Nav (Glassmorphism) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
          <button 
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${activeTab === "edit" ? "bg-white text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
          >
            <Edit3 size={18} />
            <span>Éditer</span>
          </button>
          <button 
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${activeTab === "preview" ? "bg-white text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
          >
            <Eye size={18} />
            <span>Aperçu</span>
          </button>
        </div>
      </div>

      {/* Publish Success Modal */}
      <AnimatePresence>
        {publishedSlug && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setPublishedSlug(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 z-[70] shadow-2xl flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">vCard Publiée !</h2>
              <p className="text-zinc-400 text-sm mb-6">Votre carte de visite est maintenant en ligne. Vous pouvez partager ce lien :</p>
              
              <div className="w-full flex items-center gap-2 bg-black border border-white/10 rounded-xl p-3 mb-6">
                <LinkIcon size={16} className="text-zinc-500" />
                <input 
                  type="text" 
                  readOnly 
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/v/${publishedSlug}`} 
                  className="bg-transparent border-none outline-none w-full text-sm text-white"
                />
              </div>

              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/v/${publishedSlug}`);
                    alert("Lien copié !");
                  }}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
                >
                  Copier
                </button>
                <a 
                  href={`/v/${publishedSlug}`}
                  target="_blank"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors block"
                >
                  Ouvrir
                </a>
              </div>
              
              <button 
                onClick={() => setPublishedSlug(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
