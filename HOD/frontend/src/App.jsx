import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ReviewPanel from './pages/ReviewPanel';
import NotificationCenter from './pages/NotificationCenter';
import DocumentUpload from './pages/DocumentUpload';
import ResetPassword from './pages/ResetPassword';
import Analytics from './pages/Analytics';
import ExportModule from './pages/ExportModule';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Always-accessible auth routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={
            <div className="min-h-screen bg-brand-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
              <Login />
            </div>
          } />
          <Route path="/forgot-password" element={
            <div className="min-h-screen bg-brand-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
              <ForgotPassword />
            </div>
          } />
          <Route path="/reset-password/:token" element={
            <div className="min-h-screen bg-brand-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
              <ResetPassword />
            </div>
          } />



          {/* HOD Protected Dashboard Routes */}
          <Route path="/dashboard/upload" element={
            localStorage.getItem('hod_token') ? <DocumentUpload /> : <Navigate to="/login" replace />
          } />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/reviews" element={<ReviewPanel />} />
            <Route path="/dashboard/notifications" element={<NotificationCenter />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/export" element={<ExportModule />} />
            <Route path="/dashboard/staff" element={<div className="p-4 dark:text-gray-300">Staff Directory Coming Soon</div>} />
            <Route path="/dashboard/schedule" element={<div className="p-4 dark:text-gray-300">Schedule Coming Soon</div>} />
            <Route path="/dashboard/settings" element={<div className="p-4 dark:text-gray-300">Settings Coming Soon</div>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

