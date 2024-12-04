import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { InputForm } from '../components/student/InputForm';
import { InfoDisplay } from '../components/student/InfoDisplay';
import { ClassManagement } from '../components/student/ClassManagement';
import { BusManagement } from '../components/student/BusManagement';
import { WeeklySummary } from '../components/student/WeeklySummary';
import { MovementData } from '../types/movement';
import { ClassInfo } from '../types/class';
import { BusInfo } from '../types/bus';
import { exportMovementsToCSV } from '../utils/movement-export';
import { Toast } from '../components/Toast';
import { useMovements } from '../hooks/useMovements';
import { getBuses } from '../utils/bus-storage';

export function StudentMovement() {
  const { movements, loading, error, addMovement, editMovement, removeMovement } = useMovements();
  const [editData, setEditData] = React.useState<MovementData | undefined>();
  const [selectedClass, setSelectedClass] = React.useState<ClassInfo | undefined>();
  const [selectedBus, setSelectedBus] = React.useState<BusInfo | undefined>();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const buses = getBuses();

  const handleSubmit = async (data: Omit<MovementData, 'id'> & { id?: string }) => {
    let success;
    if (data.id) {
      success = await editMovement(data.id, data);
      if (success) {
        setEditData(undefined);
        showToast('Movement updated successfully', 'success');
      } else {
        showToast('Failed to update movement', 'error');
      }
    } else {
      success = await addMovement(data);
      if (success) {
        showToast('Movement added successfully', 'success');
        // Reset selections after successful submission
        setSelectedClass(undefined);
        setSelectedBus(undefined);
      } else {
        showToast('Failed to add movement', 'error');
      }
    }
  };

  const handleEdit = (data: MovementData) => {
    setEditData(data);
    setSelectedClass(undefined);
    setSelectedBus(undefined);
  };

  const handleDelete = async (id: string) => {
    const success = await removeMovement(id);
    if (success) {
      showToast('Movement deleted successfully', 'success');
    } else {
      showToast('Failed to delete movement', 'error');
    }
  };

  const handleExport = () => {
    try {
      exportMovementsToCSV(movements);
      showToast('Report exported successfully', 'success');
    } catch (error) {
      showToast('Failed to export report', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return <div className="text-center py-8">Loading movements...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white py-4 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Movement Plan</h1>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ClassManagement onClassSelect={setSelectedClass} />
            <BusManagement onBusSelect={setSelectedBus} />

            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editData ? 'Edit Movement' : 'Add New Movement'}
              </h2>
              <InputForm 
                onSubmit={handleSubmit}
                editData={editData}
                selectedClass={selectedClass}
                selectedBus={selectedBus}
                existingMovements={movements}
              />
            </div>
          </div>

          <div className="space-y-6">
            <WeeklySummary movements={movements} buses={buses} />
            <div>
              <h2 className="text-xl font-semibold mb-4">Movement Details</h2>
              <InfoDisplay
                info={movements}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}