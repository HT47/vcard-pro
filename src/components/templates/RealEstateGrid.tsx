import { motion } from "framer-motion";
import { useI18n } from "@/context/I18nContext";

const defaultGrid = [
  { name: "Bedroom", img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=400&q=80" },
  { name: "Bathroom", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80" },
  { name: "Kitchen", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
  { name: "Livingroom", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
];

const defaultFeatures = ["Easy Access", "Private Pool", "Fitness Center", "Finger Print Lock", "Best Security"];

const RealEstateGrid = ({ data }: { data?: any }) => {
  const { t } = useI18n();
  const realEstate = data?.realEstate || {};
  const rooms = realEstate.rooms || defaultGrid;
  const features = realEstate.features || defaultFeatures;

  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] bg-[#E8EBF5] overflow-hidden flex flex-col font-sans shadow-xl">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A3B2E0] via-[#E8EBF5] to-[#E8EBF5] pointer-events-none"></div>

      {/* Top Image with Wavy Bottom Overlay */}
      <div className="relative w-full h-[40%]">
        <img 
          src={data?.coverUrl || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"} 
          alt="House Exterior" 
          className="w-full h-full object-cover"
        />
        {/* Wavy SVG overlay */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,116.8,192.5,102.14C236.4,91.82,280.14,75.05,321.39,56.44Z" fill="#E8EBF5"></path>
          </svg>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute top-6 w-full text-center drop-shadow-md">
          <h1 className="font-serif italic text-white text-4xl tracking-wide">{data?.name || "House For Sale"}</h1>
        </div>
      </div>

      {/* Price & Features Card (Overlapping image) */}
      <div className="relative z-10 w-[85%] mx-auto -mt-16 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 mb-4 flex flex-col">
        <div className="text-center border-b border-gray-300 pb-2 mb-2">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Offered at</p>
          <p className="text-[#36528A] text-2xl font-black bg-[#E8EBF5] inline-block px-4 py-1 rounded-full">{realEstate.price || "$2.000.000"}</p>
        </div>
        <div>
          <p className="text-[#36528A] text-sm font-bold mb-2">MORE FEATURES</p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-600 font-medium">
            {features.map((feat: string, idx: number) => (
              <span key={idx} className="flex items-center"><i className="fa-solid fa-check text-[#36528A] mr-1 text-[10px]"></i> {feat}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Rooms Grid */}
      <div className="grid grid-cols-2 gap-3 px-6 mb-4">
        {rooms.slice(0, 4).map((room: any, idx: number) => (
          <div key={idx} className="relative w-full h-20 rounded-lg overflow-hidden shadow-md">
            <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#1E2554]/80 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {room.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Links & Addresses */}
      {data?.socialLinks && data.socialLinks.length > 0 && (
        <div className="relative z-10 px-6 pb-2 flex flex-wrap gap-2 text-[10px]">
          {data.socialLinks.map((link: any) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-white/80 text-[#1E2554] px-3 py-1 rounded-full flex items-center shadow-sm backdrop-blur-sm hover:bg-white transition-colors cursor-pointer">
              <span className="font-bold mr-1">{link.platform} :</span>
              <span className="truncate max-w-[120px]">{link.url}</span>
            </a>
          ))}
        </div>
      )}

      {/* Advanced UI Wavy Footer */}
      <div className="relative mt-auto w-full z-10 pt-10">
        {/* Custom SVG Wave mimicking the UI mockup */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[140%]">
            <path fill="#1E2554" fillOpacity="1" d="M0,160L48,165.3C96,171,192,181,288,160C384,139,480,85,576,96C672,107,768,181,864,208C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Content over the wave */}
        <div className="relative flex items-center justify-between px-5 pb-6 pt-12">
          {/* Logo / Company */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-inner border border-white/10">
              <i className="fa-solid fa-house text-white text-[10px]"></i>
            </div>
            <div className="text-white font-black leading-[1.1] tracking-wider uppercase">
              <div className="text-[13px]">{data?.company ? data.company.split(' ')[0] : "HOME NET"}</div>
              <div className="text-[11px] text-[#FACC15]">{data?.company ? data.company.split(' ').slice(1).join(' ') : "AGENCY"}</div>
            </div>
          </div>

          {/* Call Now Pill */}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href={`tel:${data?.phone || "+33 6 12 34 56 78"}`} 
            className="flex items-center gap-3 bg-[#111636] px-5 py-2.5 rounded-full shadow-2xl border border-white/5 cursor-pointer group"
          >
            <div className="flex flex-col text-white leading-[1.1] text-right">
              <span className="font-bold text-[10px] uppercase group-hover:text-[#FACC15] transition-colors">{t('call_now').split(' ')[0] || 'Call'}</span>
              <span className="font-bold text-[10px] uppercase group-hover:text-[#FACC15] transition-colors">{t('call_now').split(' ')[1] || 'Now'}</span>
            </div>
            <div className="h-6 w-[1px] bg-white/20"></div>
            <div className="text-white text-[11px] font-medium leading-tight tracking-wider max-w-[80px]">
              {data?.phone || "+33 6 12 34 56 78"}
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default RealEstateGrid;
