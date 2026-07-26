import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Scissors, Calendar, Sparkles, Heart, ChevronRight } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateBeauty({ data }: Props) {
  const primaryColor = data.theme?.color || '#ec4899'; // Default Pink
  const bgStyle = data.theme?.type === 'dark' ? 'bg-[#1a1518] text-white' : 'bg-[#fff5f8] text-slate-800';
  const cardBg = data.theme?.type === 'dark' ? 'bg-[#2a2226]' : 'bg-white';

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden pb-24`}>
      {/* Top Cover Image with Wave */}
      <div className="relative w-full h-[320px]">
        {data.avatar ? (
          <img src={data.avatar} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80" alt="Salon" className="w-full h-full object-cover" />
          </div>
        )}
        
        {/* Curved overlay */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill={data.theme?.type === 'dark' ? '#1a1518' : '#fff5f8'}></path>
          </svg>
        </div>

        {/* Salon Logo/Name Overlay */}
        <div className="absolute top-12 left-6 right-6 text-center drop-shadow-lg">
          <h1 className="text-4xl font-serif italic text-white mb-1">{data.company || "HairStyle"}</h1>
          <p className="text-xs tracking-widest text-white/90 uppercase font-medium">Salon de Coiffure</p>
        </div>
      </div>

      <div className="px-8 pt-4 flex flex-col items-center">
        
        {/* Name & Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-1">{data.name || "Élise Martin"}</h2>
          <p className="text-sm font-medium" style={{ color: primaryColor }}>{data.role || "Coiffeuse Professionnelle"}</p>
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-3 w-full mb-6 opacity-70">
          <div className="h-px bg-current flex-1"></div>
          <span className="text-xs uppercase tracking-widest font-serif italic">Sublimez votre beauté</span>
          <div className="h-px bg-current flex-1"></div>
        </div>

        {/* Services List */}
        <div className="w-full space-y-4 mb-10 pl-2">
          {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Coupe & Brushing", "Coloration & Mèches", "Balayage", "Coiffure de soirée", "Conseil personnalisé"])).map((skill: string, idx: number) => (
            <div key={idx} className="flex items-center gap-4 group">
              <Scissors size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: primaryColor }} />
              <span className="text-sm font-medium">{skill}</span>
            </div>
          ))}
        </div>

        {/* Contact Actions (Minimalist List) */}
        <div className="w-full space-y-1 mb-8">
          <a href={`tel:${data.phone}`} className="flex items-center gap-4 py-3 border-b border-black/5 hover:border-black/20 transition-colors group">
            <Phone size={18} style={{ color: primaryColor }} />
            <span className="text-sm flex-1">{data.phone || "+33 6 23 45 67 89"}</span>
          </a>
          <a href={`mailto:${data.email}`} className="flex items-center gap-4 py-3 border-b border-black/5 hover:border-black/20 transition-colors group">
            <Mail size={18} style={{ color: primaryColor }} />
            <span className="text-sm flex-1">{data.email || "hello@hairstyle.salon"}</span>
          </a>
          <a href="#" className="flex items-center gap-4 py-3 border-b border-black/5 hover:border-black/20 transition-colors group">
            <MapPin size={18} style={{ color: primaryColor }} />
            <span className="text-sm flex-1">{data.location || "45 Rue du Commerce, 69002 Lyon"}</span>
          </a>
        </div>

        {/* Book CTA */}
        <button 
          className="w-full py-4 rounded-full text-white font-bold text-sm mb-6 shadow-lg hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
          style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` }}
        >
          <Calendar size={18} />
          Prendre RDV
        </button>

      </div>

      {/* Floating Bottom Nav */}
      <div className={`fixed bottom-0 left-0 w-full ${cardBg} border-t border-black/5 py-4 px-6 flex justify-between items-center rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20`}>
        <a href="#" className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>
          <Phone size={20} />
          <span className="text-[9px] font-bold uppercase">Appeler</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>
          <Save size={20} />
          <span className="text-[9px] font-bold uppercase">Enregistrer</span>
        </a>
        <a href={data.website} className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>
          <Globe size={20} />
          <span className="text-[9px] font-bold uppercase">Site Web</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity" style={{ color: primaryColor }}>
          <MapPin size={20} />
          <span className="text-[9px] font-bold uppercase">Itinéraire</span>
        </a>
      </div>

    </div>
  );
}
