import { format } from 'date-fns';

interface HeroImageProps {
  currentMonth: Date;
}

const HeroImage: React.FC<HeroImageProps> = ({ currentMonth }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-blue-900 border-x border-t border-gray-300 rounded-t-xl group">
      <img 
        src="/hero.png" 
        alt="Calendar Hero" 
        className="object-cover w-full h-full brightness-[0.85] group-hover:brightness-100 transition-all duration-700 ease-in-out"
      />
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

      {/* SVG Wave Divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12 md:h-16 lg:h-20 fill-white drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C79.4,121.21,159.2,126.63,228.1,114.5,263,108.5,292.17,94.9,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="absolute bottom-10 right-8 text-white text-right text-shadow-sm pointer-events-none z-10 w-full">
        <p className="text-xl font-light tracking-widest opacity-90 uppercase mb-1">
          {format(currentMonth, 'yyyy')}
        </p>
        <h2 className="text-4xl md:text-5xl font-sans tracking-wide font-bold uppercase drop-shadow-md">
          {format(currentMonth, 'MMMM')}
        </h2>
      </div>
    </div>
  );
};

export default HeroImage;
