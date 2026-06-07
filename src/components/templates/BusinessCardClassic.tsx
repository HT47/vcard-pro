import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";

const BusinessCardClassic = ({ data }: { data?: any }) => {
  const { t } = useI18n();
  const name = data?.name || "Théo Faure";
  const role = data?.role || "Chef de projet digital";
  const email = data?.email || "hello@reallygreatsite.com";
  const phone = data?.phone || "+123-456-7890";
  const website = data?.website || "www.reallygreatsite.com";
  const location = data?.location || "123 Anywhere St., Any City";
  const avatarUrl = data?.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80";

  const themeColor = data?.theme?.bg || "#0ea5e9"; // Default blue

  const renderSocialIcon = (link: any, index: number) => {
    const platform = link.platform.toLowerCase();
    let icon = platform;
    if (platform === 'facebook') icon = 'facebook-f';
    if (platform === 'website') icon = 'globe';
    return (
      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md" style={{ backgroundColor: themeColor, color: 'white' }}>
        <i className={`fab fa-${icon} text-lg`}></i>
      </a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-sm mx-auto h-[750px] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col items-center rtl:dir-rtl text-[#1a2b6d] font-sans"
    >
      {/* Top Dotted Background */}
      <div 
        className="absolute top-0 left-0 w-full h-[320px] z-0" 
        style={{ 
          backgroundColor: themeColor,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px)`,
          backgroundSize: '12px 12px',
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)'
        }}
      ></div>

      {/* Profile Picture */}
      <div className="relative z-10 mt-[120px]">
        <div className="w-[220px] h-[220px] rounded-full border-[8px] border-white shadow-xl overflow-hidden bg-gray-200">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name and Role */}
      <div className="text-center mt-6 px-4 z-10">
        <h1 className="text-[2.5rem] font-bold tracking-wide" style={{ color: themeColor }}>
          {name}
        </h1>
        <p className="text-xl text-[#3b5266] font-light tracking-wide mt-1">{role}</p>
      </div>

      {/* Separator Line */}
      <div className="w-24 h-2 mt-8 mb-10 rounded-full" style={{ backgroundColor: themeColor }}></div>

      {/* Contact Info */}
      <div className="w-full px-12 flex flex-col gap-6 text-[#1a365d] flex-grow pb-8">
        <motion.a 
          whileHover={{ scale: 1.05, x: 5 }} 
          whileTap={{ scale: 0.95 }}
          href={`tel:${phone}`} 
          className="flex items-center gap-6 cursor-pointer group"
        >
          <div className="w-8 flex justify-center group-hover:opacity-80 transition-opacity" style={{ color: themeColor }}>
            <i className="fas fa-mobile-alt text-3xl"></i>
          </div>
          <span className="text-lg font-medium group-hover:text-blue-500 transition-colors">{phone}</span>
        </motion.a>
        
        <motion.a 
          whileHover={{ scale: 1.05, x: 5 }} 
          whileTap={{ scale: 0.95 }}
          href={`mailto:${email}`} 
          className="flex items-center gap-6 cursor-pointer group"
        >
          <div className="w-8 flex justify-center group-hover:opacity-80 transition-opacity" style={{ color: themeColor }}>
            <i className="fas fa-envelope text-[1.6rem]"></i>
          </div>
          <span className="text-lg font-medium truncate group-hover:text-blue-500 transition-colors">{email}</span>
        </motion.a>
        
        <motion.a 
          whileHover={{ scale: 1.05, x: 5 }} 
          whileTap={{ scale: 0.95 }}
          href={website?.startsWith('http') ? website : `https://${website}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-6 cursor-pointer group"
        >
          <div className="w-8 flex justify-center group-hover:opacity-80 transition-opacity" style={{ color: themeColor }}>
            <i className="fas fa-globe text-[1.7rem]"></i>
          </div>
          <span className="text-lg font-medium truncate group-hover:text-blue-500 transition-colors">{website.replace(/^https?:\/\//, '')}</span>
        </motion.a>
        
        <motion.a 
          whileHover={{ scale: 1.05, x: 5 }} 
          whileTap={{ scale: 0.95 }}
          href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-6 cursor-pointer group"
        >
          <div className="w-8 flex justify-center group-hover:opacity-80 transition-opacity" style={{ color: themeColor }}>
            <i className="fas fa-map-marker-alt text-3xl"></i>
          </div>
          <span className="text-lg font-medium truncate group-hover:text-blue-500 transition-colors">{location}</span>
        </motion.a>

        {/* Social Links */}
        {data?.socialLinks && data.socialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-2">
            {data.socialLinks.map((link: any, idx: number) => renderSocialIcon(link, idx))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BusinessCardClassic;
