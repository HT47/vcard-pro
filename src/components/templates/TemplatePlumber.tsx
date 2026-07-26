import React from 'react';
import { Phone, Mail, MapPin, Globe, Droplet, Check, Hammer, Wrench, ShieldCheck, Map } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplatePlumber({ data }: Props) {
  const primaryColor = data.theme?.color || '#3b82f6'; // Default Blue
  const bgStyle = 'bg-[#f8fafc] text-slate-800';
  const cardBg = 'bg-white';

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden pb-24`}>
      
      {/* Header Background */}
      <div className="w-full h-[180px] bg-slate-900 relative flex justify-center pt-10">
        {/* Simple pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-3 text-blue-500" style={{ color: primaryColor }}>
            <Droplet size={32} fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{data.company || "AquaFix"}</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-1">Plomberie & Chauffage</p>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-10 flex flex-col items-center">
        
        {/* Profile Card */}
        <div className={`w-full ${cardBg} rounded-2xl shadow-xl p-6 mb-8 flex flex-col items-center text-center border border-slate-100`}>
          {data.avatar && (
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 mb-4" style={{ borderColor: primaryColor }}>
              <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
            </div>
          )}
          <h2 className="text-xl font-bold mb-1">{data.name || "Marc Dubois"}</h2>
          <p className="text-sm font-medium mb-4" style={{ color: primaryColor }}>{data.role || "Plombier Chauffagiste"}</p>
          
          <div className="w-full h-px bg-slate-100 mb-4"></div>
          
          <div className="flex justify-between w-full text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1"><ShieldCheck size={14} style={{ color: primaryColor }}/> Rapide</span>
            <span className="flex items-center gap-1"><ShieldCheck size={14} style={{ color: primaryColor }}/> Fiable</span>
            <span className="flex items-center gap-1"><ShieldCheck size={14} style={{ color: primaryColor }}/> Pro</span>
          </div>
        </div>

        {/* Services / Skills */}
        <div className="w-full mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pl-2">Nos Interventions</h3>
          <div className="space-y-3">
            {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Dépannage fuites", "Installation sanitaire", "Entretien chaudière", "Débouchage", "Rénovation sdb"])).map((skill: string, idx: number) => (
              <div key={idx} className={`flex items-center gap-4 ${cardBg} p-3 rounded-xl shadow-sm border border-slate-100`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}15`, color: primaryColor }}>
                  <Wrench size={14} />
                </div>
                <span className="text-sm font-medium flex-1">{skill}</span>
                <Check size={16} style={{ color: primaryColor }} />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info (List) */}
        <div className={`w-full ${cardBg} rounded-2xl p-5 shadow-sm border border-slate-100 mb-8 space-y-4 pl-4`}>
          <a href={`tel:${data.phone}`} className="flex items-center gap-4 group">
            <Phone size={18} style={{ color: primaryColor }} />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{data.phone || "+33 6 54 32 10 98"}</span>
          </a>
          <div className="w-full h-px bg-slate-50 ml-8"></div>
          <a href={`mailto:${data.email}`} className="flex items-center gap-4 group">
            <Mail size={18} style={{ color: primaryColor }} />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{data.email || "contact@aquafix.fr"}</span>
          </a>
          <div className="w-full h-px bg-slate-50 ml-8"></div>
          <div className="flex items-center gap-4">
            <MapPin size={18} style={{ color: primaryColor }} />
            <span className="text-sm font-medium text-slate-600">{data.location || "7 Rue des Sources, 75011 Paris"}</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-2 mb-4"
          style={{ background: primaryColor }}
        >
          Intervention rapide 7j/7
        </button>

      </div>

      {/* Floating Action Bar */}
      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 py-3 px-6 flex justify-between items-center z-20`}>
        <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-500" style={{ hover: { color: primaryColor } } as any}>
            <Phone size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-400">Appeler</span>
        </a>
        <a href={`mailto:${data.email}`} className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-500" style={{ hover: { color: primaryColor } } as any}>
            <Map size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-400">Itinéraire</span>
        </a>
        <a href={data.website} className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-500" style={{ hover: { color: primaryColor } } as any}>
            <Mail size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-400">Email</span>
        </a>
      </div>
    </div>
  );
}
