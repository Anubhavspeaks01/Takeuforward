"use client";

import React from 'react';
import { useNotesStorage } from '../hooks/useNotesStorage';

export default function NotesSidebar({ monthKey }: { monthKey: string }) {
  const { notes, updateNotes } = useNotesStorage(monthKey);

  return (
    <div className="relative flex flex-col h-64 md:h-full bg-[#fdf8e3] rounded-sm p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-l-orange-400 mx-4 md:mx-0 md:mr-8 md:-ml-4 mt-8 md:mt-24 z-10 w-auto md:w-72">
      {/* Tape or Sticky Note visual element */}
      <div className="absolute -top-3 right-8 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-[-2deg] opacity-70"></div>

      <h3 className="font-serif italic text-lg text-gray-700 mb-4 border-b border-orange-200/50 pb-2">
        Jottings & Memos
      </h3>
      
      <textarea
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
        placeholder="Type to auto-save..."
        className="w-full h-full bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-gray-800 font-sans text-sm leading-[32px] placeholder-gray-400"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(200, 200, 200, 0.4) 32px)',
          backgroundAttachment: 'local',
        }}
      />
    </div>
  );
}
