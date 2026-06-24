import { motion } from 'framer-motion';

export default function LinkInBioTree({ data }: { data: any }) {
  const isLight = data.mode === 'light';
  
  return (
    <div className={`min-h-full flex flex-col items-center px-4 py-12 ${isLight ? 'bg-zinc-50 text-zinc-900' : 'bg-zinc-950 text-white'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-xl border-4 border-white/10"
      >
        {data.avatarUrl ? (
          <img src={data.avatarUrl} alt={data.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-3xl font-bold">{data.name.charAt(0)}</div>
        )}
      </motion.div>

      <h1 className="text-xl font-bold tracking-tight mb-1">{data.name}</h1>
      <p className="text-sm font-medium mb-8 opacity-80 text-center max-w-xs">{data.bio}</p>

      <div className="w-full max-w-sm space-y-3">
        {data.socialLinks.map((link: any, index: number) => (
          <motion.a
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-4 px-6 rounded-full font-bold shadow-md hover:scale-[1.02] transition-transform"
            style={{ background: data.theme.bg, color: '#fff' }}
          >
            {link.platform}
          </motion.a>
        ))}
      </div>
      
      <div className="mt-auto pt-12 opacity-50 text-[10px] tracking-widest uppercase font-bold">
        Propulsé par vCard Pro
      </div>
    </div>
  );
}
