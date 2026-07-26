import React from 'react';
import { Phone, Mail, MapPin, Globe, Plane, CheckCircle2, Map, CalendarHeart } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateTravel({ data }: Props) {
  const primaryColor = data.theme?.color || '#2563eb'; // Default Royal Blue
  const bgStyle = 'bg-white text-slate-800';

  return (
    <div className={`w-full min-h-full ${bgStyle} font-sans relative overflow-hidden pb-24`}>
      
      {/* Big Cover Image */}
      <div className="relative w-full h-[340px] rounded-b-[40px] overflow-hidden shadow-sm">
        {data.avatar ? (
          <img src={data.avatar} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80" alt="Travel" className="w-full h-full object-cover" />
        )}
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>

        {/* Company Header */}
        <div className="absolute top-8 left-6 flex items-center gap-2 text-white">
          <Plane size={24} className="animate-pulse" />
          <span className="font-bold text-lg tracking-wide">{data.company || "DreamTravel"}</span>
        </div>
        <div className="absolute top-14 left-14">
          <span className="text-[9px] uppercase tracking-widest text-white/80">Agence de Voyage</span>
        </div>

        {/* Main Title on Cover */}
        <div className="absolute bottom-10 left-6 text-white pr-6">
          <h1 className="text-4xl font-black mb-2 leading-tight">Voyagez<br/>Rêvez<br/>Découvrez</h1>
        </div>
      </div>

      <div className="px-6 pt-8 flex flex-col">
        
        {/* Name / Agent */}
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">{data.name || "Laura Benetti"}</h2>
          <p className="text-sm font-medium" style={{ color: primaryColor }}>{data.role || "Conseillère en Voyages"}</p>
        </div>

        {/* Services / Perks */}
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Nos Services</h3>
        <div className="space-y-3 mb-10">
          {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',').map((s:string)=>s.trim()) : ["Billets d'avion", "Séjours & Hôtels", "Voyages sur mesure", "Circuits & Excursions", "Assistance 24/7"])).map((skill: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle2 size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-slate-700">{skill}</span>
            </div>
          ))}
        </div>

        {/* Destinations Highlight (Mock visually pleasing element) */}
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Nos destinations coup de cœur</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden w-full mb-6">
          <div className="min-w-[100px] h-[120px] rounded-2xl relative overflow-hidden shrink-0">
             <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&auto=format&fit=crop&q=60" alt="Bali" className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent text-white">
               <p className="text-xs font-bold">Bali</p>
             </div>
          </div>
          <div className="min-w-[100px] h-[120px] rounded-2xl relative overflow-hidden shrink-0">
             <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&auto=format&fit=crop&q=60" alt="Maldives" className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent text-white">
               <p className="text-xs font-bold">Maldives</p>
             </div>
          </div>
          <div className="min-w-[100px] h-[120px] rounded-2xl relative overflow-hidden shrink-0">
             <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&auto=format&fit=crop&q=60" alt="Japon" className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent text-white">
               <p className="text-xs font-bold">Japon</p>
             </div>
          </div>
        </div>

        {/* Contact Block */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <Phone size={16} className="text-slate-400" />
            <span className="text-sm font-medium">{data.phone || "+33 6 45 67 89 01"}</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={16} className="text-slate-400" />
            <span className="text-sm font-medium">{data.email || "contact@dreamtravel.fr"}</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin size={16} className="text-slate-400" />
            <span className="text-sm font-medium">{data.location || "25 Boulevard Haussmann, Paris"}</span>
          </div>
        </div>

        {/* Main CTA */}
        <button 
          className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl hover:opacity-90 active:scale-95 transition-all tracking-wide flex items-center justify-center gap-2 mb-4"
          style={{ background: primaryColor }}
        >
          <CalendarHeart size={18} />
          Demander un devis
        </button>

      </div>

      {/* Floating Bottom Nav */}
      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 py-3 px-6 flex justify-between items-center z-20`}>
        <a href={`tel:${data.phone}`} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors" style={{ hover: { color: primaryColor } } as any}>
            <Phone size={18} />
          </div>
          <span className="text-[9px] font-bold uppercase text-slate-400">Appeler</span>
        </a>
        <a href={`mailto:${data.email}`} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors" style={{ hover: { color: primaryColor } } as any}>
            <Mail size={18} />
          </div>
          <span className="text-[9px] font-bold uppercase text-slate-400">Email</span>
        </a>
        <a href={data.website} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors" style={{ hover: { color: primaryColor } } as any}>
            <Globe size={18} />
          </div>
          <span className="text-[9px] font-bold uppercase text-slate-400">Site Web</span>
        </a>
      </div>
    </div>
  );
}
