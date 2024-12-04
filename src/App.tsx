import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LecturerCheckIn } from './pages/LecturerCheckIn';
import { StudentMovement } from './pages/StudentMovement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lecturer-checkin" element={<LecturerCheckIn />} />
        <Route path="/student-movement" element={<StudentMovement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;