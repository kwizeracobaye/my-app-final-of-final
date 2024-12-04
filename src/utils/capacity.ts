import { MovementData } from '../types/movement';
import { BusInfo } from '../types/bus';

export function calculateDayCapacity(movements: MovementData[], buses: BusInfo[]) {
  const totalStudents = movements.reduce((sum, m) => sum + m.classSize, 0);
  const totalBusCapacity = buses.reduce((sum, b) => sum + b.capacity, 0);
  const remainingCapacity = totalBusCapacity - totalStudents;
  const isOverbooked = totalStudents > totalBusCapacity;

  return {
    totalStudents,
    totalBusCapacity,
    remainingCapacity,
    isOverbooked
  };
}