import React from 'react';
import { Phone, Mail, MapPin, Globe, Save } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateRestoOwner({ data }: Props) {
  const primaryColor = data.theme?.bg || '#1e90ff';

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#f8f9fa] flex flex-col font-sans relative overflow-x-hidden">
      {/* En-tête bleu avec effet verre */}
      <div 
        className="h-[220px] w-full relative flex flex-col items-center justify-end pb-16 rounded-b-[48px] z-10"
        style={{ background: data.coverUrl ? `url(${data.coverUrl}) center/cover` : primaryColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 rounded-b-[48px] backdrop-blur-[2px]" />
        
        {/* Texte */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-md">
            {data.name || "Andy Pakk"}
          </h1>
          <p className="text-xs font-bold text-white/90 uppercase tracking-[0.2em] drop-shadow-sm">
            {data.role || "Resto Owner"}
          </p>
        </div>
      </div>

      {/* Avatar (Chevauche la ligne) */}
      <div className="absolute top-[160px] left-1/2 -translate-x-1/2 z-20">
        <div className="w-[120px] h-[120px] rounded-full border-4 border-[#f8f9fa] shadow-2xl overflow-hidden bg-white">
          <img 
            src={data.avatarUrl || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Barre de boutons rapides (Style iOS) */}
      <div className="relative z-10 w-full px-6 mt-[65px]">
        <div 
          className="flex justify-evenly items-center py-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.03]"
          style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
        >
          <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-2 text-zinc-500 hover:text-black transition-colors group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-50 group-hover:bg-zinc-100 group-hover:scale-105 transition-all">
              <Phone size={20} className="text-zinc-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Appel</span>
          </a>
          <button className="flex flex-col items-center gap-2 text-zinc-500 hover:text-black transition-colors group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg -mt-8 bg-white border-[6px] border-[#f8f9fa] group-hover:scale-110 transition-transform" style={{ color: primaryColor }}>
              <Save size={24} fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: primaryColor }}>Ajouter</span>
          </button>
          <a href={data.website} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-zinc-500 hover:text-black transition-colors group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-50 group-hover:bg-zinc-100 group-hover:scale-105 transition-all">
              <Globe size={20} className="text-zinc-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Site Web</span>
          </a>
        </div>
      </div>

      {/* Liste des contacts style iOS */}
      <div className="flex-1 px-6 pt-6 pb-12 space-y-4">
        <div className="bg-white rounded-3xl p-2 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-black/[0.03]">
          {[
            { icon: <Phone size={22} className="text-zinc-400" />, title: data.phone || "+33 6 12 34 56 78", subtitle: "Mobile" },
            { icon: <Mail size={22} className="text-zinc-400" />, title: data.email || "andypakk@gmail.com", subtitle: "Email" },
            { icon: <MapPin size={22} className="text-zinc-400" />, title: data.location || "2335 Sunwell Heights Road", subtitle: "Adresse" }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center gap-4 py-4 px-2 ${idx !== 2 ? 'border-b border-zinc-100' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{item.subtitle}</p>
                <h3 className="text-[15px] font-semibold text-zinc-900 truncate">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
