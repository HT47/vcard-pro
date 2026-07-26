import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Camera, PenTool } from 'lucide-react';

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
        
        {/* Avatar with Floating Skills */}
        <div className="relative mb-8 mt-12 w-full flex justify-center items-center h-40">
          <div className="w-32 h-32 rounded-full border border-white/20 overflow-hidden relative z-10 bg-zinc-800"
               style={{ boxShadow: `0 0 40px ${primaryColor}40, inset 0 0 20px rgba(0,0,0,0.5)` }}>
            <img 
              src={data.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
            />
          </div>
          
          {/* Floating Skills around the avatar */}
          {skills.slice(0, 5).map((skill: string, idx: number) => {
            const angles = [-15, 30, 160, 200, 240];
            const radius = 85;
            const angle = (angles[idx] || 0) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div 
                key={idx}
                className="absolute z-20 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md shadow-lg transition-transform hover:scale-110 cursor-default"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))`,
                  border: `1px solid ${primaryColor}60`,
                  color: '#fff',
                  boxShadow: `0 4px 12px rgba(0,0,0,0.3), 0 0 10px ${primaryColor}30`,
                  animation: `float ${3 + idx}s ease-in-out infinite alternate`,
                }}
              >
                {skill}
              </div>
            );
          })}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translate(var(--tw-translate-x), calc(var(--tw-translate-y) - 5px)); }
            100% { transform: translate(var(--tw-translate-x), calc(var(--tw-translate-y) + 5px)); }
          }
        `}} />

        {/* Text */}
        <h1 className="text-2xl font-bold text-white tracking-wide mb-1">{data.name || "Sophie Design"}</h1>
        <p className="text-sm font-medium mb-8" style={{ color: primaryColor }}>{data.role || "Designer Graphique"}</p>

        {/* Contact List */}
        <div className="w-full space-y-4 mb-10 bg-white/[0.02] p-6 rounded-3xl border border-white/5 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20" style={{ background: primaryColor }}></div>
          
          {[
            { icon: <Phone size={16} />, text: data.phone || "+33 6 98 76 54 32", label: "Téléphone" },
            { icon: <Mail size={16} />, text: data.email || "sophie.design@gmail.com", label: "Email" },
            { icon: <Globe size={16} />, text: data.website || "www.sophiedesign.fr", label: "Portfolio" },
            { icon: <MapPin size={16} />, text: data.location || "Lyon, France", label: "Localisation" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-zinc-300 group hover:bg-white/[0.04] p-2 rounded-2xl transition-colors cursor-pointer">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-inner"
                style={{ color: primaryColor }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{item.label}</span>
                <span className="text-sm font-medium text-zinc-100">{item.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <span className="font-bold text-sm">Bē</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <PenTool size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <span className="font-bold text-sm">In</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 bg-white/5 text-zinc-300">
            <Camera size={18} />
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
