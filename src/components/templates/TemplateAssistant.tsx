import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, CalendarCheck, CheckSquare, MessageSquare, Headphones, FileText } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateAssistant({ data }: Props) {
  const primaryColor = data.theme?.color || '#0891b2'; // Default Cyan
  const bgStyle = 'bg-[#f0f9ff] text-slate-800';
  const cardBg = 'bg-white';

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden pb-24`}>
      
      {/* Wavy Header */}
      <div className="w-full relative">
        <div className="absolute top-0 left-0 w-full h-[240px] opacity-20" style={{ background: `linear-gradient(135deg, ${primaryColor}, transparent)` }}></div>
        <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="white" fillOpacity="1" d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,96C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>

        {/* Company Info inside Header */}
        <div className="absolute top-10 left-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center text-cyan-600" style={{ color: primaryColor }}>
            <FileText size={18} />
          </div>
          <span className="font-bold tracking-tight text-slate-900">{data.company || "ProAssist"}</span>
        </div>
      </div>

      <div className="px-6 -mt-32 relative z-10 flex flex-col">
        
        {/* Profile Card */}
        <div className="flex gap-4 items-end mb-8">
          <div className="w-24 h-24 rounded-2xl bg-white shadow-xl p-1 shrink-0">
            {data.avatar ? (
              <img src={data.avatar} alt={data.name} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center">
                <span className="text-3xl text-slate-400">{data.name?.charAt(0) || 'A'}</span>
              </div>
            )}
          </div>
          <div className="pb-2">
            <h1 className="text-2xl font-bold mb-1 text-slate-900">{data.name || "Laura Morel"}</h1>
            <p className="text-sm font-semibold" style={{ color: primaryColor }}>{data.role || "Assistante Virtuelle"}</p>
          </div>
        </div>

        {/* Mission / Bio */}
        <div className={`w-full ${cardBg} rounded-2xl p-5 shadow-sm border border-cyan-100/50 mb-6`}>
          <p className="text-sm text-slate-600 italic">"Je vous accompagne au quotidien pour vous libérer du temps et optimiser votre organisation professionnelle."</p>
        </div>

        {/* Services List (Icon list) */}
        <div className="w-full space-y-3 mb-8">
          {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Gestion d'agenda", "Gestion des emails", "Saisie de données", "Service client", "Organisation d'événements"])).map((skill: string, idx: number) => {
            const icons = [CalendarCheck, Mail, CheckSquare, Headphones, MessageSquare];
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="flex items-center gap-4">
                <Icon size={16} style={{ color: primaryColor }} />
                <span className="text-sm font-medium text-slate-700">{skill}</span>
              </div>
            );
          })}
        </div>

        {/* Contact Minimal */}
        <div className="space-y-4 mb-10 pl-1 border-l-2 border-cyan-100" style={{ borderColor: `${primaryColor}30` }}>
          <div className="flex items-center gap-4 pl-3">
            <Phone size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">{data.phone || "+33 6 78 90 12 34"}</span>
          </div>
          <div className="flex items-center gap-4 pl-3">
            <Mail size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">{data.email || "contact@proassist.fr"}</span>
          </div>
          <div className="flex items-center gap-4 pl-3">
            <Globe size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">{data.website || "www.proassist.fr"}</span>
          </div>
        </div>

        {/* Main CTA */}
        <button 
          className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all tracking-wide flex items-center justify-center gap-2 mb-4"
          style={{ background: primaryColor }}
        >
          <Mail size={18} />
          Demander un devis
        </button>

      </div>

      {/* Floating Bottom Nav */}
      <div className={`fixed bottom-0 left-0 w-full ${cardBg} border-t border-slate-100 py-3 px-8 flex justify-between items-center z-20`}>
        <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-1 group">
          <Phone size={20} className="text-slate-400 group-hover:text-cyan-600 transition-colors" style={{ hover: { color: primaryColor } } as any} />
          <span className="text-[9px] font-bold uppercase text-slate-400">Appeler</span>
        </a>
        <a href={`mailto:${data.email}`} className="flex flex-col items-center gap-1 group">
          <Mail size={20} className="text-slate-400 group-hover:text-cyan-600 transition-colors" style={{ hover: { color: primaryColor } } as any} />
          <span className="text-[9px] font-bold uppercase text-slate-400">Email</span>
        </a>
        <button className="flex flex-col items-center gap-1 group">
          <Save size={20} className="text-slate-400 group-hover:text-cyan-600 transition-colors" style={{ hover: { color: primaryColor } } as any} />
          <span className="text-[9px] font-bold uppercase text-slate-400">Contact</span>
        </button>
        <a href={data.website} className="flex flex-col items-center gap-1 group">
          <Globe size={20} className="text-slate-400 group-hover:text-cyan-600 transition-colors" style={{ hover: { color: primaryColor } } as any} />
          <span className="text-[9px] font-bold uppercase text-slate-400">Site</span>
        </a>
      </div>
    </div>
  );
}
