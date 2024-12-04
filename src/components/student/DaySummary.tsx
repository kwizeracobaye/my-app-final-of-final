import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { MovementData } from '../../types/movement';
import { BusInfo } from '../../types/bus';
import { DayCapacityStats } from './DayCapacityStats';
import { calculateDayCapacity } from '../../utils/capacity';

interface Props {
  day: string;
  movements: MovementData[];
  buses: BusInfo[];
}

export function DaySummary({ day, movements, buses }: Props) {
  const { isOverbooked, remainingCapacity } = calculateDayCapacity(movements, buses);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">{day} Summary</h3>
      <DayCapacityStats movements={movements} buses={buses} />
      
      {isOverbooked && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <div>
            <p className="text-red-700 font-medium">Day is overbooked!</p>
            <p className="text-sm text-red-600">
              Exceeds capacity by {Math.abs(remainingCapacity)} students
            </p>
          </div>
        </div>
      )}
    </div>
  );
}