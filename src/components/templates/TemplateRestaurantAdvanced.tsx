import React, { useState } from 'react';
import { Phone, MapPin, Globe, Calendar, Users, Camera, Share2, UserPlus, QrCode, ShoppingCart, ChevronRight, Info, Utensils, Star, Image as ImageIcon, Heart, Mail } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateRestaurantAdvanced({ data }: Props) {
  const primaryColor = data.theme?.bg || '#064e3b'; // Dark green
  const accentColor = '#d4af37'; // Gold
  const coverImg = data.coverUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
  const logoImg = data.avatarUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80";

  const [activeTab, setActiveTab] = useState('Menu');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const menuItems = data.menu || [
    { id: 1, name: "Carpaccio de Bœuf", desc: "Fines tranches de bœuf, roquette, parmesan, huile d'olive, citron.", price: "€14.90", category: "Entrées", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Pâtes à la Truffe", desc: "Tagliatelles fraîches, crème de truffe, parmesan, champignons.", price: "€18.90", category: "Plats", img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=200&q=80", isChef: true },
    { id: 3, name: "Entrecôte Grillée", desc: "Entrecôte de bœuf grillée, sauce au choix, légumes de saison.", price: "€24.90", category: "Plats", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80" },
    { id: 4, name: "Saumon au Four", desc: "Saumon frais, herbes aromatiques, riz sauvage, légumes grillés.", price: "€19.90", category: "Plats", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=200&q=80" },
    { id: 5, name: "Fondant au Chocolat", desc: "Cœur coulant, glace vanille, coulis de chocolat.", price: "€7.90", category: "Desserts", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=200&q=80" },
    { id: 6, name: "Cheesecake Maison", desc: "Cheesecake crémeux, coulis de fruits rouges, biscuit croustillant.", price: "€6.90", category: "Desserts", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=200&q=80" }
  ];

  const categories = ["Tous", "Entrées", "Plats", "Desserts", "Boissons"];

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#111] flex flex-col font-sans relative overflow-x-hidden text-white">
      
      {/* Top Image with Blur and Status */}
      <div 
        className="w-full h-64 relative"
        style={{ background: `url(${coverImg}) center/cover` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#111]"></div>
        
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${data.isOpen !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs font-bold text-white">{data.isOpen !== false ? 'Ouvert' : 'Fermé'}</span>
        </div>

        {/* Logo and Titles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full">
          <div className="w-28 h-28 rounded-full border-2 overflow-hidden bg-black mb-4 flex items-center justify-center p-1" style={{ borderColor: accentColor }}>
            <img src={logoImg} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-1 tracking-wide">{data.name || "Le Goût Restaurant"}</h1>
          <p className="text-xs text-zinc-300 font-medium">{data.role || "Saveurs authentiques, moments inoubliables"}</p>
          <div className="mt-4 text-zinc-500">
            <Utensils size={20} style={{ color: accentColor }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full bg-[#111] border-b border-white/10 sticky top-0 z-30">
        {[
          { name: 'À propos', icon: <Info size={16} /> },
          { name: 'Menu', icon: <Utensils size={16} /> },
          { name: 'Spécialités', icon: <Star size={16} /> },
          { name: 'Boissons', icon: <Utensils size={16} /> },
          { name: 'Galerie', icon: <ImageIcon size={16} /> },
        ].map((tab) => (
          <button 
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-4 transition-colors relative ${activeTab === tab.name ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {activeTab === tab.name && <div className="absolute inset-0 bg-white/5" />}
            {activeTab === tab.name && (
              <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: accentColor }} />
            )}
            <div className={activeTab === tab.name ? `text-[${accentColor}]` : ''} style={{ color: activeTab === tab.name ? accentColor : undefined }}>
              {tab.icon}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#fdfdfd] text-zinc-800 pb-32">
        {activeTab === 'À propos' && (
          <div className="p-6 bg-[#0a1f16] min-h-full text-white">
            <div className="grid grid-cols-4 gap-2 mb-8">
              {[
                { icon: <Phone size={20} />, label: "Appeler" },
                { icon: <Phone size={20} />, label: "WhatsApp" },
                { icon: <MapPin size={20} />, label: "Itinéraire" },
                { icon: <Globe size={20} />, label: "Site Web" }
              ].map((btn, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <button className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    {btn.icon}
                  </button>
                  <span className="text-[10px] font-medium text-zinc-400">{btn.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              {[
                { icon: <Phone size={16} />, text: data.phone || "+33 1 23 45 67 89" },
                { icon: <Mail size={16} />, text: data.email || "contact@legout.fr" },
                { icon: <Globe size={16} />, text: data.website || "www.legout.fr" },
                { icon: <MapPin size={16} />, text: data.location || "15 Rue de la Paix, 75002 Paris" },
                { icon: <Calendar size={16} />, text: "Lun - Dim : 11h00 - 23h00" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-zinc-300">
                  <div style={{ color: accentColor }}>{item.icon}</div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl font-bold mb-3" style={{ color: accentColor }}>À propos de nous</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 whitespace-pre-wrap">
                {data.bio || "Le Goût Restaurant vous accueille dans un cadre chaleureux pour vous faire découvrir une cuisine raffinée préparée avec des produits frais et locaux."}
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {(data.restaurantStats || [
                  { value: "4.8", label: "Avis Google" },
                  { value: "1500+", label: "Clients" },
                  { value: "15+", label: "Années d'exp." }
                ]).map((stat: any, idx: number) => (
                  <div key={idx} className="text-center">
                    <div className="text-lg font-bold text-white flex items-center justify-center gap-1">
                      {stat.value} {stat.label.toLowerCase().includes("avis") && <Star size={14} style={{ color: accentColor, fill: accentColor }} />}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Menu' && (
          <div className="min-h-full">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-2">Notre Menu</h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-zinc-300 flex-1"></div>
                <Utensils size={14} className="text-zinc-400" />
                <div className="h-px bg-zinc-300 flex-1"></div>
              </div>

              {/* Categories */}
              <div className="flex overflow-x-auto gap-2 pb-4 [&::-webkit-scrollbar]:hidden">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-white' : 'bg-zinc-100 text-zinc-600'}`}
                    style={{ background: activeCategory === cat ? accentColor : undefined }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-4 space-y-4">
              {menuItems.filter((i: any) => activeCategory === 'Tous' || i.category === activeCategory).map((item: any) => (
                <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl shadow-sm border border-zinc-100">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm text-zinc-900 leading-tight">
                          {item.name}
                          {item.isChef && <span className="ml-2 px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[9px] rounded uppercase font-bold">Chef</span>}
                        </h3>
                        <span className="font-bold text-sm" style={{ color: accentColor }}>{item.price}</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-snug line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button className="text-zinc-400 hover:text-red-500 transition-colors">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Spécialités' && (
          <div className="min-h-full">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-2">Spécialités du Chef</h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-zinc-300 flex-1"></div>
                <Star size={14} className="text-zinc-400" />
                <div className="h-px bg-zinc-300 flex-1"></div>
              </div>
            </div>
            <div className="px-4 space-y-4">
              {menuItems.filter((i: any) => i.isChef).length > 0 ? menuItems.filter((i: any) => i.isChef).map((item: any) => (
                <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl shadow-sm border border-zinc-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rotate-45 translate-x-8 -translate-y-8 z-0"></div>
                  <Star size={12} className="absolute top-2 right-2 text-orange-500 z-10" fill="currentColor" />
                  
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 z-10">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1 z-10">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm text-zinc-900 leading-tight pr-4">{item.name}</h3>
                        <span className="font-bold text-sm" style={{ color: accentColor }}>{item.price}</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-snug line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-zinc-500 py-10">Aucune spécialité définie.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Boissons' && (
          <div className="min-h-full">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-2">Nos Boissons</h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-zinc-300 flex-1"></div>
                <Utensils size={14} className="text-zinc-400" />
                <div className="h-px bg-zinc-300 flex-1"></div>
              </div>
            </div>
            <div className="px-4 space-y-4">
              {menuItems.filter((i: any) => i.category.toLowerCase() === 'boissons' || i.category.toLowerCase() === 'boisson').length > 0 ? menuItems.filter((i: any) => i.category.toLowerCase() === 'boissons' || i.category.toLowerCase() === 'boisson').map((item: any) => (
                <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl shadow-sm border border-zinc-100">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm text-zinc-900 leading-tight">{item.name}</h3>
                        <span className="font-bold text-sm" style={{ color: accentColor }}>{item.price}</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-snug line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-zinc-500 py-10">Aucune boisson à la carte.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Galerie' && (
          <div className="min-h-full">
            <div className="p-6 text-center pb-2">
              <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-2">Galerie</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px bg-zinc-300 flex-1"></div>
                <ImageIcon size={14} className="text-zinc-400" />
                <div className="h-px bg-zinc-300 flex-1"></div>
              </div>
            </div>
            <div className="px-4 grid grid-cols-2 gap-2">
              {(data.gallery && data.gallery.length > 0) ? data.gallery.map((item: any) => (
                <div key={item.id} className="aspect-square rounded-xl overflow-hidden bg-zinc-100 shadow-sm border border-zinc-200">
                  {item.img && <img src={item.img} alt="Galerie" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />}
                </div>
              )) : (
                <div className="col-span-2 text-center text-zinc-500 py-10">Aucune photo dans la galerie.</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      {activeTab === 'À propos' ? (
        <div className="fixed bottom-0 left-0 w-full bg-[#111] border-t border-white/10 p-4 pb-safe flex gap-2 z-40">
          <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors">
            <Share2 size={18} className="text-zinc-400" />
            <span className="text-[10px] font-medium text-zinc-400">Partager</span>
          </button>
          <button className="flex-[2] py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm text-[#111] transition-transform active:scale-95 shadow-xl" style={{ background: accentColor }}>
            <UserPlus size={18} /> Ajouter au contact
          </button>
          <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors">
            <QrCode size={18} className="text-zinc-400" />
            <span className="text-[10px] font-medium text-zinc-400">Scanner QR</span>
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 p-4 pb-safe z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button className="w-full py-4 rounded-xl flex items-center justify-between px-6 font-bold text-sm text-white transition-transform active:scale-95 shadow-xl" style={{ background: primaryColor }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ShoppingCart size={16} />
              </div>
              <span>Voir le panier</span>
            </div>
            <div className="flex items-center gap-2">
              <span>€45.70</span>
              <ChevronRight size={18} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
