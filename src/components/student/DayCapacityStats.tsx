import React from 'react';
import { calculateDayCapacity } from '../../utils/capacity';
import { MovementData } from '../../types/movement';
import { BusInfo } from '../../types/bus';

interface Props {
  movements: MovementData[];
  buses: BusInfo[];
}

export function DayCapacityStats({ movements, buses }: Props) {
  const {
    totalStudents,
    totalBusCapacity,
    remainingCapacity,
    isOverbooked
  } = calculateDayCapacity(movements, buses);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-600">Total Students:</p>
        <p className="text-lg font-medium">{totalStudents}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Bus Capacity:</p>
        <p className="text-lg font-medium">{totalBusCapacity}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Remaining Capacity:</p>
        <p className={`text-lg font-medium ${isOverbooked ? 'text-red-600' : 'text-green-600'}`}>
          {remainingCapacity}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Status:</p>
        <p className={`text-lg font-medium ${isOverbooked ? 'text-red-600' : 'text-green-600'}`}>
          {isOverbooked ? 'Overbooked' : 'Available'}
        </p>
      </div>
    </div>
  );
}