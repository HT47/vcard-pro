import React from 'react';
import { Phone, Mail, MapPin, Globe, Save, Facebook, Instagram, Twitter } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateRestaurant({ data }: Props) {
  const primaryColor = data.theme?.bg || '#15803d'; // Green by default
  const coverImg = data.coverUrl || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
  const logoImg = data.avatarUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#fdfaf6] flex flex-col font-sans relative overflow-x-hidden text-zinc-800">
      
      {/* Top Cover Image */}
      <div 
        className="w-full h-48 rounded-b-[40px] relative shadow-md"
        style={{ background: `url(${coverImg}) center/cover` }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-b-[40px]"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center px-8 pb-32 relative">
        
        {/* Logo Circle overlapping */}
        <div className="w-28 h-28 rounded-full border-4 border-[#fdfaf6] shadow-xl overflow-hidden bg-black -mt-14 relative z-10 flex items-center justify-center">
          <img src={logoImg} alt="Logo" className="w-full h-full object-cover opacity-80" />
          {/* Fallback text if no real logo */}
          <span className="absolute text-xl font-bold text-white text-center italic" style={{ fontFamily: 'serif' }}>
            {data.name?.split(' ')[0] || "Le Goût"}
          </span>
        </div>

        {/* Titles */}
        <h1 className="text-3xl font-bold mt-4 mb-1" style={{ color: primaryColor, fontFamily: 'serif' }}>
          {data.name || "Le Goût"}
        </h1>
        <p className="text-sm text-zinc-500 mb-8 font-medium">{data.role || "Restaurant & Café"}</p>

        {/* Decorative leaves/shapes (CSS only for effect) */}
        <div className="absolute left-0 top-32 w-16 h-32 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(ellipse at left, green 0%, transparent 70%)' }}></div>
        <div className="absolute right-0 top-40 w-16 h-32 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(ellipse at right, green 0%, transparent 70%)' }}></div>

        {/* Contact List */}
        <div className="w-full max-w-sm space-y-4 mb-8">
          {[
            { icon: <Phone size={18} />, text: data.phone || "+33 1 23 45 67 89" },
            { icon: <Mail size={18} />, text: data.email || "contact@legout.fr" },
            { icon: <Globe size={18} />, text: data.website || "www.legout.fr" },
            { icon: <MapPin size={18} />, text: data.location || "15 Rue de la Paix, 75002 Paris" },
            { icon: <span className="font-bold text-xs">🕒</span>, text: "Lun - Dim : 11h00 - 23h00" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-zinc-700">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ background: primaryColor }}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center hover:scale-110 transition-transform" style={{ color: primaryColor }}>
            <span className="font-bold">trip</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center hover:scale-110 transition-transform text-pink-600">
            <Instagram size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:scale-110 transition-transform text-blue-600">
            <Facebook size={18} />
          </a>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#fdfaf6] via-[#fdfaf6]/90 to-transparent z-20">
        <button 
          className="w-full py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-white"
          style={{ background: primaryColor }}
        >
          <Save size={18} /> Enregistrer le contact
        </button>
      </div>
    </div>
  );
}
