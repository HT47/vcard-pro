import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

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
          <div className="w-32 h-32 rounded-full border-4 border-[#fdf6f0] shadow-xl overflow-hidden relative z-10 bg-white">
            <img 
              src={data.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-zinc-800 tracking-wide mb-1">{data.name || "Thomas Leroy"}</h1>
        <p className="text-sm font-bold mb-10" style={{ color: primaryColor }}>{data.role || "Coach de Vie"}</p>

        {/* Contact List */}
        <div className="w-full space-y-4 mb-8">
          {[
            { icon: <Phone size={16} />, text: data.phone || "+33 6 45 67 89 01" },
            { icon: <Mail size={16} />, text: data.email || "thomas.leroy@coach.com" },
            { icon: <Globe size={16} />, text: data.website || "www.thomasleroy.com" },
            { icon: <MapPin size={16} />, text: data.location || "Bordeaux, France" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-zinc-600">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-[#e8d5c4]"
                style={{ color: primaryColor }}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="w-full text-center px-4 mb-10">
          <p className="text-sm italic font-medium text-zinc-600 relative inline-block">
            <span className="absolute -top-3 -left-4 text-3xl opacity-20" style={{ color: primaryColor }}>"</span>
            {quote}
            <span className="absolute -bottom-4 -right-4 text-3xl opacity-20" style={{ color: primaryColor }}>"</span>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[Facebook, Instagram, Linkedin, Youtube].map((Icon, idx) => (
            <a key={idx} href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-white shadow-md" style={{ background: primaryColor }}>
              <Icon size={18} />
            </a>
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
