import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import FareEstimation from './pages/FareEstimation';
import BookingPage from './pages/BookingPage';
import SuccessPage from './pages/SuccessPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminVehicles from './pages/AdminVehicles';
import AdminBookings from './pages/AdminBookings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/fare-estimation" element={<FareEstimation />} />
              <Route path="/booking-verification" element={<BookingPage />} />
              <Route path="/success" element={<SuccessPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/vehicles" element={
                <ProtectedRoute><AdminVehicles /></ProtectedRoute>
              } />
              <Route path="/admin/bookings" element={
                <ProtectedRoute><AdminBookings /></ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 text-white py-12 mt-20">
            <div className="container text-center space-y-4">
              <p className="font-bold text-xl tracking-tight">Taxi<span className="text-primary">Booking</span></p>
              <p className="text-slate-400 text-sm">© 2026 Premium Taxi Booking Service. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
