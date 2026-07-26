import React from 'react';
import { Phone, Mail, MapPin, Globe, Save } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateRestoOwner({ data }: Props) {
  const primaryColor = data.theme?.bg || '#1e90ff';

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#f8f9fa] flex flex-col font-sans relative overflow-x-hidden">
      {/* En-tête bleu */}
      <div 
        className="h-48 w-full relative flex flex-col items-center justify-end pb-12 rounded-b-[40px] z-10"
        style={{ background: data.coverUrl ? `url(${data.coverUrl}) center/cover` : primaryColor }}
      >
        <div className="absolute inset-0 bg-black/10 rounded-b-[40px]" />
        
        {/* Texte */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-xl font-extrabold text-white uppercase tracking-wider mb-1">
            {data.name || "Andy Pakk"}
          </h1>
          <p className="text-[11px] font-bold text-white/90 uppercase tracking-[0.2em]">
            {data.role || "Resto Owner"}
          </p>
        </div>
      </div>

      {/* Avatar (Chevauche la ligne) */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20">
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
          <img 
            src={data.avatarUrl || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Barre de boutons rapides */}
      <div className="relative z-10 w-full px-6 -mt-6">
        <div 
          className="flex justify-center items-center py-4 rounded-3xl shadow-lg gap-8"
          style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
        >
          <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-1.5 text-zinc-600 hover:text-black transition-colors">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100">
              <Phone size={18} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Appel</span>
          </a>
          <button className="flex flex-col items-center gap-1.5 text-zinc-600 hover:text-black transition-colors">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100" style={{ color: primaryColor }}>
              <Save size={18} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: primaryColor }}>Enregistrer</span>
          </button>
          <a href={data.website} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 text-zinc-600 hover:text-black transition-colors">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100">
              <Globe size={18} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Site Web</span>
          </a>
        </div>
      </div>

      {/* Liste des contacts */}
      <div className="flex-1 px-6 pt-8 pb-12 space-y-4">
        {[
          { icon: <Phone size={22} />, title: data.phone || "409-685-4649", subtitle: "Mobile" },
          { icon: <Phone size={22} />, title: "828-919-3501", subtitle: "Travail" },
          { icon: <Mail size={22} />, title: data.email || "andypakk@gmail.com", subtitle: "Email" },
          { icon: <MapPin size={22} />, title: data.location || "2335 Sunwell Heights Road, NY 11201", subtitle: "Adresse" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 py-4 border-b border-zinc-200">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-zinc-800 truncate">{item.title}</h3>
              <p className="text-xs font-medium text-zinc-500 mt-0.5">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
