import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import MedicalHistory from './pages/MedicalHistory';
import TestRegistration from './pages/TestRegistration';
import TestResults from './pages/TestResults';
import About from './pages/About';
import { initialiseDemoData } from './utils/storage';

initialiseDemoData();

function ProtectedLayout() {
  const { user } = useAuth();
  return user ? <DashboardLayout /> : <Navigate to="/signin" replace />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/dashboard' : '/signin'} replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/history" element={<MedicalHistory />} />
        <Route path="/tests/new" element={<TestRegistration />} />
        <Route path="/results" element={<TestResults />} />
        <Route path="/results/:id" element={<TestResults />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/signin'} replace />} />
    </Routes>
  );
}
