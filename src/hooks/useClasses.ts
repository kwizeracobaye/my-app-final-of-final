import { useState, useEffect } from 'react';
import { ClassInfo } from '../types/class';
import { getClasses, saveClass, updateClass, deleteClass } from '../services/classService';

export function useClasses() {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      setLoading(true);
      const data = await getClasses();
      setClasses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load classes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addClass(data: ClassInfo) {
    try {
      await saveClass(data);
      await loadClasses();
      return true;
    } catch (err) {
      setError('Failed to add class');
      console.error(err);
      return false;
    }
  }

  async function editClass(id: string, data: ClassInfo) {
    try {
      await updateClass(id, data);
      setClasses(prev => prev.map(item => 
        item.id === id ? { ...data, id } : item
      ));
      return true;
    } catch (err) {
      setError('Failed to update class');
      console.error(err);
      return false;
    }
  }

  async function removeClass(id: string) {
    try {
      await deleteClass(id);
      setClasses(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete class');
      console.error(err);
      return false;
    }
  }

  return {
    classes,
    loading,
    error,
    addClass,
    editClass,
    removeClass,
    refreshClasses: loadClasses
  };
}