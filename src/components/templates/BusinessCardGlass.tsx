import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";

const BusinessCardGlass = ({ data }: { data?: any }) => {
  const { t } = useI18n();
  const name = data?.name || "Margarita Perez";
  const role = data?.role || "Senior Marketing";
  const email = data?.email || "hello@reallygreatsite.com";
  const phone = data?.phone || "+123-456-7890";
  const website = data?.website || "www.reallygreatsite.com";
  const location = data?.location || "123 Anywhere St., Any City";
  const company = data?.company || "Rimberio";
  const avatarUrl = data?.avatarUrl || "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80";

  // Base colors
  const darkBlue = data?.theme?.bg || "#0a1945"; // Dark navy
  const lightBlue = data?.theme?.shadow ? data.theme.bg : "#5b9ed4"; // Light blue accent (fallback or use theme if provided)

  const renderSocialIcon = (link: any, index: number) => {
    const platform = link.platform.toLowerCase();
    let icon = platform;
    if (platform === 'facebook') icon = 'facebook-f';
    if (platform === 'website') icon = 'globe';
    return (
      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" style={{ color: darkBlue }}>
        <i className={`fab fa-${icon} text-sm`}></i>
      </a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-sm mx-auto h-[750px] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col rtl:dir-rtl font-sans"
    >
      {/* Background Shapes */}
      {/* Large Top Right Dark Circle/Blob */}
      <div 
        className="absolute -top-24 -right-16 w-[350px] h-[400px] rounded-[100px] rounded-br-[150px] rounded-tl-[50px] rotate-[15deg] z-0"
        style={{ backgroundColor: darkBlue }}
      ></div>
      
      {/* Middle Left Light Blue Diamond/Rounded Square */}
      <div 
        className="absolute top-[240px] left-8 w-[100px] h-[100px] rounded-[30px] rotate-45 z-0"
        style={{ backgroundColor: lightBlue }}
      ></div>

      {/* Small Dark Blue rounded square behind avatar */}
      <div 
        className="absolute top-[130px] right-[240px] w-16 h-16 rounded-[20px] rotate-[20deg] z-0"
        style={{ backgroundColor: darkBlue }}
      ></div>

      {/* Logo */}
      <div className="absolute top-10 left-8 z-20 flex items-center gap-2">
        {/* Custom icon for Rimberio */}
        <div className="flex items-end h-8 gap-[2px]">
          <div className="w-2.5 h-6 bg-blue-300 rounded-sm"></div>
          <div className="w-2.5 h-8 bg-blue-500 rounded-sm"></div>
          <div className="w-2.5 h-5 bg-blue-800 rounded-sm"></div>
        </div>
        <div className="leading-tight">
          <h2 className="text-sm font-extrabold text-[#0a1945] tracking-wide" style={{ color: darkBlue }}>{company}</h2>
          <p className="text-[9px] text-[#5b9ed4] font-bold uppercase tracking-wider" style={{ color: lightBlue }}>Company</p>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="relative z-10 mt-[100px] self-end mr-8">
        <div className="w-[230px] h-[230px] rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-gray-200">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name and Role */}
      <div className="text-right px-10 mt-6 z-10">
        <h1 className="text-[3.2rem] font-bold leading-[1.1] tracking-tight" style={{ color: darkBlue }}>
          {name.split(' ')[0]}<br />{name.split(' ')[1] || ''}
        </h1>
        <p className="text-2xl font-semibold mt-2" style={{ color: lightBlue }}>{role}</p>
      </div>

      {/* Bottom Block */}
      <div className="absolute bottom-10 left-0 w-[95%] h-[240px] rounded-tr-[20px] rounded-br-[20px] z-10 flex flex-col justify-center px-8" style={{ backgroundColor: darkBlue }}>
        {/* Decorative Diamonds */}
        <div className="absolute -top-4 left-10 w-10 h-10 rounded-[10px] rotate-45" style={{ backgroundColor: lightBlue }}></div>
        <div className="absolute -top-4 left-24 w-10 h-10 rounded-[10px] rotate-45" style={{ backgroundColor: lightBlue }}></div>
        
        {/* Light blue shadow panel right */}
        <div className="absolute top-6 -right-3 w-10 h-[210px] rounded-tr-[20px] rounded-br-[20px] -z-10" style={{ backgroundColor: lightBlue }}></div>

        {/* Contact Info Block */}
        <div className="flex flex-col gap-5 text-white w-full pr-6 items-end">
          <motion.a 
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${phone}`}
            className="flex items-center gap-4 justify-end w-full cursor-pointer group"
          >
            <span className="text-[1.05rem] font-medium group-hover:opacity-80 transition-opacity">{phone}</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" style={{ color: darkBlue }}>
              <i className="fab fa-whatsapp text-lg"></i>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${email}`}
            className="flex items-center gap-4 justify-end w-full cursor-pointer group"
          >
            <span className="text-[1.05rem] font-medium truncate group-hover:opacity-80 transition-opacity">{email}</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" style={{ color: darkBlue }}>
              <i className="fas fa-envelope text-sm"></i>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 justify-end w-full cursor-pointer group"
          >
            <span className="text-[1.05rem] font-medium truncate group-hover:opacity-80 transition-opacity">{location}</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" style={{ color: darkBlue }}>
              <i className="fas fa-map-marker-alt text-sm"></i>
            </div>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            href={website?.startsWith('http') ? website : `https://${website}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 justify-end w-full cursor-pointer group"
          >
            <span className="text-[1.05rem] font-medium truncate group-hover:opacity-80 transition-opacity">{website.replace(/^https?:\/\//, '')}</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" style={{ color: darkBlue }}>
              <i className="fas fa-globe text-sm"></i>
            </div>
          </motion.a>

          {/* Social Links */}
          {data?.socialLinks && data.socialLinks.length > 0 && (
            <div className="flex items-center gap-3 justify-end w-full mt-2">
              {data.socialLinks.map((link: any, idx: number) => renderSocialIcon(link, idx))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Bottom Strips */}
      <div className="absolute bottom-0 left-0 w-full h-[30px] flex gap-4 z-0">
        <div className="w-[40%] h-full rounded-tr-[15px]" style={{ backgroundColor: darkBlue }}></div>
        <div className="w-[60%] h-full rounded-tl-[15px]" style={{ backgroundColor: lightBlue }}></div>
      </div>
    </motion.div>
  );
};

export default BusinessCardGlass;
