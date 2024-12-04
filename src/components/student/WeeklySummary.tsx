import React from 'react';
import { MovementData } from '../../types/movement';
import { BusInfo } from '../../types/bus';
import { DaySummary } from './DaySummary';
import { DAYS_OF_WEEK } from '../../utils/constants';

interface Props {
  movements: MovementData[];
  buses: BusInfo[];
}

export function WeeklySummary({ movements, buses }: Props) {
  const groupedMovements = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = movements.filter(m => m.day === day);
    return acc;
  }, {} as Record<string, MovementData[]>);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Weekly Overview</h2>
      {DAYS_OF_WEEK.map(day => (
        <DaySummary
          key={day}
          day={day}
          movements={groupedMovements[day] || []}
          buses={buses}
        />
      ))}
    </div>
  );
}