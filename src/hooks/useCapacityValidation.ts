import { useState } from 'react';
import { MovementData } from '../types/movement';
import { BusInfo } from '../types/bus';

export function useCapacityValidation(existingMovements: MovementData[], buses: BusInfo[]) {
  const [capacityError, setCapacityError] = useState<string>('');

  const validateCapacity = (day: string, classSize: number) => {
    const dayMovements = existingMovements.filter(m => m.day === day);
    const totalStudents = dayMovements.reduce((sum, m) => sum + m.classSize, 0) + classSize;
    const totalBusCapacity = buses.reduce((sum, b) => sum + b.capacity, 0);

    if (totalStudents > totalBusCapacity) {
      setCapacityError(`Warning: This will exceed the total bus capacity for ${day} by ${totalStudents - totalBusCapacity} students`);
      return false;
    }

    setCapacityError('');
    return true;
  };

  return {
    capacityError,
    validateCapacity,
    clearCapacityError: () => setCapacityError('')
  };
}