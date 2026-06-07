import { motion } from "framer-motion";

const BusinessCardV3 = ({ data }: { data?: any }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] bg-white overflow-hidden flex flex-col font-sans shadow-2xl">
      {/* Geometric Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Top Left Triangles */}
        <div className="absolute top-0 left-0 w-[80%] h-[30%] bg-[#567bbd] clip-path-polygon-[0_0,100%_0,0_100%] opacity-20"></div>
        <div className="absolute top-0 left-0 w-[60%] h-[25%] bg-[#213561] clip-path-polygon-[0_0,100%_0,0_100%]"></div>
        {/* Bottom Right Triangles */}
        <div className="absolute bottom-0 right-0 w-[100%] h-[30%] bg-[#567bbd] clip-path-polygon-[100%_100%,100%_0,0_100%] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[80%] h-[20%] bg-[#213561] clip-path-polygon-[100%_100%,100%_0,0_100%]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-16 px-8 h-full">
        {/* Avatar */}
        <div className="w-56 h-56 rounded-full border-8 border-[#213561] overflow-hidden mb-6 shadow-xl bg-gray-100 flex-shrink-0">
          <img 
            src={data?.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Title */}
        <div className="text-center mb-8 w-full">
          <h1 className="text-[#213561] text-3xl font-black uppercase tracking-wider mb-1">{data?.name || "SACHA DUBOIS"}</h1>
          <p className="text-[#213561] text-sm font-semibold uppercase tracking-widest">{data?.role || "GENERAL MANAGER"}</p>
        </div>

        {/* Contact Section */}
        <div className="w-full text-left">
          <h2 className="text-[#213561] text-xl font-bold uppercase mb-6 tracking-wide">CONTACT</h2>
          
          <div className="space-y-4">
            <motion.a whileHover={{ scale: 1.02 }} href={`mailto:${data?.email || "hello@reallygreatsite.com"}`} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#213561] flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:bg-[#567bbd] transition-colors">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <p className="text-[#213561] text-sm font-medium truncate group-hover:text-[#567bbd] transition-colors">{data?.email || "hello@reallygreatsite.com"}</p>
            </motion.a>
            
            <motion.a whileHover={{ scale: 1.02 }} href={data?.website?.startsWith('http') ? data.website : `https://${data?.website || "www.reallygreatsite.com"}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#213561] flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:bg-[#567bbd] transition-colors">
                <i className="fa-solid fa-globe"></i>
              </div>
              <p className="text-[#213561] text-sm font-medium truncate group-hover:text-[#567bbd] transition-colors">{data?.website || "www.reallygreatsite.com"}</p>
            </motion.a>

            <motion.a whileHover={{ scale: 1.02 }} href={`https://maps.google.com/?q=${encodeURIComponent(data?.location || "123 Anywhere St., Any City, ST 12345")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#213561] flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:bg-[#567bbd] transition-colors">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <p className="text-[#213561] text-sm font-medium leading-tight group-hover:text-[#567bbd] transition-colors">
                {data?.location || "123 Anywhere St., Any City, ST 12345"}
              </p>
            </motion.a>

            <motion.a whileHover={{ scale: 1.02 }} href={`tel:${data?.phone || "+123-456-7890"}`} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#213561] flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:bg-[#567bbd] transition-colors">
                <i className="fa-solid fa-phone"></i>
              </div>
              <p className="text-[#213561] text-sm font-medium truncate group-hover:text-[#567bbd] transition-colors">{data?.phone || "+123-456-7890"}</p>
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* CSS for clip-path */}
      <style dangerouslySetInnerHTML={{__html: `
        .clip-path-polygon-\\[0_0\\,100\\%_0\\,0_100\\%\\] { clip-path: polygon(0 0, 100% 0, 0 100%); }
        .clip-path-polygon-\\[100\\%_100\\%\\,100\\%_0\\,0_100\\%\\] { clip-path: polygon(100% 100%, 100% 0, 0 100%); }
      `}} />
    </div>
  );
};

export default BusinessCardV3;
