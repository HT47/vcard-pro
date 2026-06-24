import { motion } from 'framer-motion';

export default function LinkInBioBeacons({ data }: { data: any }) {
  const isLight = data.mode === 'light';
  
  return (
    <div className={`min-h-full flex flex-col px-4 py-10 relative overflow-hidden ${isLight ? 'text-zinc-900 bg-zinc-100' : 'text-white bg-black'}`}>
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: data.theme.gradient, filter: 'blur(80px)' }} />
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-28 h-28 rounded-3xl overflow-hidden mb-5 shadow-2xl p-1 bg-white/10 backdrop-blur-md"
        >
          <div className="w-full h-full rounded-[1.3rem] overflow-hidden">
            {data.avatarUrl ? (
              <img src={data.avatarUrl} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-3xl font-bold">{data.name.charAt(0)}</div>
            )}
          </div>
        </motion.div>

        <h1 className="text-2xl font-black tracking-tight mb-1">{data.name}</h1>
        <p className="text-sm font-medium mb-8 opacity-70 text-center max-w-[280px]">{data.bio}</p>

        <div className="w-full max-w-sm space-y-4">
          {data.socialLinks.map((link: any, index: number) => (
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full py-4 px-6 rounded-2xl bg-white/10 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md hover:bg-white/20 transition-colors group"
            >
              <span className="font-bold tracking-wide">{link.platform}</span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
