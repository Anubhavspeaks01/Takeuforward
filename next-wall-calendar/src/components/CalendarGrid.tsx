"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, 
  isWithinInterval, isToday, isWeekend
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDateRange } from '../hooks/useDateRange';
import { cn } from '../utils/cn';

export default function CalendarGrid({ currentMonth, setCurrentMonth }: { currentMonth: Date, setCurrentMonth: (d: Date) => void }) {
  const [direction, setDirection] = useState(0);
  const { startDate, endDate, selectDate } = useDateRange();

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const jumpToToday = () => {
    setDirection(0);
    setCurrentMonth(new Date());
  };

  const slideVariants: Variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      rotateY: direction > 0 ? -15 : 15,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
      scale: 0.95,
      transition: { duration: 0.3 }
    })
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const gridStart = startOfWeek(monthStart);
    const gridEnd = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = gridStart;

    while (day <= gridEnd) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const currentIsToday = isToday(cloneDay);
        const inCurrentMonth = isSameMonth(cloneDay, monthStart);
        const isWknd = isWeekend(cloneDay);
        
        const isStart = startDate && isSameDay(cloneDay, startDate);
        const isEnd = endDate && isSameDay(cloneDay, endDate);
        const inRange = startDate && endDate && isWithinInterval(cloneDay, { start: startDate, end: endDate });

        days.push(
          <div 
            key={cloneDay.toString()} 
            className={cn(
              "relative flex justify-center py-[2px]",
              inRange && !isStart && !isEnd && "bg-blue-100/50 backdrop-blur-[2px]",
              isStart && endDate && "bg-gradient-to-r from-transparent to-blue-100/50",
              isEnd && startDate && "bg-gradient-to-l from-transparent to-blue-100/50",
            )}
          >
            <button
              onClick={() => selectDate(cloneDay)}
              className={cn(
                "relative z-10 w-10 h-10 flex items-center justify-center rounded-full font-sans text-sm font-medium transition-all group",
                !inCurrentMonth ? "text-gray-300 pointer-events-none" : "text-gray-700 hover:bg-gray-100",
                currentIsToday && !isStart && !isEnd && "text-blue-600 bg-blue-50 font-bold before:absolute before:inset-0 before:rounded-full before:animate-ping before:bg-blue-400 before:opacity-30",
                (isStart || isEnd) && "bg-blue-600 text-white shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)] transform scale-105 font-bold",
                isWknd && inCurrentMonth && !isStart && !isEnd && "text-red-400"
              )}
            >
              {format(cloneDay, 'd')}
            </button>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-y-1 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="flex flex-col w-full h-full select-none bg-white rounded-b-xl px-6 py-8">
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 tracking-tight">
            {format(currentMonth, 'MMMM')}
          </h2>
          <p className="text-sm font-sans font-medium text-gray-400 tracking-widest uppercase mt-1">
            {format(currentMonth, 'yyyy')}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={jumpToToday}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors mr-2 cursor-pointer"
          >
            Today
          </button>
          <div className="flex gap-1">
            <button onClick={handlePrevMonth} className="cursor-pointer px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNextMonth} className="cursor-pointer px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center text-xs font-bold font-sans text-gray-400 tracking-wider uppercase">
            {d}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden flex-1" style={{ perspective: '1000px' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentMonth.toString()}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="center"
            exit="exit"
            className="absolute inset-0 origin-center"
          >
            {renderCells()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
