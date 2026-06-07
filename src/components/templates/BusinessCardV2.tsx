import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

const SocialIcon = ({ icon, color, href = "#" }: { icon: string; color: string; href?: string }) => (
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all backdrop-blur-md border border-white/10 ${color}`}
  >
    <i className={`fab fa-${icon} text-white text-lg`}></i>
  </motion.a>
);

const WebIcon = ({ href = "#" }: { href?: string }) => (
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
  >
    <i className="fas fa-globe text-white text-lg"></i>
  </motion.a>
);

const BusinessCardV2 = ({ data }: { data?: any }) => {
  const name = data?.name || "Claudia Alves";
  const role = data?.role || "Coiffeuse Claudia";
  const email = data?.email || "hello@reallygreatsite.com";
  const phone = data?.phone || "+41 77 277 77 77";
  const website = data?.website || "www.siteweb.ch";
  const avatarUrl = data?.avatarUrl || "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-sm mx-auto h-[750px] bg-neutral-950 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center text-center rtl:dir-rtl group"
    >
      {/* Golden Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-32 opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(to bottom, ${data?.theme?.bg || '#D4AF37'}40, transparent)` }} />
      
      {/* Profile Picture with Frame */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="mt-12 p-[2px] rounded-3xl shadow-[0_0_20px_rgba(212,175,55,0.3)] w-52 h-52 flex-shrink-0"
        style={{ background: data?.theme?.gradient || 'linear-gradient(to top right, #C5A028, #F3E5AB, #C5A028)' }}
      >
        <div className="rounded-3xl overflow-hidden bg-black w-full h-full flex items-center justify-center">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl text-white">{name.charAt(0)}</span>
          )}
        </div>
      </motion.div>

      {/* Name and Title */}
      <h1 className="text-white font-extrabold text-3xl mt-6 uppercase tracking-widest">{name}</h1>
      <p className="text-sm mt-2 font-medium tracking-widest uppercase" style={{ color: data?.theme?.bg || '#D4AF37' }}>{role}</p>

      {/* Contact Information */}
      <div className="text-gray-300 text-left w-full mt-8 space-y-3 px-8 text-sm font-light flex-grow">
        <div className="flex items-center"><span className="w-24 font-medium text-gray-400">Id card</span><span className="text-white">: 2026777</span></div>
        <motion.a whileHover={{ x: 4 }} href={`mailto:${email}`} className="flex items-center group cursor-pointer block hover:text-white transition-colors"><span className="w-24 font-medium text-gray-400 group-hover:text-gray-300">Email</span><span className="text-white truncate">: {email}</span></motion.a>
        <motion.a whileHover={{ x: 4 }} href={`tel:${phone}`} className="flex items-center group cursor-pointer block hover:text-white transition-colors"><span className="w-24 font-medium text-gray-400 group-hover:text-gray-300">Tél</span><span className="text-white">: {phone}</span></motion.a>
        <motion.a whileHover={{ x: 4 }} href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center group cursor-pointer block hover:text-white transition-colors"><span className="w-24 font-medium text-gray-400 group-hover:text-gray-300">Site</span><span className="text-white truncate">: {website}</span></motion.a>
        <motion.a whileHover={{ x: 4 }} href={`https://maps.google.com/?q=${encodeURIComponent(data?.location || '75008 Paris, France')}`} target="_blank" rel="noopener noreferrer" className="flex items-center group cursor-pointer block hover:text-white transition-colors"><span className="w-24 font-medium text-gray-400 group-hover:text-gray-300">Adresse</span><span className="text-white truncate">: {data?.location || '75008 Paris, France'}</span></motion.a>
        <motion.a whileHover={{ scale: 1.05 }} href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="mt-4 pt-2 border-t border-white/10 text-center block cursor-pointer" style={{ color: data?.theme?.bg || '#D4AF37' }}>{website}</motion.a>
      </div>

      {/* QR Code */}
      <div className="mb-6 bg-white/5 p-3 rounded-2xl backdrop-blur-md border border-white/10 flex-shrink-0">
        <div className="bg-white p-2 rounded-xl">
          <QRCodeSVG value={website || "https://example2.com"} size={90} />
        </div>
      </div>

      {/* Social Icons at the Bottom */}
      <div className="flex space-x-3 mb-8 rtl:space-x-reverse flex-shrink-0">
        {data?.socialLinks?.length > 0 ? (
          data.socialLinks.map((link: any, index: number) => {
            const platform = link.platform.toLowerCase();
            let color = "bg-white/10";
            if (platform === 'instagram') color = "bg-gradient-to-tr from-purple-500 to-orange-500";
            else if (platform === 'tiktok') color = "bg-black";
            else if (platform === 'facebook') color = "bg-blue-600";
            else if (platform === 'whatsapp') color = "bg-green-500";
            else if (platform === 'youtube') color = "bg-red-600";
            else if (platform === 'linkedin') color = "bg-blue-700";
            else if (platform === 'twitter') color = "bg-black";
            return <SocialIcon key={index} icon={platform === 'facebook' ? 'facebook-f' : platform} color={color} href={link.url} />;
          })
        ) : (
          <>
            <SocialIcon icon="instagram" color="bg-gradient-to-tr from-purple-500 to-orange-500" />
            <SocialIcon icon="tiktok" color="bg-black" />
            <SocialIcon icon="facebook-f" color="bg-blue-600" />
            <SocialIcon icon="whatsapp" color="bg-green-500" />
            <SocialIcon icon="youtube" color="bg-red-600" />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BusinessCardV2;
