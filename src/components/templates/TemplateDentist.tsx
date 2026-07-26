import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Activity, Calendar, ShieldCheck, Check, Clock } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateDentist({ data }: Props) {
  const primaryColor = data.theme?.color || '#0d9488'; // Default Teal/Medical Green
  const bgStyle = data.theme?.type === 'dark' ? 'bg-slate-900 text-white' : 'bg-[#f0fdfa] text-slate-800';
  const cardBg = data.theme?.type === 'dark' ? 'bg-slate-800' : 'bg-white';

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden`}>
      
      {/* Top Banner with Soft Curve */}
      <div 
        className="w-full h-[200px] relative flex flex-col items-center justify-center pt-8"
        style={{ background: primaryColor }}
      >
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 z-10 text-white">
          <ShieldCheck size={32} />
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight leading-none">{data.company || "SmileCare"}</span>
            <span className="text-[10px] tracking-widest uppercase opacity-80">Cabinet Dentaire</span>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill={data.theme?.type === 'dark' ? '#0f172a' : '#f0fdfa'}></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill={data.theme?.type === 'dark' ? '#0f172a' : '#f0fdfa'}></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill={data.theme?.type === 'dark' ? '#0f172a' : '#f0fdfa'}></path>
          </svg>
        </div>
      </div>

      <div className="px-6 relative z-10 flex flex-col items-center pb-24">
        
        {/* Doctor Avatar - Overlapping */}
        <div className="-mt-16 mb-4 relative">
          <div className="w-28 h-28 rounded-full p-1 bg-white shadow-xl">
            {data.avatar ? (
              <img src={data.avatar} alt={data.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-4xl text-slate-400">{data.name?.charAt(0) || 'D'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1">{data.name || "Dr. Lucas Bernard"}</h1>
          <p className="text-sm font-medium" style={{ color: primaryColor }}>{data.role || "Chirurgien-Dentiste"}</p>
        </div>

        {/* Small motto */}
        <div className="flex items-center gap-2 mb-8 opacity-70">
          <Activity size={14} style={{ color: primaryColor }} />
          <span className="text-xs font-bold uppercase tracking-wider">Un sourire en pleine santé</span>
        </div>

        {/* Services List (Checkmarks) */}
        <div className={`w-full ${cardBg} rounded-3xl p-6 shadow-sm border border-black/5 mb-8`}>
          <div className="space-y-4">
            {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Soins dentaires", "Implantologie", "Orthodontie", "Esthétique dentaire", "Blanchiment"])).map((skill: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}20`, color: primaryColor }}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Text */}
        <div className="w-full space-y-3 mb-10 pl-2">
          <div className="flex items-center gap-4">
            <Phone size={18} style={{ color: primaryColor }} />
            <span className="text-sm">{data.phone || "+33 1 45 67 89 01"}</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={18} style={{ color: primaryColor }} />
            <span className="text-sm">{data.email || "contact@smilecare.fr"}</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin size={18} style={{ color: primaryColor }} />
            <span className="text-sm">{data.location || "18 Rue de la Santé, 75013 Paris"}</span>
          </div>
        </div>

        {/* Main CTA */}
        <button 
          className="w-full py-4 rounded-full text-white font-bold text-lg mb-8 shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          style={{ background: primaryColor, boxShadow: `0 10px 25px -5px ${primaryColor}60` }}
        >
          <Calendar size={20} />
          Prendre RDV
        </button>

        {/* Action Grid (Bottom Icons) */}
        <div className="flex justify-between w-full px-4">
           <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors" style={{ hover: { color: primaryColor } } as any}>
               <Phone size={20} />
             </div>
             <span className="text-[10px] font-bold uppercase text-slate-500">Appeler</span>
           </a>
           <a href="#" className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors" style={{ hover: { color: primaryColor } } as any}>
               <MapPin size={20} />
             </div>
             <span className="text-[10px] font-bold uppercase text-slate-500">Itinéraire</span>
           </a>
           <a href={`mailto:${data.email}`} className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors" style={{ hover: { color: primaryColor } } as any}>
               <Mail size={20} />
             </div>
             <span className="text-[10px] font-bold uppercase text-slate-500">Email</span>
           </a>
           <a href={data.website} className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors" style={{ hover: { color: primaryColor } } as any}>
               <Globe size={20} />
             </div>
             <span className="text-[10px] font-bold uppercase text-slate-500">Site</span>
           </a>
        </div>
      </div>
    </div>
  );
}
