import React from 'react';
import { PlusCircle, Edit2, Trash2, X, Check, Bus } from 'lucide-react';
import { BusInfo } from '../../types/bus';
import { saveBus, getBuses, updateBus, deleteBus } from '../../utils/bus-storage';

interface Props {
  onBusSelect: (bus: BusInfo) => void;
}

export function BusManagement({ onBusSelect }: Props) {
  const [buses, setBuses] = React.useState<BusInfo[]>(() => getBuses());
  const [editingBus, setEditingBus] = React.useState<BusInfo | null>(null);
  const [newBusType, setNewBusType] = React.useState('');
  const [newBusCapacity, setNewBusCapacity] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBusType && newBusCapacity) {
      saveBus({
        type: newBusType,
        capacity: parseInt(newBusCapacity, 10)
      });
      setBuses(getBuses());
      setNewBusType('');
      setNewBusCapacity('');
    }
  };

  const handleUpdate = (bus: BusInfo) => {
    updateBus(bus);
    setBuses(getBuses());
    setEditingBus(null);
  };

  const handleDelete = (id: string) => {
    deleteBus(id);
    setBuses(getBuses());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Bus Management</h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Bus Type"
          value={newBusType}
          onChange={(e) => setNewBusType(e.target.value)}
          className="rounded-md border-gray-300"
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newBusCapacity}
          onChange={(e) => setNewBusCapacity(e.target.value)}
          min="1"
          className="rounded-md border-gray-300"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Bus
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="p-3 bg-gray-50 rounded-md relative group"
          >
            {editingBus?.id === bus.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editingBus.type}
                  onChange={(e) => setEditingBus({ ...editingBus, type: e.target.value })}
                  className="w-full text-sm rounded-md border-gray-300"
                />
                <input
                  type="number"
                  value={editingBus.capacity}
                  onChange={(e) => setEditingBus({ ...editingBus, capacity: parseInt(e.target.value, 10) })}
                  className="w-full text-sm rounded-md border-gray-300"
                  min="1"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleUpdate(editingBus)}
                    className="p-1 text-green-600 hover:text-green-800"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingBus(null)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-1">
                  <Bus className="w-4 h-4 mr-2 text-indigo-600" />
                  <span className="font-medium">{bus.type}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Capacity: {bus.capacity}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={() => setEditingBus(bus)}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(bus.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => onBusSelect(bus)}
                  className="mt-2 w-full text-xs text-indigo-600 hover:text-indigo-800 border border-indigo-600 rounded px-2 py-1"
                >
                  Select
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}