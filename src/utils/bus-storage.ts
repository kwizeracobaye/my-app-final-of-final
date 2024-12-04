import { BusInfo } from '../types/bus';

export function saveBus(busInfo: Omit<BusInfo, 'id'>): void {
  const buses = getBuses();
  const newBus = { ...busInfo, id: crypto.randomUUID() };
  buses.push(newBus);
  localStorage.setItem('buses', JSON.stringify(buses));
}

export function updateBus(busInfo: BusInfo): void {
  const buses = getBuses();
  const index = buses.findIndex(b => b.id === busInfo.id);
  if (index !== -1) {
    buses[index] = busInfo;
    localStorage.setItem('buses', JSON.stringify(buses));
  }
}

export function deleteBus(id: string): void {
  const buses = getBuses().filter(b => b.id !== id);
  localStorage.setItem('buses', JSON.stringify(buses));
}

export function getBuses(): BusInfo[] {
  const saved = localStorage.getItem('buses');
  return saved ? JSON.parse(saved) : [];
}