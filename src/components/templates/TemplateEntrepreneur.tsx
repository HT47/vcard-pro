import React from 'react';
import { Phone, Mail, MapPin, Globe, MessageCircle, Camera } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateEntrepreneur({ data }: Props) {
  const primaryColor = data.theme?.bg || '#1d4ed8';

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#0b1221] flex flex-col font-sans relative overflow-x-hidden text-white">
      {/* Top Wave Shape */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full opacity-60">
          <path d="M0,0 L400,0 L400,80 C300,160 150,50 0,140 Z" fill={primaryColor} />
          <path d="M0,0 L400,0 L400,40 C250,130 100,20 0,100 Z" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center pt-24 px-8 pb-32 z-10 relative">
        {/* Avatar with glow */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-[2rem] blur-2xl opacity-40 rotate-12" style={{ background: primaryColor }}></div>
          <div className="w-32 h-32 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative z-10 bg-[#0b1221] rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src={data.avatarUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover -rotate-3 hover:rotate-0 transition-transform duration-500 mix-blend-luminosity hover:mix-blend-normal"
            />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">{data.name || "Alexandre Martin"}</h1>
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>{data.role || "Entrepreneur"}</p>
        </div>

        {/* Contact list */}
        <div className="w-full space-y-3 mb-10">
          {[
            { icon: <Phone size={18} />, text: data.phone || "+33 6 12 34 56 78", title: "Téléphone direct" },
            { icon: <Mail size={18} />, text: data.email || "alexandre@martin.com", title: "Adresse Email" },
            { icon: <Globe size={18} />, text: data.website || "www.martin.com", title: "Site Entreprise" },
            { icon: <MapPin size={18} />, text: data.location || "Paris, France", title: "Siège Social" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 p-4 rounded-2xl transition-all duration-300 group cursor-pointer">
              <div 
                className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform shadow-inner"
                style={{ color: primaryColor }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.title}</span>
                <span className="text-sm font-semibold text-zinc-200">{item.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 hover:bg-white/10 transition-all text-white">
            <span className="font-bold text-lg">In</span>
          </a>
          <a href="#" className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 hover:bg-white/10 transition-all text-white">
            <MessageCircle size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 hover:bg-white/10 transition-all text-white">
            <Camera size={20} />
          </a>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0b1221] via-[#0b1221]/80 to-transparent z-20">
        <button 
          className="w-full py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-white"
          style={{ background: primaryColor }}
        >
          <Save size={18} /> Enregistrer le contact
        </button>
      </div>
    </div>
  );
}
