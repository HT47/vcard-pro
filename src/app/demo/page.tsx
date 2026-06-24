"use client";

import { useState, useRef, useEffect } from "react";
import { Smartphone, Share2, Save, X, Edit3, Eye, UploadCloud, CheckCircle2, Settings2, Plus, Trash2, Link as LinkIcon, Briefcase, Calendar, Building, Activity, CreditCard, Wind, Layers, LayoutTemplate, Box, LayoutDashboard, User, Hexagon, Sun, Star, Tag, Home, LayoutGrid, ArrowRight, Palette } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import LinkInBioTree from "@/components/templates/LinkInBioTree";
import LinkInBioBeacons from "@/components/templates/LinkInBioBeacons";
import LinkInBioSites from "@/components/templates/LinkInBioSites";

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
  const { t, locale, translations, isRTL } = useI18n();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [activeCategoryTab, setActiveCategoryTab] = useState(t("category_cards") || "Cartes & Profils");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [publishedUsername, setPublishedUsername] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    name: t("default_name") || "Alexandre Dubois",
    role: t("default_role") || "Directeur Créatif",
    company: t("default_company") || "NextLevel Agency",
    email: "alex@nextlevel.design",
    phone: "+33 6 12 34 56 78",
    website: "https://nextlevel.design",
    location: t("default_location") || "75008 Paris, France",
    bio: t("default_bio") || "Passionné par le design UI/UX et la création d'expériences numériques mémorables.",
    theme: THEMES[0],
    layout: 'classic-pro',
    mode: 'dark',
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

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();
        if (profileData) {
          setFormData(prev => ({ ...prev, username: profileData.username }));
        }
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setShowLoginModal(true);
      return;
    }

    setIsPublishing(true);
    const slug = Math.random().toString(36).substring(2, 10);

    // Mettre à jour l'identifiant public (sous-domaine/username)
    if (formData.username && formData.username.trim() !== '') {
      const usernameClean = formData.username.toLowerCase().replace(/\s/g, '-');
      await supabase.from('profiles').update({ username: usernameClean }).eq('id', session.user.id);
      setPublishedUsername(usernameClean);
    } else {
      const { data: profileData } = await supabase.from('profiles').select('username').eq('id', session.user.id).single();
      if (profileData?.username) setPublishedUsername(profileData.username);
    }

    const { count } = await supabase
      .from('vcards')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('is_primary', true);
    
    const isPrimary = (count ?? 0) === 0;

    const { error } = await supabase
      .from('vcards')
      .insert([{ slug, data: formData, user_id: session.user.id, is_primary: isPrimary }]);

    setIsPublishing(false);
    if (!error) {
      setPublishedSlug(slug);
    } else {
      alert(t("error_publish") || 'Erreur lors de la publication : ' + error.message);
    }
  };

  const LayoutSelector = () => {
    const categories = [
      {
        name: t("category_links") || 'Liens en Bio',
        icon: <LinkIcon size={16} className="text-purple-400" />,
        layouts: [
          { id: 'link-tree', label: 'Classic Tree', icon: <Box size={20} strokeWidth={1.5} /> },
          { id: 'link-beacons', label: 'Creator Pro', icon: <Star size={20} strokeWidth={1.5} /> },
          { id: 'link-biosites', label: 'Minimal Site', icon: <LayoutTemplate size={20} strokeWidth={1.5} /> },
        ]
      },
      {
        name: t("category_cards") || 'Cartes & Profils',
        icon: <Briefcase size={16} className="text-blue-400" />,
        layouts: [
          { id: 'structure-pro', label: 'Structure', icon: <LayoutDashboard size={20} strokeWidth={1.5} /> },
          { id: 'classic-pro', label: 'Classic Pro', icon: <CreditCard size={20} strokeWidth={1.5} /> },
          { id: 'wave-pro', label: 'Wave Pro', icon: <Wind size={20} strokeWidth={1.5} /> },
          { id: 'glass-pro', label: 'Glass Pro', icon: <Layers size={20} strokeWidth={1.5} /> },
          { id: 'freelance-pro', label: 'Freelance', icon: <User size={20} strokeWidth={1.5} /> },
          { id: 'pro-v1', label: 'Corporate', icon: <Briefcase size={20} strokeWidth={1.5} /> },
          { id: 'pro-v2', label: 'Executive', icon: <Briefcase size={20} strokeWidth={1.5} /> },
          { id: 'pro-v3', label: 'Geometric', icon: <Hexagon size={20} strokeWidth={1.5} /> },
          { id: 'pro-v4', label: 'Bright', icon: <Sun size={20} strokeWidth={1.5} /> },
        ]
      },
      {
        name: t("category_events") || 'Agendas & Événements',
        icon: <Calendar size={16} className="text-emerald-400" />,
        layouts: [
          { id: 'agenda-jour', label: 'Journée', icon: <Calendar size={20} strokeWidth={1.5} /> },
          { id: 'agenda-semaine', label: 'Semaine', icon: <Calendar size={20} strokeWidth={1.5} /> },
          { id: 'event-gradient', label: 'Gradient', icon: <Star size={20} strokeWidth={1.5} /> },
          { id: 'event-retro', label: 'Retro', icon: <Tag size={20} strokeWidth={1.5} /> }
        ]
      },
      {
        name: t("category_realestate") || 'Immobilier',
        icon: <Building size={16} className="text-orange-400" />,
        layouts: [
          { id: 'immo-simple', label: 'Simple', icon: <Home size={20} strokeWidth={1.5} /> },
          { id: 'immo-modern', label: 'Modern', icon: <Building size={20} strokeWidth={1.5} /> },
          { id: 'immo-grid', label: 'Grid', icon: <LayoutGrid size={20} strokeWidth={1.5} /> }
        ]
      },
      {
        name: t("category_fitness") || 'Fitness & Bien-être',
        icon: <Activity size={16} className="text-rose-400" />,
        layouts: [
          { id: 'yoga-poster', label: 'Affiche', icon: <Activity size={20} strokeWidth={1.5} /> },
          { id: 'yoga-schedule', label: 'Planning', icon: <Activity size={20} strokeWidth={1.5} /> }
        ]
      }
    ];

    return (
      <div className="space-y-4 w-full">
        {/* Horizontal Menu Tabs */}
        <div className="flex overflow-x-auto gap-2 scrollbar-hide border-b border-white/10 pb-[-1px]">
          {categories.map((category) => {
            const isActive = activeCategoryTab === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategoryTab(category.name)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${isActive ? 'border-white text-white bg-white/[0.03] shadow-[inset_0_-2px_10px_rgba(255,255,255,0.05)]' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'}`}
              >
                <div className={`p-1 rounded-md transition-colors ${isActive ? 'bg-white/10' : 'bg-transparent'}`}>
                  {category.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {categories.filter(c => c.name === activeCategoryTab).map((category) => (
            <div key={category.name} className="grid grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {category.layouts.map((layoutObj) => {
                const isActive = formData.layout === layoutObj.id;
                return (
                  <motion.button
                    key={layoutObj.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, layout: layoutObj.id }))}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all overflow-hidden group ${isActive ? 'bg-gradient-to-br from-white/10 to-white/5 border-white shadow-xl shadow-white/5' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/30'}`}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 size={14} className="text-white drop-shadow-md" />
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${isActive ? 'bg-white text-black shadow-lg shadow-white/20' : 'bg-black/30 text-zinc-400 group-hover:text-white group-hover:bg-white/10 border border-white/5'}`}>
                      {layoutObj.icon}
                    </div>
                    
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {layoutObj.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTemplatePreview = () => {
    const props = { data: formData };
    switch (formData.layout) {
      case 'link-tree': return <LinkInBioTree {...props} />;
      case 'link-beacons': return <LinkInBioBeacons {...props} />;
      case 'link-biosites': return <LinkInBioSites {...props} />;
      case 'pro-v1': return <BusinessCardV1 {...props} />;
      case 'pro-v2': return <BusinessCardV2 {...props} />;
      case 'agenda-jour': return <DailySchedule {...props} />;
      case 'agenda-semaine': return <WeeklyEvents {...props} />;
      case 'yoga-poster': return <YogaPoster {...props} />;
      case 'yoga-schedule': return <YogaSchedule {...props} />;
      case 'immo-simple': return <RealEstateSimple {...props} />;
      case 'immo-modern': return <RealEstateModern {...props} />;
      case 'immo-grid': return <RealEstateGrid {...props} />;
      case 'pro-v3': return <BusinessCardV3 {...props} />;
      case 'pro-v4': return <BusinessCardV4 {...props} />;
      case 'event-gradient': return <EventFlyerV1 {...props} />;
      case 'event-retro': return <EventFlyerV2 {...props} />;
      case 'structure-pro': return <BusinessCardStructure {...props} />;
      case 'wave-pro': return <BusinessCardWave {...props} />;
      case 'glass-pro': return <BusinessCardGlass {...props} />;
      case 'freelance-pro': return <BusinessCardFreelance {...props} />;
      case 'classic-pro':
      default: return <BusinessCardClassic {...props} />;
    }
  };

  return (
    <div className="flex h-[100dvh] w-full bg-[#050505] text-white overflow-hidden font-sans" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* SUCCESS MODAL - PRO MAX */}
      <AnimatePresence>
        {publishedSlug && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <CheckCircle2 size={40} className="text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("publish_success") || "Félicitations !"}</h2>
              <p className="text-zinc-400 text-sm mb-8">
                {t("vcard_is_live") || "Votre vCard est désormais en ligne et prête à être partagée."}
              </p>
              
              <div className="flex flex-col w-full gap-3">
                <Link
                  href={publishedUsername ? `/u/${publishedUsername}` : `/v/${publishedSlug}`}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-transform"
                >
                  <Eye size={18} />
                  {t("view_my_vcard") || "Voir ma vCard"}
                </Link>
                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  <LayoutDashboard size={18} />
                  {t("go_to_dashboard") || "Aller au Dashboard"}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGIN REQUIRED MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2">{t("login_required") || "Connexion requise"}</h2>
              <p className="text-zinc-400 text-sm mb-8">
                {t("login_to_publish") || "Vous devez être connecté pour publier et sauvegarder votre vCard."}
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/login" className="py-4 bg-white text-black rounded-xl font-bold text-sm">{t("login_action") || "Se connecter"}</Link>
                <Link href="/register" className="py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-sm text-white">{t("create_my_vcard") || "Créer un compte"}</Link>
                <button onClick={() => setShowLoginModal(false)} className="mt-2 text-zinc-500 text-xs hover:text-white">{t("cancel") || "Annuler"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE TABS (Hidden on md+) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-center gap-2 px-6">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === "edit" ? "bg-white text-black" : "bg-white/5 text-zinc-400"}`}
        >
          <Edit3 size={16} /> Éditer
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === "preview" ? "bg-white text-black" : "bg-white/5 text-zinc-400"}`}
        >
          <Eye size={16} /> Aperçu
        </button>
      </div>

      {/* LEFT PANEL - Editor (Pro Max UI) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`w-full md:w-1/2 lg:w-[45%] h-full flex flex-col bg-[#050505] border-r border-white/10 z-10 ${activeTab === "edit" ? "flex" : "hidden md:flex"}`}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              V
            </Link>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">{t('editor_title') || "Studio Créatif"}</h1>
              <p className="text-[10px] text-zinc-400 font-medium">Édition en temps réel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors" title="Tableau de bord">
              <Home size={16} className="text-zinc-300" />
            </Link>
            <LanguageSwitcher />
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-200 text-black rounded-full text-xs font-bold transition-all shadow-xl active:scale-95"
            >
              {isPublishing ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> : <UploadCloud size={16} />}
              {t("publish") || "Publier"}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-10 scrollbar-hide pb-32 md:pb-8">
          
          <section className="space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Palette size={14} /> Design & Layout
            </h2>
            <LayoutSelector />
            
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400">{t("theme_color") || "Couleur du thème"}</h3>
              <div className="flex flex-wrap gap-3">
                {THEMES.slice(0, 8).map(theme => (
                  <button 
                    key={theme.id}
                    onClick={() => setFormData(prev => ({ ...prev, theme }))}
                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${formData.theme.id === theme.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}
                    style={{ background: theme.bg }}
                  >
                    {formData.theme.id === theme.id && <CheckCircle2 size={16} className="text-white drop-shadow-md" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400">{t("mode") || "Mode d'affichage"}</h3>
              <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                {['dark', 'light'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFormData(prev => ({ ...prev, mode }))}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${formData.mode === mode ? 'bg-white text-black shadow-md' : 'text-zinc-500 hover:text-white'}`}
                  >
                    {mode === 'dark' ? 'Nuit (Sombre)' : 'Jour (Clair)'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6 pt-8 border-t border-white/10">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <User size={14} /> Profil & Contact
            </h2>
            
            {/* PUBLIC URL / USERNAME INTEGRATION */}
            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl mb-4">
              <label className="block text-[11px] font-bold text-blue-400 mb-2 tracking-wider uppercase">
                Identifiant (Lien de sous-domaine)
              </label>
              <div className="relative">
                <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all" 
                  placeholder="votre-identifiant (ex: digitale4747)" 
                />
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">Ce lien sera utilisé pour votre profil public (ex: hosyardigital.com/u/votre-identifiant)</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('full_name') || "Nom complet"}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('role') || "Poste"}</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('company') || "Entreprise"}</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('bio') || "Biographie"}</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Téléphone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Site Web</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Adresse</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" />
              </div>
            </div>
          </section>

          <section className="space-y-6 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <LinkIcon size={14} /> Réseaux & Liens
              </h2>
              <button onClick={addSocialLink} className="flex items-center gap-1 text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                <Plus size={12} /> {t("add") || "Ajouter"}
              </button>
            </div>
            <div className="space-y-3">
              {formData.socialLinks.map((link) => (
                <div key={link.id} className="flex gap-2 items-center bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                  <input type="text" placeholder="Nom/Icone" value={link.platform} onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)} className="w-1/3 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
                  <div className="w-[1px] h-6 bg-white/10 mx-1" />
                  <input type="text" placeholder="URL ou Texte" value={link.url} onChange={(e) => updateSocialLink(link.id, "url", e.target.value)} className="flex-1 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
                  <button onClick={() => removeSocialLink(link.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {formData.layout === 'agenda-jour' && (
            <section className="space-y-6 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Calendar size={14} /> Programme Journée
                </h2>
                <button onClick={addScheduleItem} className="flex items-center gap-1 text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus size={12} /> {t("add") || "Ajouter"}
                </button>
              </div>
              <div className="space-y-3">
                {formData.scheduleData.map((item) => (
                  <div key={item.id} className="flex gap-2 items-center bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                    <input type="text" placeholder="Heure" value={item.time} onChange={(e) => updateScheduleItem(item.id, "time", e.target.value)} className="w-1/4 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
                    <div className="w-[1px] h-6 bg-white/10 mx-1" />
                    <input type="text" placeholder="Tâche" value={item.task} onChange={(e) => updateScheduleItem(item.id, "task", e.target.value)} className="flex-1 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
                    <button onClick={() => removeScheduleItem(item.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {formData.layout === 'agenda-semaine' && (
            <section className="space-y-6 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Calendar size={14} /> Événements
                </h2>
                <button onClick={addEventItem} className="flex items-center gap-1 text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus size={12} /> {t("add") || "Ajouter"}
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

        </div>
      </motion.div>

      {/* RIGHT PANEL - Preview */}
      <div className={`flex-1 h-full bg-[#111] md:bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center ${activeTab === "preview" ? "flex" : "hidden md:flex"}`}>
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 blur-[100px] rounded-full transition-all duration-700" style={{ background: formData.theme.bg }} />
        </div>

        {/* Floating Tooltip Desktop */}
        <div className="hidden md:flex absolute top-6 right-6 items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-xs font-semibold text-zinc-400 shadow-2xl">
          <Smartphone size={14} />
          {t("live_preview") || "Aperçu en direct"}
        </div>

        {/* Mobile Device Frame Desktop */}
        <div className="relative w-full h-full md:h-[85vh] md:w-[390px] md:rounded-[45px] md:border-[8px] border-[#222] bg-[#050505] shadow-2xl overflow-hidden shadow-black/50 ring-1 ring-white/5 flex flex-col">
          
          {/* iOS Notch Mockup */}
          <div className="hidden md:block absolute top-0 inset-x-0 h-6 z-50 pointer-events-none">
            <div className="w-[120px] h-6 bg-[#222] mx-auto rounded-b-2xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-black rounded-full" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto w-full h-full scrollbar-hide relative bg-[#050505]">
            <AnimatePresence mode="wait">
              <motion.div
                key={formData.layout + formData.mode + formData.theme.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`w-full min-h-full ${formData.mode === 'light' ? 'bg-white text-black' : ''}`}
              >
                {renderTemplatePreview()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
