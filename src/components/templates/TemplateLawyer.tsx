import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Scale, FileText, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateLawyer({ data }: Props) {
  const primaryColor = data.theme?.color || '#d4af37'; // Default Gold
  const bgStyle = 'bg-[#111] text-white'; // Always Dark/Premium
  const cardBg = 'bg-[#1a1a1a]';
  const accentLight = `${primaryColor}20`; // 20% opacity for backgrounds

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden`}>
      {/* Top Banner with subtle gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-[250px] z-0 opacity-30"
        style={{ background: `radial-gradient(circle at top, ${primaryColor}80 0%, transparent 70%)` }}
      ></div>

      <div className="relative z-10 px-6 pt-16 pb-24 flex flex-col items-center text-center">
        
        {/* Logo / Balance of Justice */}
        <div className="mb-6 flex flex-col items-center">
          <Scale size={48} style={{ color: primaryColor }} strokeWidth={1} />
          <h2 className="text-xl font-serif mt-3 tracking-widest uppercase">{data.company || "Cabinet Durand"}</h2>
          <p className="text-[10px] text-zinc-400 tracking-widest uppercase mt-1">Avocat à la Cour</p>
        </div>

        {/* Profile Image (Optional for Lawyer, but good to have) */}
        {data.avatar && (
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full p-1 bg-[#222] border" style={{ borderColor: primaryColor }}>
              <img src={data.avatar} alt={data.name} className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        )}

        {/* Name & Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-bold mb-2">{data.name || "Maître Thomas Durand"}</h1>
          <div className="flex flex-wrap justify-center gap-2 mt-4 text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
            <span>Droit des affaires</span>
            <span style={{ color: primaryColor }}>•</span>
            <span>Droit de la famille</span>
            <span style={{ color: primaryColor }}>•</span>
            <span>Droit pénal</span>
          </div>
        </div>

        {/* Areas of Practice (Expertises) */}
        <div className="w-full text-left mb-10 pl-2 space-y-4">
          {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Conseil juridique", "Rédaction d'actes", "Défense de vos intérêts", "Médiation & Négociation"])).map((skill: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle2 size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-zinc-200">{skill}</span>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <button 
          className="w-full py-4 rounded-xl text-black font-bold text-sm mb-10 shadow-lg hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
          style={{ background: primaryColor, boxShadow: `0 0 20px -5px ${primaryColor}80` }}
        >
          <Calendar size={18} />
          Prendre rendez-vous
        </button>

        {/* Contact Information Cards */}
        <div className="w-full space-y-3 mb-10">
          <a href={`tel:${data.phone}`} className={`flex items-center gap-4 p-4 ${cardBg} rounded-xl border border-white/5 hover:border-white/20 transition-all group`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accentLight, color: primaryColor }}>
              <Phone size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Téléphone</p>
              <p className="text-sm font-medium text-zinc-200">{data.phone || "+33 1 23 45 67 89"}</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
          </a>

          <a href={`mailto:${data.email}`} className={`flex items-center gap-4 p-4 ${cardBg} rounded-xl border border-white/5 hover:border-white/20 transition-all group`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accentLight, color: primaryColor }}>
              <Mail size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Email</p>
              <p className="text-sm font-medium text-zinc-200">{data.email || "contact@cabinet-durand.fr"}</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
          </a>

          <a href="#" className={`flex items-center gap-4 p-4 ${cardBg} rounded-xl border border-white/5 hover:border-white/20 transition-all group`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accentLight, color: primaryColor }}>
              <MapPin size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Cabinet</p>
              <p className="text-sm font-medium text-zinc-200">{data.location || "8 Rue de l'Arcade, 75008 Paris"}</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Footer Quick Links */}
        <div className="flex justify-center gap-6 w-full py-4 border-t border-white/10">
          <a href={data.website} className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors">
            <Globe size={20} />
            <span className="text-[9px] uppercase tracking-wider">Site Web</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors">
            <Briefcase size={20} />
            <span className="text-[9px] uppercase tracking-wider">LinkedIn</span>
          </a>
          <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors">
            <Save size={20} />
            <span className="text-[9px] uppercase tracking-wider">Enregistrer</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors">
            <Share2 size={20} />
            <span className="text-[9px] uppercase tracking-wider">Partager</span>
          </button>
        </div>

      </div>
    </div>
  );
}
