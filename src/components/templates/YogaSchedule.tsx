import { motion } from "framer-motion";

const YogaSchedule = ({ data }: { data?: any }) => {
  const yoga = data?.yoga || {};
  const schedule = yoga.schedule || [];

  return (
    <div className="relative w-full max-w-sm mx-auto h-[740px] overflow-hidden flex flex-col bg-[#783669] shadow-xl">
      {/* Background Decor (Waves/Shapes) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-64 bg-[#B57BA6] rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-[#561B48] rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#934E84] rounded-full blur-2xl"></div>
      </div>

      {/* Top Logo / Lotus */}
      <div className="absolute top-6 right-6 z-20 text-white/80">
        <i className="fa-solid fa-spa text-3xl"></i>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-[40%] z-10 mt-8 flex justify-center items-end">
        <div className="absolute w-48 h-48 bg-white/20 rounded-full blur-xl bottom-0"></div>
        <img 
          src={data?.avatarUrl || "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=600&q=80"} 
          alt="Yoga Pose" 
          className="relative z-10 w-56 h-56 object-cover rounded-full border-4 border-white/20 shadow-2xl"
        />
      </div>

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center mt-2 px-6 flex-grow">
        <h2 className="font-serif text-3xl text-[#E8D5E4] drop-shadow-md italic">{yoga.subtitle || "Yoga Class"}</h2>
        <h1 className="text-white text-3xl font-bold uppercase tracking-wide drop-shadow-lg mb-4">{yoga.title || "Sunday Schedule"}</h1>

        <div className="w-full space-y-2.5 overflow-y-auto max-h-[160px] scrollbar-hide mb-2">
          {schedule.map((item: any, index: number) => (
            <div key={index} className="w-full bg-white/80 backdrop-blur-sm rounded-full flex items-center px-4 py-1.5 shadow-sm">
              <span className="text-[#561B48] font-bold text-xs w-[80px]">{item.time}</span>
              <i className="fa-solid fa-seedling text-[#783669] mx-3 text-xs"></i>
              <span className="text-[#333] font-medium text-sm flex-grow truncate">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Links & Addresses */}
        {data?.socialLinks && data.socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 text-[9px] mb-2">
            {data.socialLinks.map((link: any) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-[#561B48]/50 text-white backdrop-blur-md px-2 py-1 rounded-full flex items-center shadow-inner hover:bg-[#561B48]/70 transition-colors cursor-pointer">
                <span className="font-bold mr-1 text-[#E8D5E4]">{link.platform}:</span>
                <span className="truncate max-w-[80px]">{link.url}</span>
              </a>
            ))}
          </div>
        )}

        {/* Button & Footer */}
        <div className="mt-auto mb-4 flex flex-col items-center w-full">
          <a href={data?.website || "#"} target="_blank" rel="noopener noreferrer" className="bg-white text-[#783669] font-bold text-xl px-10 py-3 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105 active:scale-95 cursor-pointer">
            {yoga.buttonText || "BOOK NOW"}
          </a>
          <p className="text-white/80 text-[10px] mt-4 tracking-wider truncate max-w-full">
            {data?.phone || "+123-456-7890"} &nbsp;|&nbsp; {data?.website || "www.reallygreatsite.com"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default YogaSchedule;
