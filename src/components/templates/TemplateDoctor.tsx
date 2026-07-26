import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Activity, Calendar, ShieldAlert, HeartPulse, Clock } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateDoctor({ data }: Props) {
  const primaryColor = data.theme?.color || '#0ea5e9'; // Default Cyan
  const bgStyle = data.theme?.type === 'dark' ? 'bg-slate-900 text-white' : 'bg-[#F4F9F9] text-slate-800';
  const cardBg = data.theme?.type === 'dark' ? 'bg-slate-800' : 'bg-white';

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden`}>
      {/* Wave Top Background */}
      <div 
        className="absolute top-0 left-0 w-full h-[220px] rounded-b-[40px] z-0 opacity-20"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, transparent)` }}
      ></div>
      
      {/* Medical Cross Watermark */}
      <div className="absolute top-10 right-[-20px] opacity-5 z-0">
        <Activity size={180} />
      </div>

      <div className="relative z-10 px-6 pt-12 pb-24 flex flex-col items-center">
        {/* Header / Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-cyan-600" style={{ color: primaryColor }}>
            <Activity size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ color: primaryColor }}>
            {data.company || "Cabinet Médical"}
          </span>
        </div>

        {/* Profile Image */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full p-1 bg-white shadow-xl">
            {data.avatar ? (
              <img src={data.avatar} alt={data.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-4xl text-slate-400">{data.name?.charAt(0) || 'M'}</span>
              </div>
            )}
          </div>
          <div 
            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
            style={{ color: primaryColor }}
          >
            <ShieldAlert size={20} />
          </div>
        </div>

        {/* Info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black mb-1">{data.name || "Dr. Sophie Laurent"}</h1>
          <p className="text-sm font-medium opacity-80 mb-3">{data.role || "Médecin Généraliste"}</p>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white shadow-sm border border-black/5" style={{ color: primaryColor }}>
            Conventionné secteur 1
          </div>
        </div>

        {/* Main CTA */}
        <button 
          className="w-full py-4 rounded-2xl text-white font-bold text-lg mb-8 shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          style={{ background: primaryColor, boxShadow: `0 10px 25px -5px ${primaryColor}60` }}
        >
          <Calendar size={20} />
          Prendre RDV
        </button>

        {/* Expertise / Services */}
        <div className={`w-full ${cardBg} rounded-3xl p-6 shadow-sm border border-black/5 mb-6`}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-60">Votre santé, notre priorité</h2>
          <div className="space-y-3">
            {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Consultations adultes & enfants", "Médecine préventive", "Suivi de maladies chroniques", "Visites à domicile"])).map((skill: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-cyan-50" style={{ background: `${primaryColor}15`, color: primaryColor }}>
                  <HeartPulse size={12} />
                </div>
                <span className="text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Horaires (Mock) */}
        <div className={`w-full ${cardBg} rounded-3xl p-6 shadow-sm border border-black/5 mb-8 flex items-center gap-4`}>
           <div className="w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center bg-slate-100 text-slate-500">
             <Clock size={20} />
           </div>
           <div>
             <h3 className="font-bold text-sm">Horaires d'ouverture</h3>
             <p className="text-xs opacity-70">Lun - Ven : 09h00 - 19h00</p>
           </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 w-full">
          <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-2 group">
            <div className={`w-14 h-14 rounded-2xl ${cardBg} shadow-sm border border-black/5 flex items-center justify-center group-hover:-translate-y-1 transition-transform`} style={{ color: primaryColor }}>
              <Phone size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase">Appeler</span>
          </a>
          <a href={`mailto:${data.email}`} className="flex flex-col items-center gap-2 group">
            <div className={`w-14 h-14 rounded-2xl ${cardBg} shadow-sm border border-black/5 flex items-center justify-center group-hover:-translate-y-1 transition-transform`} style={{ color: primaryColor }}>
              <Mail size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase">Email</span>
          </a>
          <a href={data.website} className="flex flex-col items-center gap-2 group">
            <div className={`w-14 h-14 rounded-2xl ${cardBg} shadow-sm border border-black/5 flex items-center justify-center group-hover:-translate-y-1 transition-transform`} style={{ color: primaryColor }}>
              <Globe size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase">Site Web</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 group">
            <div className={`w-14 h-14 rounded-2xl ${cardBg} shadow-sm border border-black/5 flex items-center justify-center group-hover:-translate-y-1 transition-transform`} style={{ color: primaryColor }}>
              <MapPin size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase">Itinéraire</span>
          </a>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[300px] z-20">
        <button 
          className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all border border-slate-700"
        >
          <Save size={18} />
          Enregistrer le contact
        </button>
      </div>
    </div>
  );
}
