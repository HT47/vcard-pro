import { motion } from "framer-motion";

const WeeklyEvents = ({ data }: { data?: any }) => {
  const eventData = data?.eventData || [];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-sm mx-auto h-[750px] bg-[#F8F9FA] rounded-[40px] overflow-hidden flex flex-col font-sans shadow-2xl border border-gray-200 rtl:dir-rtl"
    >
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-4 shadow-sm z-10 relative">
        <h2 className="text-black text-4xl font-black uppercase tracking-tight">Programme</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">Bar-Restaurant Nomade</span>
          <span className="text-blue-600 font-bold italic text-xl" style={{ fontFamily: "Georgia, serif" }}>
            de la semaine
          </span>
        </div>
      </div>

      {/* Event List */}
      <div className="flex-grow overflow-y-auto bg-[#F8F9FA] px-4 py-6 space-y-5 scrollbar-hide">
        {eventData.map((event, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={event.id} 
            className="bg-white rounded-2xl flex overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
          >
            {/* Date Badge */}
            <div className="bg-blue-600 text-white p-4 flex flex-col items-center justify-center min-w-[5rem] transition-colors duration-300 group-hover:bg-blue-700">
              <span className="text-sm font-bold uppercase tracking-wider opacity-90">{event.day}</span>
              <span className="text-4xl font-black leading-none mt-1">{event.date}</span>
            </div>
            
            {/* Event Image */}
            <div className="w-28 relative overflow-hidden flex-shrink-0">
              <img 
                src={event.img} 
                alt={event.title} 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            
            {/* Details */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-blue-600 font-bold italic text-lg leading-tight mb-1" style={{ fontFamily: "Georgia, serif" }}>
                  {event.title}
                </h3>
                <p className="text-neutral-500 text-[0.65rem] font-bold uppercase tracking-wider">{event.location}</p>
                <p className="text-neutral-800 text-[0.75rem] font-bold uppercase mt-0.5">{event.time}</p>
                <div className="w-8 h-[2px] bg-blue-600/30 my-2 transition-all duration-300 group-hover:w-full" />
              </div>
              <p className="text-gray-500 text-xs leading-snug line-clamp-2 mt-1">
                {event.desc}
              </p>
            </div>
          </motion.div>
        ))}
        <div className="h-4" /> {/* Bottom spacer */}
      </div>
    </motion.div>
  );
};

export default WeeklyEvents;
