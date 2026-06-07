import { motion } from "framer-motion";

const EventFlyerV1 = ({ data }: { data?: any }) => {
  const event = data?.eventData?.[0] || {};

  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] bg-[#FFF9E6] overflow-hidden flex flex-col font-sans shadow-2xl">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-tr from-[#FFB800] to-[#FF3366] rounded-full blur-[60px] opacity-60 pointer-events-none"></div>
      
      {/* Brand Top Left */}
      <motion.a whileHover={{ opacity: 0.7 }} href={data?.website?.startsWith('http') ? data.website : `https://${data?.website || "www.reallygreatsite.com"}`} target="_blank" rel="noopener noreferrer" className="pt-8 px-6 relative z-10 cursor-pointer inline-block">
        <p className="text-[#C01550] text-[10px] font-black uppercase tracking-[0.2em]">{data?.company || "BORCELLE"}</p>
      </motion.a>

      {/* Main Titles */}
      <div className="px-6 mt-6 relative z-10">
        <h1 className="text-[#C01550] text-7xl font-black uppercase leading-[0.85] tracking-tighter" style={{ WebkitTextStroke: '1.5px #C01550', color: 'transparent' }}>
          {event.title?.split(' ')[0] || "KARAOKÉ"}
        </h1>
        <h1 className="text-[#C01550] text-7xl font-black uppercase leading-[0.85] tracking-tighter mt-1">
          {event.title?.split(' ').slice(1).join(' ') || "NIGHT"}
        </h1>
        
        <p className="text-[#D8456B] text-sm font-medium mt-6 max-w-[200px] leading-snug">
          {event.desc || "Viens libérer ta voix sur tes hits préférés !"}
        </p>
      </div>

      {/* When / Time block */}
      <div className="px-6 mt-10 relative z-10">
        <p className="text-[#C01550] text-sm font-black uppercase mb-1">
          {event.day || "TOUT LES"}
        </p>
        <h2 className="text-[#C01550] text-3xl font-black uppercase tracking-tight mb-3">
          {event.location || "MERCREDIS"}
        </h2>
        <div className="inline-block bg-[#C01550] text-white px-4 py-1 font-bold text-lg rounded-sm shadow-md">
          {event.time || "20H00 - 22H00"}
        </div>
      </div>

      {/* Bottom Reservation & Illustration */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] pointer-events-none">
        {/* If user uploads an image, display it, else show a decorative shape */}
        <img 
          src={event.img || "https://images.unsplash.com/photo-1516280440504-62944b207503?auto=format&fit=crop&w=600&q=80"} 
          alt="Karaoke" 
          className="absolute bottom-0 right-[-20%] w-[120%] h-full object-cover mix-blend-multiply opacity-90"
          style={{ clipPath: 'circle(70% at 70% 80%)' }}
        />
        
        <motion.a whileHover={{ scale: 1.05 }} href={`tel:${data?.phone || "123-456-7890"}`} className="absolute bottom-10 left-6 pointer-events-auto cursor-pointer group bg-white/30 backdrop-blur-sm p-3 rounded-xl border border-white/40 shadow-lg">
          <p className="text-[#C01550] text-[10px] font-black uppercase mb-1 transition-colors group-hover:text-[#D8456B]">RÉSERVATION</p>
          <p className="text-[#D8456B] text-sm font-bold transition-colors group-hover:text-[#C01550]">{data?.phone || "123-456-7890"}</p>
        </motion.a>
      </div>
    </div>
  );
};

export default EventFlyerV1;
