import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Linkedin, Dribbble, Instagram } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateFreelanceDark({ data }: Props) {
  const primaryColor = data.theme?.bg || '#0d9488'; // Teal
  const skills = data.skills || ['Branding', 'UI/UX', 'Illustration', 'Print', 'Web Design'];

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#0f172a] flex flex-col font-sans relative overflow-x-hidden text-white">
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-96 overflow-hidden pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -right-20 w-[150%] h-[150%]">
          <path fill={primaryColor} d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.4,-2.2C98,13.6,93.2,29.8,84.4,43.7C75.6,57.6,62.8,69.2,48.5,77.4C34.2,85.6,18.4,90.4,2.2,86.9C-14.1,83.4,-30.8,71.6,-44.6,60C-58.4,48.4,-69.3,37,-76.8,23.3C-84.3,9.6,-88.4,-6.3,-84.9,-20.5C-81.4,-34.7,-70.3,-47.2,-57.4,-55.3C-44.5,-63.4,-29.8,-67.1,-16.1,-70.5C-2.4,-73.9,10.3,-77,22.8,-77C35.3,-77,47.6,-77,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center pt-24 px-8 pb-32 z-10 relative">
        
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full border-2 border-[#0f172a] overflow-hidden relative z-10 bg-zinc-800"
               style={{ boxShadow: `0 0 20px ${primaryColor}80, 0 0 0 4px ${primaryColor}40` }}>
            <img 
              src={data.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-white tracking-wide mb-1">{data.name || "Sophie Design"}</h1>
        <p className="text-sm font-medium mb-8" style={{ color: primaryColor }}>{data.role || "Designer Graphique"}</p>

        {/* Contact List */}
        <div className="w-full space-y-4 mb-8">
          {[
            { icon: <Phone size={16} />, text: data.phone || "+33 6 98 76 54 32" },
            { icon: <Mail size={16} />, text: data.email || "sophie.design@gmail.com" },
            { icon: <Globe size={16} />, text: data.website || "www.sophiedesign.fr" },
            { icon: <MapPin size={16} />, text: data.location || "Lyon, France" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-zinc-300">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10"
                style={{ color: primaryColor }}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skills.map((skill: string, idx: number) => (
            <span 
              key={idx}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0f172a] border"
              style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <span className="font-bold text-sm">Bē</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <Dribbble size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <Linkedin size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <Instagram size={18} />
          </a>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-transparent z-20">
        <button 
          className="w-full py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-white border border-white/10"
          style={{ background: `linear-gradient(to right, ${primaryColor}, #0f172a)` }}
        >
          <Save size={18} /> Enregistrer le contact
        </button>
      </div>
    </div>
  );
}
