import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PenLine } from 'lucide-react';

interface NotesPanelProps {
  currentMonth: Date;
}

const NotesPanel: React.FC<NotesPanelProps> = ({ currentMonth }) => {
  const [notes, setNotes] = useState<string>('');
  
  // Create a unique key for the month to store notes
  const storageKey = `calendar-notes-${format(currentMonth, 'yyyy-MM')}`;

  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [storageKey]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(storageKey, newNotes);
  };

  return (
    <div className="flex flex-col h-full bg-orange-50/50 rounded-2xl p-6 border border-orange-100 shadow-sm relative overflow-hidden group">
      
      {/* Decorative notebook binding effect */}
      <div className="absolute top-0 left-4 w-12 h-2 flex justify-between space-x-2 opacity-30 pointer-events-none">
        <div className="w-2 h-4 bg-gray-400 rounded-full shadow-sm"></div>
        <div className="w-2 h-4 bg-gray-400 rounded-full shadow-sm"></div>
        <div className="w-2 h-4 bg-gray-400 rounded-full shadow-sm"></div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-orange-800">
        <PenLine size={18} />
        <h3 className="font-semibold text-sm uppercase tracking-wider">
          Notes for {format(currentMonth, 'MMMM')}
        </h3>
      </div>
      
      <textarea 
        className="w-full flex-grow bg-transparent border-none resize-none focus:ring-0 text-gray-700 leading-relaxed placeholder-orange-300/70"
        placeholder="Jot down important reminders, goals, or upcoming events..."
        value={notes}
        onChange={handleNotesChange}
        style={{
           // Notebook line visual effect
           backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(251, 146, 60, 0.1) 32px)',
           backgroundAttachment: 'local',
           lineHeight: '32px',
        }}
      />
    </div>
  );
};

export default NotesPanel;
