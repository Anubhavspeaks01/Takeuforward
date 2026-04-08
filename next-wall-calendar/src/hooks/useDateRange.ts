"use client";

import { useState } from 'react';
import { isBefore, isSameDay } from 'date-fns';

export function useDateRange() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const selectDate = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else if (isSameDay(date, startDate)) {
        setStartDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  return { startDate, endDate, selectDate };
}
