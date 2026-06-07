import { motion } from "framer-motion";

const RealEstateModern = ({ data }: { data?: any }) => {
  const realEstate = data?.realEstate || {};

  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] bg-[#1E2554] overflow-hidden flex flex-col shadow-xl">
      
      {/* Background Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#FACC15]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
      <div className="absolute bottom-32 left-0 w-full h-48 bg-[#FACC15]" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>
      
      {/* Decorative Dots */}
      <div className="absolute top-8 left-8 text-white/40 text-xs tracking-[4px] leading-[8px]">
        .<br/>.<br/>.<br/>.
      </div>
      <div className="absolute bottom-48 right-8 text-white/40 text-xs tracking-[4px] leading-[8px]">
        .<br/>.<br/>.<br/>.
      </div>

      {/* Main Image Container */}
      <div className="relative z-10 w-[85%] mx-auto mt-20 h-64 shadow-2xl">
        <img 
          src={data?.coverUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"} 
          alt="Modern House Exterior" 
          className="w-full h-full object-cover border-4 border-[#FACC15]/20"
        />
        
        {/* Discount Badge */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#1E2554] rounded-full border-4 border-[#FACC15] flex flex-col justify-center items-center shadow-lg">
          <span className="text-white font-bold text-sm">DISC</span>
          <span className="text-[#FACC15] font-black text-2xl leading-none">{realEstate.discount || "30%"}</span>
        </div>
      </div>

      {/* Text Section */}
      <div className="relative z-10 flex flex-col items-center mt-12 px-6">
        <h3 className="text-[#FACC15] font-bold tracking-[0.2em] text-xs mb-1 truncate max-w-full uppercase">{data?.role || "MODERN HOME"}</h3>
        <h1 className="text-white font-black text-4xl uppercase tracking-wider mb-6 text-center">{data?.name || "Real Estate"}</h1>
      </div>

      {/* Links & Addresses */}
      {data?.socialLinks && data.socialLinks.length > 0 && (
        <div className="relative z-20 flex flex-wrap justify-center gap-2 mt-4 px-6 text-[10px]">
          {data.socialLinks.map((link: any) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white backdrop-blur-md px-3 py-1 rounded-full flex items-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <span className="font-bold text-[#FACC15] mr-1">{link.platform} :</span>
              <span className="truncate max-w-[120px]">{link.url}</span>
            </a>
          ))}
        </div>
      )}

      {/* Yellow Banner */}
      <div className="relative z-20 w-full bg-[#FACC15] py-3 text-center mt-2 shadow-md">
        <p className="text-[#1E2554] font-bold text-xs uppercase tracking-wide truncate px-4">
          {data?.bio || "The Perfect Home To Start Your Family"}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto mb-8 text-center relative z-20">
        <p className="text-white text-xs font-light tracking-wide">
          Visit Website : {data?.website || "www.reallygreatsite.com"}
        </p>
      </div>
    </div>
  );
};

export default RealEstateModern;
