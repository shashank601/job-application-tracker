import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "../utils/RequireAuth.jsx";
import RequireRole from "../utils/RequireRole.jsx";
import GuestRoute from "../utils/GuestRoute.jsx";

import AuthLayout from "../layout/AuthLayout.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Admin from "../pages/Admin.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      </Route>

      <Route path="/dashboard" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />
     
      <Route path="/admin" element={
        <RequireAuth>
          <RequireRole role="admin">
            <Admin />
          </RequireRole>
        </RequireAuth>
      } />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}