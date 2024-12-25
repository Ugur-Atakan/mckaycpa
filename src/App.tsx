import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FormList } from './components/admin/FormList';
import { FormDetail } from './components/admin/FormDetail';
import { FormNew } from './components/admin/FormNew';
import { SettingsPage } from './components/admin/Settings/SettingsPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { FormFlow } from './components/FormFlow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormFlow />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forms"
          element={
            <ProtectedRoute>
              <FormList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forms/new"
          element={
            <ProtectedRoute>
              <FormNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forms/:id"
          element={
            <ProtectedRoute>
              <FormDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;