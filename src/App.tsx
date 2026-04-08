import { useState } from 'react';
import HeroImage from './components/HeroImage';
import CalendarGrid from './components/CalendarGrid';
import NotesPanel from './components/NotesPanel';
import SpiralBinding from './components/SpiralBinding';

function App() {
  const [startSelectedDate, setStartSelectedDate] = useState<Date | null>(null);
  const [endSelectedDate, setEndSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDateSelect = (date: Date) => {
    if (!startSelectedDate) {
      setStartSelectedDate(date);
      setEndSelectedDate(null);
    } else if (startSelectedDate && !endSelectedDate) {
      if (date < startSelectedDate) {
        setEndSelectedDate(startSelectedDate);
        setStartSelectedDate(date);
      } else {
        setEndSelectedDate(date);
      }
    } else {
      setStartSelectedDate(date);
      setEndSelectedDate(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-8 sm:p-12">
      {/* Wall Calendar Container */}
      <div className="relative max-w-lg w-full bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] mt-6">
        <SpiralBinding />
        
        {/* Top Side: Hero Image & Quotes/At-a-glance */}
        <div className="w-full h-[400px] relative rounded-t-xl overflow-hidden bg-gray-100 z-10">
          <HeroImage currentMonth={currentMonth} />
        </div>

        {/* Bottom Side: Calendar & Notes */}
        <div className="w-full p-8 pt-4 flex flex-col justify-between bg-white relative z-20 rounded-b-xl border border-gray-100">
          <div>
            <CalendarGrid 
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              startSelectedDate={startSelectedDate}
              endSelectedDate={endSelectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>
          
          <div className="mt-8 border-t border-gray-100 pt-6">
            <NotesPanel currentMonth={currentMonth} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
