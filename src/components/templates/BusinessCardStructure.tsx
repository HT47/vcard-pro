import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";

const BusinessCardStructure = ({ data }: { data?: any }) => {
  const { t } = useI18n();
  const name = data?.name || "Kimberly Nguyen";
  const role = data?.role || "Realtor";
  const email = data?.email || "hello@reallygreatsite.com";
  const phone = data?.phone || "+123-456-7890";
  const website = data?.website || "reallygreatsite.com";
  const company = data?.company || "Larana, Inc.";
  const avatarUrl = data?.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";
  
  const themeColor = data?.theme?.bg || "#f59e0b"; // Orange default

  const renderSocialIcon = (link: any, index: number) => {
    const platform = link.platform.toLowerCase();
    let icon = platform;
    if (platform === 'facebook') icon = 'facebook-f';
    if (platform === 'website') icon = 'globe';
    return (
      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" style={{ color: themeColor }}>
        <i className={`fab fa-${icon} text-sm`}></i>
      </a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-sm mx-auto h-[750px] bg-black rounded-[40px] overflow-hidden shadow-2xl flex flex-col rtl:dir-rtl text-white font-sans"
    >
      {/* Background Image for Top Half */}
      <div className="absolute top-0 left-0 w-full h-[400px] opacity-20">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" alt="House" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
      </div>

      {/* Top Content */}
      <div className="relative z-10 px-8 pt-10 h-[400px]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md flex items-center justify-center" style={{ backgroundColor: themeColor }}>
            <i className="fas fa-home text-black text-xl"></i>
          </div>
          <div className="leading-tight">
            <h2 className="text-xl font-bold">{company}</h2>
            <p className="text-[10px] tracking-wider uppercase text-gray-300">Business Company</p>
          </div>
        </div>

        {/* Catchphrase */}
        <h1 className="text-3xl font-extrabold leading-tight w-2/3">Trust Your<br/>House To Us!</h1>

        {/* Profile Picture */}
        <div className="absolute bottom-4 right-8 w-[160px] h-[160px] rounded-[2rem] border-[4px] border-white/20 shadow-2xl overflow-hidden bg-white z-20 transition-transform hover:scale-105">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Middle Bar: QR & Name */}
      <div className="relative z-20 flex w-full h-[120px] bg-black">
        <div className="w-[45%] flex justify-end items-center relative h-full">
          {/* Half circle orange background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full z-0 translate-x-12" style={{ backgroundColor: themeColor }}></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 bg-black rounded-full z-10 translate-x-8 border-[6px] border-black flex items-center justify-center">
            {/* Circular text could go here, simplified as border text or standard text */}
            <div className="w-16 h-16 bg-white p-1 rounded-md">
              <QRCodeSVG value={website || "https://example.com"} size={100} className="w-full h-full" />
            </div>
            <div className="absolute inset-0 border border-white/20 rounded-full m-2"></div>
            {/* Scan me text curved - simplified using absolute positioning */}
            <svg viewBox="0 0 100 100" className="absolute w-full h-full text-white/70 text-[8px] tracking-widest font-bold uppercase animate-[spin_20s_linear_infinite]">
              <path id="curve" d="M 15 50 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0" fill="transparent" />
              <text><textPath href="#curve" startOffset="0%">Scan Me • Scan Me • Scan Me • Scan Me • </textPath></text>
            </svg>
          </div>
        </div>
        <div className="w-[55%] flex flex-col justify-center pl-10 h-full relative z-20" style={{ backgroundColor: 'black' }}>
          <h2 className="text-3xl font-bold leading-none mb-1">{name.split(' ')[0]}<br/>{name.split(' ')[1]}</h2>
          <p className="text-xl font-light text-gray-300">{role}</p>
        </div>
      </div>

      {/* Bottom Orange Section */}
      <div className="flex-grow flex flex-col justify-center px-10 gap-6" style={{ backgroundColor: themeColor }}>
        <motion.a 
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          href={`tel:${phone}`}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl group-hover:bg-white/90 transition-colors" style={{ color: themeColor }}>
            <i className="fas fa-phone-alt"></i>
          </div>
          <div className="text-black">
            <p className="text-sm font-medium">{t('phone')} Number:</p>
            <p className="text-xl font-bold">{phone}</p>
          </div>
        </motion.a>
        
        <motion.a 
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          href={website?.startsWith('http') ? website : `https://${website}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl group-hover:bg-white/90 transition-colors" style={{ color: themeColor }}>
            <i className="fas fa-globe"></i>
          </div>
          <div className="text-black overflow-hidden">
            <p className="text-sm font-medium">{t('website')}:</p>
            <p className="text-xl font-bold truncate">{website.replace(/^https?:\/\//, '')}</p>
          </div>
        </motion.a>
        
        <motion.a 
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          href={`mailto:${email}`}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl group-hover:bg-white/90 transition-colors" style={{ color: themeColor }}>
            <i className="fas fa-envelope"></i>
          </div>
          <div className="text-black overflow-hidden">
            <p className="text-sm font-medium">{t('email')} Address:</p>
            <p className="text-xl font-bold truncate">{email}</p>
          </div>
        </motion.a>

        {/* Social Links */}
        {data?.socialLinks && data.socialLinks.length > 0 && (
          <div className="flex items-center gap-3 mt-2">
            {data.socialLinks.map((link: any, idx: number) => renderSocialIcon(link, idx))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BusinessCardStructure;
