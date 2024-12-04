import { useState, useEffect } from 'react';
import { MovementData } from '../types/movement';
import { getMovements, saveMovement, updateMovement, deleteMovement } from '../services/movementService';

export function useMovements() {
  const [movements, setMovements] = useState<MovementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMovements();
  }, []);

  async function loadMovements() {
    try {
      setLoading(true);
      const data = await getMovements();
      setMovements(data);
      setError(null);
    } catch (err) {
      setError('Failed to load movements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addMovement(data: Omit<MovementData, 'id'>) {
    try {
      const id = await saveMovement(data);
      setMovements(prev => [{ ...data, id } as MovementData, ...prev]);
      return true;
    } catch (err) {
      setError('Failed to add movement');
      console.error(err);
      return false;
    }
  }

  async function editMovement(id: string, data: Omit<MovementData, 'id'>) {
    try {
      await updateMovement(id, data);
      setMovements(prev => prev.map(item => 
        item.id === id ? { ...data, id } as MovementData : item
      ));
      return true;
    } catch (err) {
      setError('Failed to update movement');
      console.error(err);
      return false;
    }
  }

  async function removeMovement(id: string) {
    try {
      await deleteMovement(id);
      setMovements(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete movement');
      console.error(err);
      return false;
    }
  }

  return {
    movements,
    loading,
    error,
    addMovement,
    editMovement,
    removeMovement,
    refreshMovements: loadMovements
  };
}