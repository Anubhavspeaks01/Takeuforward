

const SpiralBinding = () => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-evenly w-full px-6 -mt-3 z-50 pointer-events-none">
      {[...Array(24)].map((_, i) => (
        <div key={i} className="relative flex flex-col items-center">
          {/* Loop wire */}
          <div className="w-2 h-6 md:h-8 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-full shadow-md z-10 border border-gray-300/50"></div>
          {/* Hole punch */}
          <div className="w-3 h-3 md:w-4 md:h-4 bg-[#f3f4f6] rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] -mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default SpiralBinding;
