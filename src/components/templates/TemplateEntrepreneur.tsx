import React from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';

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
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ background: primaryColor, transform: 'scale(1.2)' }}></div>
          <div className="w-32 h-32 rounded-full border-4 border-[#0b1221] shadow-2xl overflow-hidden relative z-10 bg-zinc-800">
            <img 
              src={data.avatarUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-white tracking-wide mb-1">{data.name || "Alexandre Martin"}</h1>
        <p className="text-sm font-medium mb-10" style={{ color: primaryColor }}>{data.role || "Entrepreneur"}</p>

        {/* Contact list */}
        <div className="w-full space-y-4 mb-10">
          {[
            { icon: <Phone size={16} />, text: data.phone || "+33 6 12 34 56 78" },
            { icon: <Mail size={16} />, text: data.email || "alexandre@martin.com" },
            { icon: <Globe size={16} />, text: data.website || "www.martin.com" },
            { icon: <MapPin size={16} />, text: data.location || "Paris, France" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-blue-400">
                {item.icon}
              </div>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center hover:scale-110 transition-transform">
            <Linkedin size={18} fill="currentColor" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center hover:scale-110 transition-transform">
            <Twitter size={18} fill="currentColor" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform">
            <Instagram size={18} />
          </a>
          <a href={data.website} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:scale-110 transition-transform border border-zinc-700">
            <Globe size={18} />
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
