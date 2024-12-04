import React from 'react';
import { Edit2, Trash2, Phone } from 'lucide-react';
import { MovementData } from '../../types/movement';

interface Props {
  info: MovementData[];
  onEdit: (data: MovementData) => void;
  onDelete: (id: string) => void;
}

export function InfoDisplay({ info, onEdit, onDelete }: Props) {
  const groupedByDay = info.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, MovementData[]>);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      {days.map((day) => {
        const dayMovements = groupedByDay[day] || [];
        if (dayMovements.length === 0) return null;

        return (
          <div key={day} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white px-4 py-2">
              <h3 className="text-lg font-medium">{day}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {dayMovements.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.className}</h4>
                      <p className="text-sm text-gray-500">
                        {item.busType} • Capacity: {item.capacity}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Class Size:</span>
                      <span className="ml-1 font-medium">{item.classSize}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Teacher:</span>
                      <span className="ml-1 font-medium">{item.inCharge}</span>
                    </div>
                    <div className="col-span-2">
                      <a
                        href={`tel:${item.inChargePhone}`}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {item.inChargePhone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {Object.keys(groupedByDay).length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
          No movements planned yet
        </div>
      )}
    </div>
  );
}