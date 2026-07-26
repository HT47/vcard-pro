import React from 'react';
import { Video, Camera, Tv, Save, Mail, Globe, Youtube, Instagram, Music2, Share2, MapPin } from 'lucide-react';

interface Props {
  data: any;
}

export default function TemplateCreator({ data }: Props) {
  const primaryColor = data.theme?.bg || '#9333ea';
  const stats = data.stats || [
    { platform: 'YouTube', count: '125K', label: 'Abonnés' },
    { platform: 'Instagram', count: '89K', label: 'Abonnés' },
    { platform: 'TikTok', count: '150K', label: 'Abonnés' }
  ];

  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('youtube')) return <Youtube size={18} className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />;
    if (p.includes('insta')) return <Instagram size={18} className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />;
    if (p.includes('tiktok')) return <Music2 size={18} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />;
    if (p.includes('twitch')) return <Tv size={18} className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />;
    return <Share2 size={18} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />;
  };

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
            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
              <div className="flex items-center gap-4 z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  {getPlatformIcon(stat.platform)}
                </div>
                <span className="text-base font-bold text-white tracking-wide">{stat.platform}</span>
              </div>
              <div className="text-right z-10">
                <span className="text-lg font-black block text-white drop-shadow-md">{stat.count}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact info below stats */}
        <div className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 mb-10 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
                <Mail size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Collaboration</span>
                <span className="text-sm font-medium text-zinc-200">{data.email || "lucas.creator@email.com"}</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
                <Globe size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Site & Portfolio</span>
                <span className="text-sm font-medium text-zinc-200">{data.website || "www.lucascreator.com"}</span>
              </div>
            </div>
          </div>
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
