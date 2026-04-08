import React from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isWithinInterval, 
  isWeekend
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface CalendarGridProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  startSelectedDate: Date | null;
  endSelectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentMonth, 
  setCurrentMonth, 
  startSelectedDate, 
  endSelectedDate, 
  onDateSelect 
}) => {
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold font-serif text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900 border border-transparent hover:border-gray-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900 border border-transparent hover:border-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'E';
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
        days.push(
          <div key={i} className="text-center font-semibold text-sm text-gray-400 py-3 uppercase tracking-wider">
            {format(addDays(startDate, i), dateFormat)}
          </div>
        );
    }
    return <div className="grid grid-cols-7 mb-2 border-b border-gray-100 pb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        const isSelectedStart = startSelectedDate && isSameDay(day, startSelectedDate);
        const isSelectedEnd = endSelectedDate && isSameDay(day, endSelectedDate);
        const isWithinRange = startSelectedDate && endSelectedDate && isWithinInterval(day, { start: startSelectedDate, end: endSelectedDate });
        const isStartOrEnd = isSelectedStart || isSelectedEnd;

        // Visual logic
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isWknd = isWeekend(day);

        days.push(
          <div 
            key={day.toString()} 
            className={cn(
               "relative flex justify-center items-center py-2",
               // Highlight connection between start/end dates
               isWithinRange && !isStartOrEnd && "bg-blue-50",
               isSelectedStart && endSelectedDate && "bg-gradient-to-r from-transparent to-blue-50",
               isSelectedEnd && startSelectedDate && "bg-gradient-to-l from-transparent to-blue-50",
            )}
          >
            <button
              type="button"
              onClick={() => onDateSelect(cloneDay)}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 z-10 hover:bg-blue-100",
                !isCurrentMonth ? "text-gray-300 pointer-events-none" : "text-gray-700",
                isToday && !isStartOrEnd && "bg-gray-100 text-gray-900 ring-1 ring-gray-300",
                isStartOrEnd && "bg-blue-600 text-white shadow-md shadow-blue-500/30 font-bold transform scale-105 hover:bg-blue-700",
                isWknd && isCurrentMonth && !isStartOrEnd && "text-red-400"
              )}
            >
              {formattedDate}
            </button>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-y-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="w-full">
      {renderHeader()}
      {renderDays()}
      {/* Page flip animation wrap */}
      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth.toString()}
            initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderCells()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CalendarGrid;
