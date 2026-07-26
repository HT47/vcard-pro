import React from 'react';
import { Youtube, Instagram, Twitch, Save, Mail, Globe } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateCreator({ data }: Props) {
  const primaryColor = data.theme?.bg || '#9333ea';
  const stats = data.stats || [
    { platform: 'YouTube', count: '125K', label: 'Abonnés', icon: <Youtube size={16} /> },
    { platform: 'Instagram', count: '89K', label: 'Abonnés', icon: <Instagram size={16} /> },
    { platform: 'Twitch', count: '150K', label: 'Followers', icon: <Twitch size={16} /> }
  ];

  return (
    <div className="w-full h-full min-h-[100dvh] bg-[#0a0514] flex flex-col font-sans relative overflow-x-hidden text-white">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px]" style={{ background: primaryColor }}></div>
        <div className="absolute top-1/3 -left-20 w-48 h-48 rounded-full blur-[60px]" style={{ background: '#d946ef' }}></div>
      </div>

      <div className="flex-1 flex flex-col items-center pt-20 px-8 pb-32 z-10 relative">
        {/* Avatar with Neon Glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full blur-md opacity-80" style={{ background: primaryColor, transform: 'scale(1.05)' }}></div>
          <div className="w-28 h-28 rounded-full border-2 border-black overflow-hidden relative z-10 bg-zinc-900">
            <img 
              src={data.avatarUrl || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-black text-white tracking-wide mb-1">{data.name || "Lucas Creator"}</h1>
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-zinc-400" style={{ color: primaryColor }}>
          {data.role || "Créateur de contenu"}
        </p>

        {/* Stats List */}
        <div className="w-full space-y-3 mb-8">
          {stats.map((stat: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="text-red-500">
                  {stat.icon || <Youtube size={16} />}
                </div>
                <span className="text-sm font-medium text-zinc-300">{stat.platform}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold block">{stat.count}</span>
                <span className="text-[9px] text-zinc-500 uppercase">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact info below stats */}
        <div className="w-full space-y-3 mb-10">
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <Mail size={14} className="text-zinc-500" />
            <span>{data.email || "lucas.creator@email.com"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <Globe size={14} className="text-zinc-500" />
            <span>{data.website || "www.lucascreator.com"}</span>
          </div>
        </div>

        {/* Big Neon Icons */}
        <div className="flex gap-6 items-center">
          <a href="#" className="text-red-500 hover:text-red-400 hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
            <Youtube size={32} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-400 hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
            <Instagram size={32} />
          </a>
          <a href="#" className="text-purple-500 hover:text-purple-400 hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
            <Twitch size={32} />
          </a>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0514] via-[#0a0514]/80 to-transparent z-20">
        <button 
          className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-white"
          style={{ 
            background: primaryColor, 
            boxShadow: `0 0 20px ${primaryColor}60, inset 0 0 10px rgba(255,255,255,0.2)`
          }}
        >
          <Save size={18} /> Enregistrer le contact
        </button>
      </div>
    </div>
  );
}
