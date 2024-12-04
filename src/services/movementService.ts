import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MovementData } from '../types/movement';

const COLLECTION_NAME = 'movements';

export async function saveMovement(movement: Omit<MovementData, 'id'>): Promise<string> {
  try {
    const movementsRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(movementsRef, {
      ...movement,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving movement:', error);
    throw error;
  }
}

export async function getMovements(): Promise<MovementData[]> {
  try {
    const movementsRef = collection(db, COLLECTION_NAME);
    const q = query(movementsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MovementData));
  } catch (error) {
    console.error('Error getting movements:', error);
    throw error;
  }
}

export async function updateMovement(id: string, movement: Omit<MovementData, 'id'>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { ...movement });
  } catch (error) {
    console.error('Error updating movement:', error);
    throw error;
  }
}

export async function deleteMovement(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting movement:', error);
    throw error;
  }
}