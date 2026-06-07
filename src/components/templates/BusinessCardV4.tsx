import { motion } from "framer-motion";

const BusinessCardV4 = ({ data }: { data?: any }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] bg-white overflow-hidden flex flex-col font-sans shadow-2xl">
      {/* Header Background (Blue angled) */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#0ea5e9] overflow-hidden z-0">
        {/* Halftone pattern overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '8px 8px'
        }}></div>
        {/* Angled bottom cut using CSS clip-path */}
        <div className="absolute bottom-0 w-full h-12 bg-white clip-path-polygon-[0_100%,100%_100%,100%_0]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-10 h-full">
        {/* Avatar */}
        <div className="w-52 h-52 rounded-full border-[6px] border-white overflow-hidden mb-8 shadow-xl bg-blue-100 flex-shrink-0">
          <img 
            src={data?.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Title */}
        <div className="text-center w-full mb-6">
          <h1 className="text-[#0ea5e9] text-[34px] font-black tracking-tight mb-1">{data?.name || "Théo Faure"}</h1>
          <p className="text-[#64748b] text-[15px] font-semibold tracking-wider uppercase">{data?.role || "Chef de projet digital"}</p>
        </div>

        {/* Divider */}
        <div className="w-20 h-1.5 bg-[#0ea5e9] rounded-full mb-10"></div>

        {/* Contact Info List */}
        <div className="w-full space-y-5">
          <motion.a whileHover={{ x: 5 }} href={`tel:${data?.phone || "+123-456-7890"}`} className="flex items-center gap-5 group cursor-pointer">
            <div className="w-6 flex justify-center transition-transform group-hover:scale-110">
              <i className="fa-solid fa-mobile-screen text-[#0ea5e9] text-2xl"></i>
            </div>
            <p className="text-[#475569] font-medium text-[15px] group-hover:text-[#0ea5e9] transition-colors">{data?.phone || "+123-456-7890"}</p>
          </motion.a>

          <motion.a whileHover={{ x: 5 }} href={`mailto:${data?.email || "hello@reallygreatsite.com"}`} className="flex items-center gap-5 group cursor-pointer">
            <div className="w-6 flex justify-center transition-transform group-hover:scale-110">
              <i className="fa-solid fa-envelope text-[#0ea5e9] text-xl"></i>
            </div>
            <p className="text-[#475569] font-medium text-[15px] truncate group-hover:text-[#0ea5e9] transition-colors">{data?.email || "hello@reallygreatsite.com"}</p>
          </motion.a>

          <motion.a whileHover={{ x: 5 }} href={data?.website?.startsWith('http') ? data.website : `https://${data?.website || "www.reallygreatsite.com"}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer">
            <div className="w-6 flex justify-center transition-transform group-hover:scale-110">
              <i className="fa-solid fa-globe text-[#0ea5e9] text-xl"></i>
            </div>
            <p className="text-[#475569] font-medium text-[15px] truncate group-hover:text-[#0ea5e9] transition-colors">{data?.website || "www.reallygreatsite.com"}</p>
          </motion.a>

          <motion.a whileHover={{ x: 5 }} href={`https://maps.google.com/?q=${encodeURIComponent(data?.location || "123 Anywhere St., Any City")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer">
            <div className="w-6 flex justify-center transition-transform group-hover:scale-110">
              <i className="fa-solid fa-location-dot text-[#0ea5e9] text-2xl"></i>
            </div>
            <p className="text-[#475569] font-medium text-[15px] leading-tight group-hover:text-[#0ea5e9] transition-colors">
              {data?.location || "123 Anywhere St., Any City"}
            </p>
          </motion.a>
        </div>
      </div>
      
      {/* CSS for clip-path */}
      <style dangerouslySetInnerHTML={{__html: `
        .clip-path-polygon-\\[0_100\\%\\,100\\%_100\\%\\,100\\%_0\\] { clip-path: polygon(0 100%, 100% 100%, 100% 0); }
      `}} />
    </div>
  );
};

export default BusinessCardV4;
