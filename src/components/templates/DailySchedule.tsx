import { motion } from "framer-motion";

const DailySchedule = ({ data }: { data?: any }) => {
  const scheduleData = data?.scheduleData || [];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[750px] bg-neutral-900 rounded-[40px] overflow-hidden flex flex-col font-sans shadow-2xl border border-white/5 rtl:dir-rtl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1000&q=80" 
          alt="Bureau background" 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-white/95" />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 mt-6"
        >
          <p className="text-white/80 text-sm uppercase tracking-[0.2em] mb-2 text-center font-semibold drop-shadow-md">
            Semaine du 09/06/25
          </p>
          <h2 className="text-white text-5xl font-light text-center tracking-tight drop-shadow-xl">
            Programme
          </h2>
        </motion.div>

        {/* Task List */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-grow space-y-5 overflow-y-auto pb-8 scrollbar-hide pr-2"
        >
          {scheduleData.map((item) => (
            <motion.div variants={itemAnim} key={item.id} className="flex items-center group">
              {/* Time Bubble */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8A87C] to-[#C38D67] border-[3px] border-white flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 -mr-6 relative transition-transform duration-300 group-hover:scale-110">
                {item.time}
              </div>
              {/* Task Bubble */}
              <div className="flex-grow bg-white/80 backdrop-blur-md rounded-r-3xl rounded-l-none py-4 pl-10 pr-6 shadow-md border border-white/50 flex items-center min-h-[4rem] transition-colors duration-300 group-hover:bg-white/95">
                <span className="text-neutral-800 font-medium leading-snug">{item.task}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DailySchedule;
