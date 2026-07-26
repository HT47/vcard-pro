import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Zap, Shield, CheckCircle2, Navigation } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateElectrician({ data }: Props) {
  const primaryColor = data.theme?.color || '#eab308'; // Default Yellow
  const bgStyle = 'bg-[#111111] text-white';
  const cardBg = 'bg-[#1a1a1a]';

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden pb-24`}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="px-6 pt-12 flex flex-col items-center relative z-10">
        
        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <Shield size={64} style={{ color: primaryColor }} strokeWidth={1} />
            <Zap size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" fill="white" />
          </div>
          <h1 className="text-2xl font-black mt-4 uppercase tracking-wider">{data.company || "ElecPro"}</h1>
          <p className="text-[10px] text-zinc-400 tracking-widest uppercase mt-1">Électricité Générale</p>
        </div>

        {/* Profile Image (Optional but recommended) */}
        {data.avatar && (
          <div className="mb-6 relative">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2" style={{ borderColor: primaryColor }}>
              <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
            </div>
            {/* Status dot */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-[#111]"></div>
          </div>
        )}

        {/* Name & Role */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-1">{data.name || "Antoine Lefèvre"}</h2>
          <p className="text-sm font-medium" style={{ color: primaryColor }}>{data.role || "Électricien Professionnel"}</p>
        </div>

        {/* Services List */}
        <div className="w-full pl-2 space-y-4 mb-10">
          {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Installation électrique", "Dépannage d'urgence", "Mise aux normes", "Domotique"])).map((skill: string, idx: number) => (
            <div key={idx} className="flex items-center gap-4">
              <CheckCircle2 size={18} style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-zinc-200">{skill}</span>
            </div>
          ))}
        </div>

        {/* Contact Info Text */}
        <div className="w-full space-y-4 mb-10 border-t border-white/10 pt-8">
          <a href={`tel:${data.phone}`} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Phone size={18} style={{ color: primaryColor }} />
            </div>
            <span className="text-sm font-medium">{data.phone || "+33 6 11 22 33 44"}</span>
          </a>
          <a href={`mailto:${data.email}`} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Mail size={18} style={{ color: primaryColor }} />
            </div>
            <span className="text-sm font-medium">{data.email || "contact@elecpro.fr"}</span>
          </a>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <MapPin size={18} style={{ color: primaryColor }} />
            </div>
            <span className="text-sm font-medium">{data.location || "20 Rue des Artisans, 69007 Lyon"}</span>
          </div>
        </div>

        {/* Main CTA */}
        <button 
          className="w-full py-4 rounded-xl text-black font-bold text-sm mb-6 shadow-lg hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
          style={{ background: primaryColor }}
        >
          <Zap size={18} fill="currentColor" />
          Demander un devis
        </button>

      </div>

      {/* Floating Action Bar */}
      <div className={`fixed bottom-0 left-0 w-full ${cardBg} border-t border-white/5 py-4 px-6 flex justify-between items-center z-20`}>
        <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors" style={{ color: primaryColor }}>
            <Phone size={18} />
          </div>
          <span className="text-[9px] font-bold uppercase text-zinc-400">Appeler</span>
        </a>
        <a href={`mailto:${data.email}`} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors" style={{ color: primaryColor }}>
            <Mail size={18} />
          </div>
          <span className="text-[9px] font-bold uppercase text-zinc-400">Email</span>
        </a>
        <a href={data.website} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors" style={{ color: primaryColor }}>
            <Globe size={18} />
          </div>
          <span className="text-[9px] font-bold uppercase text-zinc-400">Site</span>
        </a>
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors" style={{ color: primaryColor }}>
            <Navigation size={18} />
          </div>
          <span className="text-[9px] font-bold uppercase text-zinc-400">Trajet</span>
        </button>
      </div>
    </div>
  );
}
