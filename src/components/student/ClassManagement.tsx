import React from 'react';
import { PlusCircle, Edit2, Trash2, X, Check, GraduationCap } from 'lucide-react';
import { ClassInfo } from '../../types/class';
import { useClasses } from '../../hooks/useClasses';
import { Toast } from '../Toast';

interface Props {
  onClassSelect: (classInfo: ClassInfo) => void;
}

export function ClassManagement({ onClassSelect }: Props) {
  const { classes, loading, error, addClass, editClass, removeClass } = useClasses();
  const [editingClass, setEditingClass] = React.useState<ClassInfo | null>(null);
  const [className, setClassName] = React.useState('');
  const [classSize, setClassSize] = React.useState('');
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (className && classSize) {
      const success = await addClass({
        name: className,
        size: parseInt(classSize, 10)
      });

      if (success) {
        setToast({ message: 'Class added successfully', type: 'success' });
        setClassName('');
        setClassSize('');
      } else {
        setToast({ message: 'Failed to add class', type: 'error' });
      }
    }
  };

  const handleUpdate = async () => {
    if (editingClass?.id) {
      const success = await editClass(editingClass.id, editingClass);
      if (success) {
        setToast({ message: 'Class updated successfully', type: 'success' });
        setEditingClass(null);
      } else {
        setToast({ message: 'Failed to update class', type: 'error' });
      }
    }
  };

  const handleDelete = async (id: string) => {
    const success = await removeClass(id);
    if (success) {
      setToast({ message: 'Class deleted successfully', type: 'success' });
    } else {
      setToast({ message: 'Failed to delete class', type: 'error' });
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading classes...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-4">Class Management</h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="rounded-md border-gray-300"
          required
        />
        <input
          type="number"
          placeholder="Class Size"
          value={classSize}
          onChange={(e) => setClassSize(e.target.value)}
          min="1"
          className="rounded-md border-gray-300"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Class
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {classes.map((classInfo) => (
          <div
            key={classInfo.id}
            className="p-4 bg-gray-50 rounded-lg relative group cursor-pointer hover:bg-gray-100"
            onClick={() => !editingClass && onClassSelect(classInfo)}
          >
            {editingClass?.id === classInfo.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({
                    ...editingClass,
                    name: e.target.value
                  })}
                  className="w-full text-sm rounded-md border-gray-300"
                />
                <input
                  type="number"
                  value={editingClass.size}
                  onChange={(e) => setEditingClass({
                    ...editingClass,
                    size: parseInt(e.target.value, 10)
                  })}
                  className="w-full text-sm rounded-md border-gray-300"
                  min="1"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate();
                    }}
                    className="p-1 text-green-600 hover:text-green-800"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingClass(null);
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-2">
                  <GraduationCap className="w-4 h-4 mr-2 text-indigo-600" />
                  <span className="font-medium">{classInfo.name}</span>
                </div>
                <p className="text-sm text-gray-600">Size: {classInfo.size}</p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingClass(classInfo);
                    }}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      classInfo.id && handleDelete(classInfo.id);
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

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