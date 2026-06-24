import { motion } from 'framer-motion';

export default function LinkInBioSites({ data }: { data: any }) {
  return (
    <div className="min-h-full flex flex-col relative overflow-hidden bg-black text-white font-serif">
      {data.coverUrl ? (
        <img src={data.coverUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Cover" />
      ) : (
        <div className="absolute inset-0 opacity-50" style={{ background: data.theme.gradient }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-end flex-1 px-6 pb-12 pt-20">
        {data.avatarUrl && (
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={data.avatarUrl} 
            className="w-24 h-24 rounded-full mb-6 border-4 border-white/20 shadow-2xl" 
            alt="Avatar"
          />
        )}
        <h1 className="text-3xl font-medium mb-2 text-center tracking-wide">{data.name}</h1>
        <p className="text-sm opacity-80 text-center mb-8 font-sans font-light leading-relaxed max-w-xs">{data.bio}</p>

        <div className="w-full max-w-sm space-y-3 font-sans">
          {data.socialLinks.map((link: any, index: number) => (
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 px-6 rounded-lg border border-white/30 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[11px] font-bold"
            >
              {link.platform}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
