import { motion } from "framer-motion";

const EventFlyerV2 = ({ data }: { data?: any }) => {
  const event = data?.eventData?.[0] || {};

  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] bg-[#F2EFE9] overflow-hidden flex flex-col items-center font-sans shadow-2xl pt-12 pb-6 px-6">
      
      {/* Background Texture/Noise overlay (optional but adds retro feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      {/* Title Stamp Blocks */}
      <div className="relative z-10 w-full flex flex-col items-center mt-6">
        {/* Line 1 */}
        <div className="bg-[#D32F2F] text-[#F2EFE9] px-6 py-1 transform -rotate-2 shadow-sm relative w-4/5 text-center">
          {/* Distressed edge effect */}
          <div className="absolute inset-0 border-2 border-[#D32F2F] transform scale-[1.03] opacity-50 -rotate-1"></div>
          <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>
            {event.title?.split(' ')[0] || "FÊTE"}
          </h1>
        </div>

        {/* Small Connector Block */}
        <div className="bg-[#1A2530] text-[#F2EFE9] px-3 py-1 transform rotate-3 shadow-md translate-x-16 -translate-y-4 z-20">
          <h2 className="text-xl font-black uppercase tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>
            {event.title?.split(' ')[1] || "DE LA"}
          </h2>
        </div>

        {/* Line 2 */}
        <div className="bg-[#D32F2F] text-[#F2EFE9] px-8 py-1 transform 1 shadow-sm relative w-[85%] text-center -translate-y-2">
          <div className="absolute inset-0 border-2 border-[#D32F2F] transform scale-[1.02] opacity-40 rotate-1"></div>
          <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>
            {event.title?.split(' ').slice(2).join(' ') || "BIÈRE"}
          </h1>
        </div>
      </div>

      {/* Date Ribbon */}
      <div className="relative z-10 w-full bg-[#1A2530] text-[#F2EFE9] py-2 mt-8 text-center shadow-md">
        <p className="text-xs font-bold tracking-[0.2em] uppercase">
          {event.day || "SAMEDI"} {event.date || "20 SEPTEMBRE"} À {event.time || "20H"}
        </p>
      </div>

      {/* Location (Marker Style) */}
      <motion.a whileHover={{ scale: 1.05 }} href={`https://maps.google.com/?q=${encodeURIComponent(event.location || "TEMPO BAR, 123 ANYWHERE ST., ANY CITY")}`} target="_blank" rel="noopener noreferrer" className="relative z-10 mt-6 text-center w-full px-4 cursor-pointer block hover:opacity-80 transition-opacity">
        <p className="text-[#1A2530] text-[15px] font-black tracking-widest uppercase leading-relaxed" style={{ fontFamily: "'Oswald', sans-serif" }}>
          {event.location || "TEMPO BAR, 123 ANYWHERE ST., ANY CITY"}
        </p>
      </motion.a>

      {/* Illustration */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] flex justify-center items-end pointer-events-none">
        <img 
          src={event.img || "https://images.unsplash.com/photo-1575037614876-c38db546eb82?auto=format&fit=crop&w=400&q=80"} 
          alt="Illustration" 
          className="w-[85%] object-contain object-bottom mix-blend-multiply opacity-90 drop-shadow-md"
        />
      </div>

    </div>
  );
};

export default EventFlyerV2;
