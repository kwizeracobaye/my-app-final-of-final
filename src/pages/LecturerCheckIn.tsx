import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { CheckInForm } from '../components/CheckInForm';
import { CheckOutForm } from '../components/CheckOutForm';
import { LecturerTable } from '../components/LecturerTable';
import { RoomManagement } from '../components/RoomManagement';
import { Toast } from '../components/Toast';
import { Lecturer, LecturerFormData, Room } from '../types';

export function LecturerCheckIn() {
  const [activeTab, setActiveTab] = React.useState<'checkin' | 'checkout' | 'list'>('checkin');
  const [lecturers, setLecturers] = React.useState<Lecturer[]>(() => {
    const saved = localStorage.getItem('lecturers');
    return saved ? JSON.parse(saved) : [];
  });

  const [rooms, setRooms] = React.useState<Room[]>(() => {
    const saved = localStorage.getItem('rooms');
    return saved ? JSON.parse(saved) : [
      { number: 'A101', isOccupied: false },
      { number: 'A102', isOccupied: false },
      { number: 'B201', isOccupied: false },
      { number: 'B202', isOccupied: false },
    ];
  });

  const [toast, setToast] = React.useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  React.useEffect(() => {
    localStorage.setItem('lecturers', JSON.stringify(lecturers));
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [lecturers, rooms]);

  const handleAddRoom = (roomNumber: string) => {
    if (rooms.some(room => room.number === roomNumber)) {
      setToast({
        message: 'Room already exists',
        type: 'error',
      });
      return;
    }

    setRooms([...rooms, { number: roomNumber, isOccupied: false }]);
    setToast({
      message: 'Room added successfully',
      type: 'success',
    });
  };

  const handleEditRoom = (oldNumber: string, newNumber: string) => {
    if (rooms.some(room => room.number === newNumber)) {
      setToast({
        message: 'Room number already exists',
        type: 'error',
      });
      return;
    }

    setRooms(rooms.map(room => 
      room.number === oldNumber ? { ...room, number: newNumber } : room
    ));
    
    setLecturers(lecturers.map(lecturer =>
      lecturer.roomNumber === oldNumber ? { ...lecturer, roomNumber: newNumber } : lecturer
    ));

    setToast({
      message: 'Room updated successfully',
      type: 'success',
    });
  };

  const handleDeleteRoom = (roomNumber: string) => {
    const room = rooms.find(r => r.number === roomNumber);
    if (!room) {
      setToast({
        message: 'Room not found',
        type: 'error',
      });
      return;
    }

    if (room.isOccupied) {
      setToast({
        message: 'Cannot delete occupied room',
        type: 'error',
      });
      return;
    }

    setRooms(rooms.filter(r => r.number !== roomNumber));
    setToast({
      message: 'Room deleted successfully',
      type: 'success',
    });
  };

  const handleCheckIn = (data: LecturerFormData) => {
    const existingLecturer = lecturers.find(
      (l) => l.name.toLowerCase() === data.name.toLowerCase()
    );

    if (existingLecturer) {
      setToast({
        message: 'Lecturer is already checked in',
        type: 'error',
      });
      return;
    }

    const room = rooms.find(r => r.number === data.roomNumber);
    if (!room) {
      setToast({
        message: 'Invalid room number',
        type: 'error',
      });
      return;
    }

    if (room.isOccupied) {
      setToast({
        message: 'Room is already occupied',
        type: 'error',
      });
      return;
    }

    const newLecturer: Lecturer = {
      ...data,
      id: crypto.randomUUID(),
      checkInDate: new Date().toISOString(),
    };

    setLecturers([...lecturers, newLecturer]);
    setRooms(rooms.map(r => 
      r.number === data.roomNumber ? { ...r, isOccupied: true } : r
    ));
    setToast({
      message: 'Lecturer successfully checked in',
      type: 'success',
    });
  };

  const handleCheckOut = (name: string) => {
    const lecturer = lecturers.find(
      (l) => l.name.toLowerCase() === name.toLowerCase()
    );

    if (!lecturer) {
      setToast({
        message: 'Lecturer not found',
        type: 'error',
      });
      return;
    }

    setLecturers(lecturers.filter((l) => l.id !== lecturer.id));
    setRooms(rooms.map(r => 
      r.number === lecturer.roomNumber ? { ...r, isOccupied: false } : r
    ));
    setToast({
      message: 'Lecturer successfully checked out',
      type: 'success',
    });
  };

  const handleCheckOutById = (id: string) => {
    const lecturer = lecturers.find(l => l.id === id);
    if (lecturer) {
      setLecturers(lecturers.filter((l) => l.id !== id));
      setRooms(rooms.map(r => 
        r.number === lecturer.roomNumber ? { ...r, isOccupied: false } : r
      ));
      setToast({
        message: 'Lecturer successfully checked out',
        type: 'success',
      });
    }
  };

  const handleEditLecturer = (id: string, data: Lecturer) => {
    const lecturer = lecturers.find(l => l.id === id);
    if (!lecturer) return;

    if (lecturer.roomNumber !== data.roomNumber) {
      setRooms(rooms.map(r => {
        if (r.number === lecturer.roomNumber) return { ...r, isOccupied: false };
        if (r.number === data.roomNumber) return { ...r, isOccupied: true };
        return r;
      }));
    }

    setLecturers(lecturers.map(l => 
      l.id === id ? { ...l, ...data } : l
    ));

    setToast({
      message: 'Lecturer details updated successfully',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-4">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <RoomManagement 
          rooms={rooms} 
          onAddRoom={handleAddRoom}
          onEditRoom={handleEditRoom}
          onDeleteRoom={handleDeleteRoom}
        />

        <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'checkin'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('checkin')}
            >
              Check In
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'checkout'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('checkout')}
            >
              Check Out
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === 'list'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('list')}
            >
              Current
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'checkin' && (
              <CheckInForm onSubmit={handleCheckIn} rooms={rooms} />
            )}
            {activeTab === 'checkout' && (
              <CheckOutForm onSubmit={handleCheckOut} />
            )}
            {activeTab === 'list' && (
              <LecturerTable
                lecturers={lecturers}
                onCheckOut={handleCheckOutById}
                onEditRoom={handleEditRoom}
                onEditLecturer={handleEditLecturer}
                rooms={rooms}
              />
            )}
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