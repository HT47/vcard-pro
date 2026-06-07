import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";

const BusinessCardFreelance = ({ data }: { data?: any }) => {
  const { t } = useI18n();
  const name = data?.name || "Olivia Wilson";
  const role = data?.role || "Freelance";
  const email = data?.email || "hello@reallygreatsite.com";
  const phone = data?.phone || "+123-456-7890";
  const location = data?.location || "123 Anywhere St., Any City";
  const avatarUrl = data?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80";

  // Base colors
  const darkBlue = data?.theme?.bg || "#1e3a8a"; // Dark blue
  const accentOrange = data?.theme?.shadow ? data.theme.bg : "#f97316"; // Orange accent

  const renderSocialIcon = (link: any, index: number) => {
    const platform = link.platform.toLowerCase();
    let icon = platform;
    if (platform === 'facebook') icon = 'facebook-f';
    if (platform === 'website') icon = 'globe';
    return (
      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm" style={{ backgroundColor: darkBlue, color: 'white' }}>
        <i className={`fab fa-${icon} text-[13px]`}></i>
      </a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-sm mx-auto h-[750px] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col items-center rtl:dir-rtl font-sans text-[#1e3a8a]"
    >
      {/* Top Dark Blue Wave */}
      <div 
        className="absolute top-0 left-0 w-full h-[250px] z-0"
        style={{ backgroundColor: darkBlue }}
      >
        <svg viewBox="0 0 400 100" className="absolute bottom-0 w-full h-auto translate-y-[98%]" preserveAspectRatio="none">
          <path d="M0,0 Q200,100 400,0 L400,-1 L0,-1 Z" fill={darkBlue} />
        </svg>
      </div>

      {/* Profile Picture */}
      <div className="relative z-10 mt-[100px]">
        <div className="w-[240px] h-[240px] rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-gray-200">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name and Role */}
      <div className="text-center mt-6 z-10 w-full px-6">
        <h1 
          className="text-[3.5rem] font-black leading-[1.1] uppercase tracking-tight" 
          style={{ color: darkBlue }}
        >
          {name.split(' ')[0]}<br />{name.split(' ')[1] || ''}
        </h1>
        <p 
          className="text-2xl font-medium tracking-[0.2em] mt-3 uppercase" 
          style={{ color: darkBlue, opacity: 0.8 }}
        >
          {role}
        </p>
      </div>

      {/* Bottom Content Area */}
      <div className="flex w-full mt-12 px-10 relative z-10 flex-grow">
        
        {/* Left Orange Crosses */}
        <div className="w-[60px] flex flex-col justify-center gap-6 pb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute w-10 h-3 rounded-full rotate-45" style={{ backgroundColor: accentOrange }}></div>
              <div className="absolute w-10 h-3 rounded-full -rotate-45" style={{ backgroundColor: accentOrange }}></div>
            </div>
          ))}
        </div>

        {/* Right Contact Info */}
        <div className="flex-1 flex flex-col justify-center gap-6 pb-12 pl-4">
          <motion.a 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${phone}`}
            className="block cursor-pointer group"
          >
            <p className="text-[1.05rem] font-medium opacity-80" style={{ color: darkBlue }}>Telephone:</p>
            <p className="text-[1.15rem] font-bold group-hover:opacity-70 transition-opacity" style={{ color: darkBlue }}>{phone}</p>
          </motion.a>
          <motion.a 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${email}`}
            className="block cursor-pointer group"
          >
            <p className="text-[1.05rem] font-medium opacity-80" style={{ color: darkBlue }}>Email:</p>
            <p className="text-[1.15rem] font-bold truncate group-hover:opacity-70 transition-opacity" style={{ color: darkBlue }}>{email}</p>
          </motion.a>
          <motion.a 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
            target="_blank" rel="noopener noreferrer"
            className="block cursor-pointer group"
          >
            <p className="text-[1.05rem] font-medium opacity-80" style={{ color: darkBlue }}>Address:</p>
            <p className="text-[1.15rem] font-bold leading-tight group-hover:opacity-70 transition-opacity" style={{ color: darkBlue }}>{location}</p>
          </motion.a>
          
          {/* Social Links */}
          {data?.socialLinks && data.socialLinks.length > 0 && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {data.socialLinks.map((link: any, idx: number) => renderSocialIcon(link, idx))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCardFreelance;
