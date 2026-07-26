"use client";

import { useState, useRef, useEffect } from "react";
import { Smartphone, Share2, Save, X, Edit3, Eye, UploadCloud, CheckCircle2, Settings2, Plus, Trash2, Link as LinkIcon, Briefcase, Calendar, Building, Activity, CreditCard, Wind, Layers, LayoutTemplate, Box, LayoutDashboard, User, Hexagon, Sun, Star, Tag, Home, LayoutGrid, ArrowRight, Palette, ChevronDown, List, Hash, Utensils } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/context/I18nContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { supabase } from "@/lib/supabase";

// Existing Templates
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

// NEW PRO MAX TEMPLATES
import TemplateRestoOwner from "@/components/templates/TemplateRestoOwner";
import TemplateEntrepreneur from "@/components/templates/TemplateEntrepreneur";
import TemplateCreator from "@/components/templates/TemplateCreator";
import TemplateRestaurant from "@/components/templates/TemplateRestaurant";
import TemplateFreelanceDark from "@/components/templates/TemplateFreelanceDark";
import TemplateCoachWarm from "@/components/templates/TemplateCoachWarm";
import TemplateRestaurantAdvanced from "@/components/templates/TemplateRestaurantAdvanced";

// Compression d'image côté client
const compressImage = (file: File, maxWidth = 800, maxHeight = 800): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(event.target?.result as string);
      };
    };
    reader.onerror = () => {
      resolve("");
    };
  });
};

const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

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
  
  // MOBILE PRO MAX: Active Panel state ('none' means full live preview)
  const [activePanel, setActivePanel] = useState<"none" | "design" | "profile" | "links">("none");
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
    quote: "Développez votre potentiel, transformez votre vie.",
    skills: ['Branding', 'UI/UX', 'Illustration', 'Print', 'Web Design'],
    stats: [
      { id: "1", platform: 'YouTube', count: '125K', label: 'Abonnés' },
      { id: "2", platform: 'Instagram', count: '89K', label: 'Abonnés' },
      { id: "3", platform: 'TikTok', count: '150K', label: 'Abonnés' }
    ],
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
    menu: [
      { id: "1", name: "Carpaccio de Bœuf", desc: "Fines tranches de bœuf, roquette, parmesan.", price: "€14.90", category: "Entrées", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=200&q=80" },
      { id: "2", name: "Pâtes à la Truffe", desc: "Tagliatelles fraîches, crème de truffe, parmesan.", price: "€18.90", category: "Plats", isChef: true, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=200&q=80" },
      { id: "3", name: "Fondant au Chocolat", desc: "Cœur coulant, glace vanille, coulis de chocolat.", price: "€7.90", category: "Desserts", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=200&q=80" }
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

  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [...prev.stats, { id: Date.now().toString(), platform: "YouTube", count: "10K", label: "Abonnés" }]
    }));
  };
  const removeStat = (id: string) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.filter(stat => stat.id !== id)
    }));
  };
  const updateStat = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.map(stat => stat.id === id ? { ...stat, [field]: value } : stat)
    }));
  };

  const addMenuItem = () => {
    setFormData(prev => ({
      ...prev,
      menu: [...prev.menu, { id: Date.now().toString(), name: "Nouveau plat", desc: "Description", price: "€10.00", category: "Plats", img: "" }]
    }));
  };
  const removeMenuItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.filter(item => item.id !== id)
    }));
  };
  const updateMenuItem = (id: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.map(item => item.id === id ? { ...item, [field]: value } : item)
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'coverUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);
      if (compressedBase64) {
        setFormData(prev => ({ ...prev, [field]: compressedBase64 }));
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${field}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        const uploadFile = dataURLtoFile(compressedBase64, fileName);

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, uploadFile);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

          if (publicUrl) {
            setFormData(prev => ({ ...prev, [field]: publicUrl }));
          }
        } else {
          console.warn("Supabase storage upload failed:", uploadError.message);
        }
      }
    } catch (err) {
      console.error("Error in handleImageUpload:", err);
    }
  };

  const handlePublish = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setShowLoginModal(true);
      return;
    }

    setIsPublishing(true);
    let slug = Math.random().toString(36).substring(2, 10);

    if (formData.username && formData.username.trim() !== '') {
      const usernameClean = formData.username.toLowerCase().replace(/[^a-z0-9-]/g, '');
      await supabase.from('profiles').update({ username: usernameClean }).eq('id', session.user.id);
      setPublishedUsername(usernameClean);
      slug = usernameClean;
      
      const { data: existingVcard } = await supabase.from('vcards').select('id, user_id').eq('slug', slug).single();
      if (existingVcard && existingVcard.user_id !== session.user.id) {
         slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
      } else if (existingVcard && existingVcard.user_id === session.user.id) {
         const { error } = await supabase.from('vcards').update({ data: formData }).eq('id', existingVcard.id);
         setIsPublishing(false);
         if (!error) setPublishedSlug(slug);
         else alert(t("error_publish") || 'Erreur lors de la publication : ' + error.message);
         return;
      }
    } else {
      const { data: profileData } = await supabase.from('profiles').select('username').eq('id', session.user.id).single();
      if (profileData?.username) {
        setPublishedUsername(profileData.username);
        slug = profileData.username;
        const { data: existingVcard } = await supabase.from('vcards').select('id, user_id').eq('slug', slug).single();
        if (existingVcard && existingVcard.user_id !== session.user.id) {
           slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
        } else if (existingVcard && existingVcard.user_id === session.user.id) {
           const { error } = await supabase.from('vcards').update({ data: formData }).eq('id', existingVcard.id);
           setIsPublishing(false);
           if (!error) setPublishedSlug(slug);
           else alert(t("error_publish") || 'Erreur lors de la publication : ' + error.message);
           return;
        }
      }
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

  const renderTemplatePreview = () => {
    const props = { data: formData };
    switch (formData.layout) {
      case 'pro-resto-owner': return <TemplateRestoOwner {...props} />;
      case 'pro-entrepreneur': return <TemplateEntrepreneur {...props} />;
      case 'pro-creator': return <TemplateCreator {...props} />;
      case 'pro-restaurant': return <TemplateRestaurant {...props} />;
      case 'pro-freelance-dark': return <TemplateFreelanceDark {...props} />;
      case 'pro-coach-warm': return <TemplateCoachWarm {...props} />;
      case 'pro-restaurant-adv': return <TemplateRestaurantAdvanced {...props} />;
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

  const LayoutSelector = () => {
    const categories = [
      {
        name: 'Métiers Pro Max',
        icon: <Star size={16} className="text-yellow-400" />,
        layouts: [
          { id: 'pro-entrepreneur', label: 'Entrepreneur', icon: <Briefcase size={20} strokeWidth={1.5} /> },
          { id: 'pro-creator', label: 'Créateur', icon: <User size={20} strokeWidth={1.5} /> },
          { id: 'pro-restaurant-adv', label: 'Resto App', icon: <Utensils size={20} strokeWidth={1.5} /> },
          { id: 'pro-freelance-dark', label: 'Designer', icon: <Palette size={20} strokeWidth={1.5} /> },
          { id: 'pro-coach-warm', label: 'Coach', icon: <User size={20} strokeWidth={1.5} /> },
          { id: 'pro-restaurant', label: 'Resto Simple', icon: <Utensils size={20} strokeWidth={1.5} /> },
          { id: 'pro-resto-owner', label: 'Propriétaire', icon: <User size={20} strokeWidth={1.5} /> },
        ]
      },
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
        name: t("category_events") || 'Agendas',
        icon: <Calendar size={16} className="text-emerald-400" />,
        layouts: [
          { id: 'agenda-jour', label: 'Journée', icon: <Calendar size={20} strokeWidth={1.5} /> },
          { id: 'agenda-semaine', label: 'Semaine', icon: <Calendar size={20} strokeWidth={1.5} /> },
        ]
      }
    ];

    return (
      <div className="space-y-4 w-full">
        <div className="flex overflow-x-auto gap-1.5 p-1.5 bg-[#111] border border-white/5 rounded-2xl [&::-webkit-scrollbar]:hidden w-full ring-1 ring-white/10">
          {categories.map((category) => {
            const isActive = activeCategoryTab === category.name || (activeCategoryTab === 'Cartes & Profils' && category.name === 'Métiers Pro Max' && !categories.some(c=>c.name===activeCategoryTab));
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategoryTab(category.name)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-white/10 text-white shadow-lg border border-white/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'}`}
              >
                <div className={`transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  {category.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider">{category.name}</span>
              </button>
            );
          })}
        </div>
        <div className="pt-2">
          {categories.filter(c => c.name === activeCategoryTab || (activeCategoryTab === 'Cartes & Profils' && c.name === 'Métiers Pro Max')).map((category) => (
            <div key={category.name} className="grid grid-cols-3 lg:grid-cols-4 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {category.layouts.map((layoutObj) => {
                const isActive = formData.layout === layoutObj.id;
                return (
                  <motion.button
                    key={layoutObj.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, layout: layoutObj.id }))}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all overflow-hidden group ${isActive ? 'bg-white/10 border-white shadow-md' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20'}`}
                  >
                    {isActive && (
                      <div className="absolute top-1.5 right-1.5">
                        <CheckCircle2 size={12} className="text-white drop-shadow-md" />
                      </div>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${isActive ? 'bg-white text-black shadow-md' : 'bg-black/30 text-zinc-400 group-hover:text-white group-hover:bg-white/10 border border-white/5'}`}>
                      <div className="scale-75">{layoutObj.icon}</div>
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider text-center ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
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

  const SectionDesign = () => (
    <div className="space-y-6">
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
              className={`w-10 h-10 rounded-full transition-all flex items-center justify-center shadow-lg ${formData.theme.id === theme.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}
              style={{ background: theme.bg }}
            >
              {formData.theme.id === theme.id && <CheckCircle2 size={16} className="text-white drop-shadow-md" />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 space-y-4">
        <h3 className="text-xs font-semibold text-zinc-400">{t("mode") || "Mode d'affichage"}</h3>
        <div className="flex gap-2 p-1 bg-black/40 rounded-xl border border-white/10">
          {['dark', 'light'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFormData(prev => ({ ...prev, mode }))}
              className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${formData.mode === mode ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              {mode === 'dark' ? 'Nuit (Sombre)' : 'Jour (Clair)'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const SectionProfile = () => (
    <div className="space-y-6">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
        <User size={14} /> Profil & Contact
      </h2>
      
      <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
        <label className="block text-[11px] font-bold text-blue-400 mb-2 tracking-wider uppercase">
          Lien personnalisé
        </label>
        <div className="relative">
          <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all" 
            placeholder="votre-identifiant" 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('full_name') || "Nom complet"}</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
      </div>

      <div className="grid grid-cols-2 gap-4 pb-2">
        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-zinc-400 mx-1">Photo Profil / Logo</label>
          <div className="relative w-full aspect-square max-w-[140px] rounded-2xl bg-white/[0.02] border border-white/10 p-2 flex flex-col items-center justify-center group/avatar transition-all duration-300 hover:border-white/20 overflow-hidden">
            {formData.avatarUrl ? (
              <div className="relative w-full h-full">
                <img src={formData.avatarUrl} className="w-full h-full object-cover rounded-xl" alt="Avatar" />
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, avatarUrl: "" }))}
                  className="absolute top-1.5 right-1.5 p-1.5 bg-black/60 hover:bg-red-500/80 text-white rounded-lg transition-colors z-20 backdrop-blur-md"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5 text-zinc-500 text-center p-3 h-full">
                <UploadCloud size={24} className="text-zinc-400" />
                <span className="text-[10px]">Importer</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer z-10">
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatarUrl')} className="absolute inset-0 opacity-0 cursor-pointer" />
              <UploadCloud size={20} className="text-white" />
              <span className="text-[10px] text-white font-medium">Modifier</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-zinc-400 mx-1">Couverture</label>
          <div className="relative w-full aspect-square max-w-[140px] rounded-2xl bg-white/[0.02] border border-white/10 p-2 flex flex-col items-center justify-center group/cover transition-all duration-300 hover:border-white/20 overflow-hidden">
            {formData.coverUrl ? (
              <div className="relative w-full h-full">
                <img src={formData.coverUrl} className="w-full h-full object-cover rounded-xl" alt="Cover" />
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, coverUrl: "" }))}
                  className="absolute top-1.5 right-1.5 p-1.5 bg-black/60 hover:bg-red-500/80 text-white rounded-lg transition-colors z-20 backdrop-blur-md"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5 text-zinc-500 text-center p-3 h-full">
                <UploadCloud size={24} className="text-zinc-400" />
                <span className="text-[10px]">Importer</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer z-10">
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'coverUrl')} className="absolute inset-0 opacity-0 cursor-pointer" />
              <UploadCloud size={20} className="text-white" />
              <span className="text-[10px] text-white font-medium">Modifier</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('role') || "Poste / Titre"}</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('company') || "Entreprise"}</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">{t('bio') || "Biographie"}</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all resize-none" />
      </div>

      {/* Spécifique Freelance (Skills) */}
      {(formData.layout === 'pro-freelance-dark' || formData.layout === 'freelance-pro') && (
        <div className="pt-4">
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">Compétences (séparées par une virgule)</label>
          <input 
            type="text" 
            value={formData.skills.join(', ')} 
            onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value.split(',').map(s=>s.trim()) }))}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" 
            placeholder="Ex: Branding, UI/UX, Illustration"
          />
        </div>
      )}

      {/* Spécifique Coach (Quote) */}
      {formData.layout === 'pro-coach-warm' && (
        <div className="pt-4">
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 mx-1">Citation / Mantra</label>
          <textarea 
            name="quote" 
            value={formData.quote} 
            onChange={handleChange} 
            rows={2} 
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all resize-none" 
            placeholder="Ex: Développez votre potentiel..."
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Téléphone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Site Web</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 ml-1">Adresse</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
        </div>
      </div>
    </div>
  );

  const SectionLinks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <LinkIcon size={14} /> Réseaux Sociaux
        </h2>
        <button onClick={addSocialLink} className="flex items-center gap-1 text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
          <Plus size={12} /> {t("add") || "Ajouter"}
        </button>
      </div>
      <div className="space-y-3">
        {formData.socialLinks.map((link) => (
          <div key={link.id} className="flex gap-2 items-center bg-white/[0.02] border border-white/5 p-2 rounded-xl">
            <input type="text" placeholder="Nom" value={link.platform} onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)} className="w-1/3 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
            <div className="w-[1px] h-6 bg-white/10 mx-1" />
            <input type="text" placeholder="URL" value={link.url} onChange={(e) => updateSocialLink(link.id, "url", e.target.value)} className="flex-1 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
            <button onClick={() => removeSocialLink(link.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Spécifique Créateur (Stats) */}
      {formData.layout === 'pro-creator' && (
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Hash size={14} /> Statistiques
            </h2>
            <button onClick={addStat} className="flex items-center gap-1 text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
              <Plus size={12} /> {t("add") || "Ajouter"}
            </button>
          </div>
          <div className="space-y-3">
            {formData.stats.map((stat) => (
              <div key={stat.id} className="flex gap-2 items-center bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                <input type="text" placeholder="Plateforme" value={stat.platform} onChange={(e) => updateStat(stat.id, "platform", e.target.value)} className="w-1/3 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
                <div className="w-[1px] h-6 bg-white/10 mx-1" />
                <input type="text" placeholder="Compte (125K)" value={stat.count} onChange={(e) => updateStat(stat.id, "count", e.target.value)} className="w-1/4 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
                <div className="w-[1px] h-6 bg-white/10 mx-1" />
                <input type="text" placeholder="Label" value={stat.label} onChange={(e) => updateStat(stat.id, "label", e.target.value)} className="flex-1 bg-transparent px-2 py-2 text-sm text-white focus:outline-none" />
                <button onClick={() => removeStat(stat.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spécifique Restaurant (Menu) */}
      {formData.layout === 'pro-restaurant-adv' && (
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Utensils size={14} /> Menu du Restaurant
            </h2>
            <button onClick={addMenuItem} className="flex items-center gap-1 text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
              <Plus size={12} /> {t("add") || "Ajouter"}
            </button>
          </div>
          <div className="space-y-4">
            {formData.menu.map((item) => (
              <div key={item.id} className="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-zinc-400">Plat</span>
                  <button onClick={() => removeMenuItem(item.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Catégorie (Entrées, Plats)" value={item.category} onChange={(e) => updateMenuItem(item.id, "category", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                  <input type="text" placeholder="Prix (ex: €14.90)" value={item.price} onChange={(e) => updateMenuItem(item.id, "price", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                </div>
                <input type="text" placeholder="Nom du plat" value={item.name} onChange={(e) => updateMenuItem(item.id, "name", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
                <textarea placeholder="Description" value={item.desc} onChange={(e) => updateMenuItem(item.id, "desc", e.target.value)} rows={2} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none resize-none" />
                <input type="text" placeholder="URL Image" value={item.img} onChange={(e) => updateMenuItem(item.id, "img", e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spécifique Agenda Jour */}
      {formData.layout === 'agenda-jour' && (
        <div className="pt-8 border-t border-white/10 space-y-4">
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
        </div>
      )}

      {/* Spécifique Agenda Semaine */}
      {formData.layout === 'agenda-semaine' && (
        <div className="pt-8 border-t border-white/10 space-y-4">
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
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-[100dvh] w-full bg-[#050505] text-white overflow-hidden font-sans" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {publishedSlug && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl flex flex-col items-center relative overflow-hidden"
            >
              <button onClick={() => setPublishedSlug(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <CheckCircle2 size={40} className="text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("publish_success") || "Félicitations !"}</h2>
              <p className="text-zinc-400 text-sm mb-6">
                {t("vcard_is_live") || "Votre vCard est désormais en ligne avec votre sous-domaine."}
              </p>
              
              <div className="w-full flex flex-col items-center gap-4 bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8">
                <div className="p-3 bg-white rounded-xl shadow-xl">
                  <QRCodeSVG 
                    value={`${process.env.NODE_ENV === 'production' ? 'https://' : 'http://'}${publishedSlug}.${process.env.NODE_ENV === 'production' ? 'hosyardigital.com' : 'localhost:3000'}`} 
                    size={120} 
                    fgColor="#000" 
                    bgColor="#fff" 
                    level="Q" 
                  />
                </div>
                <div className="w-full">
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Votre Sous-domaine</p>
                  <p className="text-sm font-mono text-emerald-400 bg-emerald-400/10 py-2 px-3 rounded-lg border border-emerald-400/20 truncate">
                    {process.env.NODE_ENV === 'production' ? 'https://' : 'http://'}{publishedSlug}.{process.env.NODE_ENV === 'production' ? 'hosyardigital.com' : 'localhost:3000'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={() => {
                    const url = `${process.env.NODE_ENV === 'production' ? 'https://' : 'http://'}${publishedSlug}.${process.env.NODE_ENV === 'production' ? 'hosyardigital.com' : 'localhost:3000'}`;
                    navigator.clipboard.writeText(url);
                    alert(t("copied") || "Copié !");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-transform"
                >
                  <Share2 size={18} />
                  {t("copy_link") || "Copier le lien"}
                </button>
                <div className="flex gap-3">
                  <Link
                    href={`/v/${publishedSlug}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-bold text-sm transition-colors"
                  >
                    <Eye size={16} />
                    {t("view") || "Voir"}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold text-sm transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    {t("dashboard") || "Dashboard"}
                  </Link>
                </div>
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

      {/* BACKGROUND LIVE PREVIEW (Hero on Mobile, Right Panel on Desktop) */}
      <div className={`absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 md:relative md:flex-1 md:h-full md:bg-[#0a0a0a] ${activePanel !== 'none' ? 'scale-95 opacity-80 md:scale-100 md:opacity-100' : 'scale-100 opacity-100'}`}>
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-30 blur-[100px] rounded-full transition-all duration-700" style={{ background: formData.theme.bg }} />
        </div>

        {/* Mobile Top Header (Glass) - Hidden on desktop */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-safe flex justify-between items-center z-10 md:hidden bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <Link href="/dashboard" className="pointer-events-auto w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg">
            <Home size={18} />
          </Link>
          <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 text-xs font-bold shadow-xl">
            <Smartphone size={14} className="text-zinc-400" /> Live Preview
          </div>
          <button onClick={handlePublish} disabled={isPublishing} className="pointer-events-auto w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold shadow-xl active:scale-95 transition-transform">
            {isPublishing ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <UploadCloud size={18} />}
          </button>
        </div>

        {/* Desktop Device Frame */}
        <div className="relative w-full h-full md:h-[85vh] md:w-[390px] md:rounded-[45px] md:border-[8px] border-[#222] bg-[#050505] shadow-2xl overflow-hidden shadow-black/50 md:ring-1 ring-white/5 flex flex-col">
          {/* iOS Notch Mockup Desktop */}
          <div className="hidden md:block absolute top-0 inset-x-0 h-6 z-50 pointer-events-none">
            <div className="w-[120px] h-6 bg-[#222] mx-auto rounded-b-2xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-black rounded-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto w-full h-full [&::-webkit-scrollbar]:hidden relative bg-[#050505]">
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

      {/* MOBILE BOTTOM DOCK (Pro Max UI) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <button 
          onClick={() => setActivePanel(activePanel === 'design' ? 'none' : 'design')}
          className={`flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold transition-all ${activePanel === 'design' ? 'bg-white text-black scale-105' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <Palette size={18} /> {activePanel === 'design' && <span>Design</span>}
        </button>
        <button 
          onClick={() => setActivePanel(activePanel === 'profile' ? 'none' : 'profile')}
          className={`flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold transition-all ${activePanel === 'profile' ? 'bg-white text-black scale-105' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <User size={18} /> {activePanel === 'profile' && <span>Profil</span>}
        </button>
        <button 
          onClick={() => setActivePanel(activePanel === 'links' ? 'none' : 'links')}
          className={`flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold transition-all ${activePanel === 'links' ? 'bg-white text-black scale-105' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
        >
          <LinkIcon size={18} /> {activePanel === 'links' && <span>Liens</span>}
        </button>
      </div>

      {/* MOBILE BOTTOM SHEET OVERLAY */}
      <AnimatePresence>
        {activePanel !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-x-0 bottom-0 h-[75vh] z-50 bg-[#0a0a0a]/90 backdrop-blur-3xl border-t border-white/10 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            <div className="w-full flex justify-center py-4 cursor-pointer" onClick={() => setActivePanel('none')}>
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-32 [&::-webkit-scrollbar]:hidden">
              {activePanel === 'design' && <SectionDesign />}
              {activePanel === 'profile' && <SectionProfile />}
              {activePanel === 'links' && <SectionLinks />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP LEFT PANEL (Editor) */}
      <div className="hidden md:flex flex-col w-[45%] h-full bg-[#050505] border-r border-white/10 z-10 order-first">
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

        <div className="flex-1 overflow-y-auto p-8 space-y-12 [&::-webkit-scrollbar]:hidden pb-12">
          <SectionDesign />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <SectionProfile />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <SectionLinks />
        </div>
      </div>
    </div>
  );
}
