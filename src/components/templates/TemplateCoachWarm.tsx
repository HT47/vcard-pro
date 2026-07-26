import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Users, Camera, Briefcase, Video } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateCoachWarm({ data }: Props) {
  const primaryColor = data.theme?.bg || '#d97736'; // Warm orange/terracotta
  const quote = data.quote || "Développez votre potentiel, transformez votre vie.";

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#fdf6f0] flex flex-col font-sans relative overflow-x-hidden text-zinc-800">
      
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-40">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32" style={{ fill: '#e8d5c4' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center pt-20 px-8 pb-32 z-10 relative">
        
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full blur-xl opacity-40 translate-y-2" style={{ background: primaryColor }}></div>
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 bg-white">
            <img 
              src={data.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">{data.name || "Thomas Leroy"}</h1>
        <p className="text-sm font-bold uppercase tracking-[0.15em] mb-8" style={{ color: primaryColor }}>{data.role || "Coach de Vie"}</p>

        {/* Contact List */}
        <div className="w-full space-y-3 mb-10 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8d5c4]/30">
          {[
            { icon: <Phone size={18} />, text: data.phone || "+33 6 45 67 89 01", label: "Appel Direct" },
            { icon: <Mail size={18} />, text: data.email || "thomas.leroy@coach.com", label: "Email Pro" },
            { icon: <Globe size={18} />, text: data.website || "www.thomasleroy.com", label: "Site Officiel" },
            { icon: <MapPin size={18} />, text: data.location || "Bordeaux, France", label: "Cabinet" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-zinc-700 group cursor-pointer hover:bg-[#fdf6f0] p-3 rounded-2xl transition-all duration-300">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#fdf6f0] group-hover:scale-110 transition-transform duration-300 shadow-sm"
                style={{ color: primaryColor }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">{item.label}</span>
                <span className="text-sm font-semibold">{item.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="w-full text-center px-6 mb-12 relative">
          <div className="absolute -top-4 -left-2 text-6xl opacity-10" style={{ color: primaryColor }}>"</div>
          <p className="text-lg font-serif italic text-zinc-700 leading-relaxed relative z-10">
            {quote}
          </p>
          <div className="w-12 h-1 rounded-full mx-auto mt-6" style={{ background: primaryColor }}></div>
        </div>

        {/* Services / Offers */}
        <div className="w-full grid grid-cols-2 gap-4 mb-10">
          {[
            { icon: <Users size={24} />, title: "Coaching 1v1", desc: "Séances privées" },
            { icon: <Video size={24} />, title: "Masterclass", desc: "En ligne" },
            { icon: <Briefcase size={24} />, title: "Entreprise", desc: "Team building" },
            { icon: <Camera size={24} />, title: "Retraites", desc: "Immersions" }
          ].map((srv, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-sm border border-[#e8d5c4]/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-3" style={{ color: primaryColor }}>
                {srv.icon}
              </div>
              <span className="text-sm font-bold text-zinc-800 mb-1">{srv.title}</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">{srv.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-30 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-48" style={{ fill: primaryColor }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Fixed bottom button */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <button 
          className="w-full py-4 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-white"
          style={{ background: primaryColor }}
        >
          <Save size={18} /> Enregistrer le contact
        </button>
      </div>
    </div>
  );
}
