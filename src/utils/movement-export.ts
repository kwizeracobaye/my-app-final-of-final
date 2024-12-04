import { saveAs } from 'file-saver';
import { MovementData } from '../types/movement';

export function exportMovementsToCSV(movements: MovementData[]): void {
  const headers = [
    'Day',
    'Class Name',
    'Class Size',
    'Bus Type',
    'Bus Capacity',
    'Lecturer in Charge',
    'Contact Number'
  ];

  const rows = movements.map(movement => [
    movement.day,
    movement.className,
    movement.classSize,
    movement.busType,
    movement.capacity,
    movement.inCharge,
    movement.inChargePhone
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `movement-schedule-${new Date().toISOString().split('T')[0]}.csv`);
}