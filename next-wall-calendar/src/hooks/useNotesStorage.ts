"use client";

import { useState, useEffect } from 'react';

export function useNotesStorage(monthKey: string) {
  const [notes, setNotes] = useState<string>('');
  const storageKey = `calendar-notes-${monthKey}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem(storageKey);
      if (savedNotes) {
        setNotes(savedNotes);
      } else {
        setNotes('');
      }
    }
  }, [storageKey]);

  const updateNotes = (newNotes: string) => {
    setNotes(newNotes);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newNotes);
    }
  };

  return { notes, updateNotes };
}
