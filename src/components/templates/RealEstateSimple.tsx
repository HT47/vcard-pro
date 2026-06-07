import { motion } from "framer-motion";

const RealEstateSimple = ({ data }: { data?: any }) => {
  const realEstate = data?.realEstate || {};
  
  return (
    <div className="w-full max-w-sm mx-auto h-[740px] bg-white flex flex-col font-sans shadow-xl border border-gray-200">
      
      {/* Header text */}
      <div className="pt-10 pb-4 px-6 text-center">
        <h1 className="text-[#36528A] text-5xl font-black uppercase tracking-tighter scale-y-110">{realEstate.status || "À VENDRE"}</h1>
      </div>

      {/* Main Image */}
      <div className="w-full h-[40%] px-4">
        <img 
          src={data?.coverUrl || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"} 
          alt="Interior Living Room" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description Area */}
      <div className="flex flex-row px-6 mt-8 gap-4 flex-grow">
        {/* Left Col: Title */}
        <div className="w-1/2">
          <h2 className="text-[#36528A] text-2xl font-bold leading-tight">{data?.name || "Maison urbaine moderne"}</h2>
        </div>
        {/* Right Col: Desc */}
        <div className="w-1/2">
          <p className="text-gray-600 text-xs font-medium leading-relaxed">
            {data?.bio || "Des intérieurs modernes, des espaces de vie ouverts et une architecture intemporelle pour votre confort quotidien."}
          </p>
        </div>
      </div>

      {/* Links & Addresses */}
      {data?.socialLinks && data.socialLinks.length > 0 && (
        <div className="px-6 pb-2 flex flex-wrap gap-2 text-[10px]">
          {data.socialLinks.map((link: any) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-[#36528A] px-3 py-1 rounded-full flex items-center shadow-sm hover:bg-gray-200 transition-colors cursor-pointer">
              <span className="font-bold mr-1">{link.platform} :</span>
              <span className="truncate max-w-[120px]">{link.url}</span>
            </a>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="px-6 pb-8 flex items-center justify-between mt-auto">
        {/* Fake Logo */}
        <div className="flex items-center text-[#36528A]">
          <i className="fa-solid fa-building text-2xl mr-2"></i>
          <div className="leading-none flex flex-col">
            <span className="font-bold text-xs uppercase">{data?.company?.split(' ')[0] || "Clé"}</span>
            <span className="font-light text-[10px] uppercase">{data?.company?.split(' ')[1] || "Immo"}</span>
          </div>
        </div>
        {/* Link */}
        <div className="text-right max-w-[60%]">
          <p className="text-[#36528A] text-[9px] font-bold">
            Rendez-vous sur <span className="underline">{data?.website || "www.sitevraiment.com"}</span> pour plus d'informations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealEstateSimple;
