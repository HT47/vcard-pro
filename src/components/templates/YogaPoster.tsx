import { motion } from "framer-motion";

const YogaPoster = ({ data }: { data?: any }) => {
  const yoga = data?.yoga || {};
  const schedule = yoga.schedule || [];
  
  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] bg-white overflow-hidden flex flex-col shadow-lg border border-gray-200">
      <div className="absolute inset-0 z-0">
        <img src={data?.coverUrl || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"} alt="Yoga" className="w-full h-full object-cover opacity-90" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div className="text-center pt-8">
          <p className="text-[#2A242B] text-xl font-medium tracking-wide mb-[-10px]">{yoga.subtitle || "Nouveau cours"}</p>
          <h1 className="text-[#2A242B] text-[80px] leading-none font-bold uppercase">{yoga.title || "YOGA"}</h1>
        </div>
        <div className="mb-4 w-full max-w-[280px] mx-auto">
          <h2 className="text-white drop-shadow-md text-3xl font-bold mb-3">{yoga.day || "LUNDI"}</h2>
          <div className="space-y-2">
            {schedule.slice(0, 3).map((item: any, idx: number) => (
              <div key={idx} className="flex w-full shadow-sm">
                <div className="bg-[#2A242B] text-white py-2 px-4 flex-[0.4] text-center font-medium">{item.time}</div>
                <div className="bg-[#F8F5F2] text-[#2A242B] py-2 px-4 flex-[0.6] text-center font-serif text-lg">{item.level || item.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Links & Addresses */}
        {data?.socialLinks && data.socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4 text-[10px] max-w-[280px] mx-auto">
            {data.socialLinks.map((link: any) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-white/90 text-[#2A242B] px-3 py-1 rounded-full flex items-center shadow-md hover:scale-105 transition-transform cursor-pointer">
                <span className="font-bold mr-1">{link.platform} :</span>
                <span className="truncate max-w-[100px]">{link.url}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YogaPoster;
