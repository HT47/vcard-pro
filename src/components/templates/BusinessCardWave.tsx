
import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";

const BusinessCardWave = ({ data }: { data?: any }) => {
  const { t } = useI18n();
  const name = data?.name || "ALFREDO TORRES";
  const role = data?.role || "Photographer";
  const email = data?.email || "hello@reallygreatsite.com";
  const phone = data?.phone || "+123-456-7890";
  const website = data?.website || "www.reallygreatsite.com";
  const company = data?.company || "SALFORD & CO.";
  const avatarUrl = data?.avatarUrl || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80";

  const renderSocialIcon = (link: any, index: number) => {
    const platform = link.platform.toLowerCase();
    let icon = platform;
    if (platform === 'facebook') icon = 'facebook-f';
    if (platform === 'website') icon = 'globe';
    return (
      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded flex items-center justify-center text-white hover:scale-110 transition-transform" style={{ backgroundColor: data?.theme?.bg || '#1a2b6d' }}>
        <i className={`fab fa-${icon} text-sm`}></i>
      </a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-sm mx-auto h-[750px] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col rtl:dir-rtl text-[#1a2b6d]"
    >
      {/* Top Wave Shapes */}
      <div className="absolute top-0 left-0 w-full h-[250px] pointer-events-none">
        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,0 L400,0 L400,50 C300,100 200,10 100,50 C50,70 0,150 0,250 Z" fill="#e0e5ec" />
          <path d="M0,0 L350,0 C250,80 150,0 50,80 C20,100 0,150 0,200 Z" fill={data?.theme?.bg || "#1a2b6d"} />
        </svg>
      </div>

      {/* Profile Picture */}
      <div className="relative z-10 mt-16 mx-auto">
        <div className="w-56 h-56 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name and Role */}
      <div className="text-right px-8 mt-6">
        <p className="text-lg tracking-wide uppercase font-medium">{role}</p>
        <h1 className="text-[2.75rem] font-serif mt-1 leading-[1.1] uppercase tracking-wide" style={{ color: data?.theme?.bg || '#1a2b6d' }}>
          {name.split(' ').map((part: string, i: number) => (
            <span key={i} className="block">{part}</span>
          ))}
        </h1>
      </div>

      {/* Contact Info Group */}
      <div className="w-full mt-auto mb-16 flex flex-col gap-5 px-10 text-[#1a2b6d]">
        <motion.a
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          href={`tel:${phone}`}
          className="flex items-center gap-3 justify-end w-full cursor-pointer group"
        >
          <span className="text-[1.05rem] tracking-wider group-hover:opacity-80 transition-opacity">{phone}</span>
          <div className="w-8 h-8 rounded flex items-center justify-center text-white shadow-sm group-hover:opacity-90" style={{ backgroundColor: data?.theme?.bg || '#1a2b6d' }}>
            <i className="fas fa-phone-alt text-sm"></i>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${email}`}
          className="flex items-center gap-3 justify-end w-full cursor-pointer group"
        >
          <span className="text-[1.05rem] tracking-wider truncate group-hover:opacity-80 transition-opacity">{email}</span>
          <div className="w-8 h-8 rounded flex items-center justify-center text-white shadow-sm group-hover:opacity-90" style={{ backgroundColor: data?.theme?.bg || '#1a2b6d' }}>
            <i className="fas fa-envelope text-sm"></i>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          href={website?.startsWith('http') ? website : `https://${website}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 justify-end w-full cursor-pointer group"
        >
          <span className="text-[1.05rem] tracking-wider truncate group-hover:opacity-80 transition-opacity">{website.replace(/^https?:\/\//, '')}</span>
          <div className="w-8 h-8 rounded flex items-center justify-center text-white shadow-sm group-hover:opacity-90" style={{ backgroundColor: data?.theme?.bg || '#1a2b6d' }}>
            <i className="fas fa-globe text-sm"></i>
          </div>
        </motion.a>

        {/* Social Links */}
        {data?.socialLinks && data.socialLinks.length > 0 && (
          <div className="flex items-center gap-2 justify-end w-full mt-2">
            {data.socialLinks.map((link: any, idx: number) => renderSocialIcon(link, idx))}
          </div>
        )}
      </div>

      {/* Bottom Footer / Company */}
      <div className="mt-auto p-8 flex justify-between items-end">
        <h2 className="text-2xl font-bold tracking-widest uppercase flex items-center gap-2" style={{ color: data?.theme?.bg || '#1a2b6d' }}>
          {company}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: data?.theme?.bg || '#1a2b6d' }}>
            <i className="fas fa-building text-xs"></i>
          </div>
        </h2>
        <div className="flex flex-col items-end gap-1">
          <div className="h-[3px] w-24" style={{ backgroundColor: data?.theme?.bg || '#1a2b6d' }}></div>
          <div className="h-[3px] w-16 opacity-70" style={{ backgroundColor: data?.theme?.bg || '#1a2b6d' }}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCardWave;
