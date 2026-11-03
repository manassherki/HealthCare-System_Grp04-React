import { useState } from 'react';
import { Bell, Menu, UserRound } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const pageNames = {
  '/dashboard': 'Dashboard',
  '/appointments': 'Appointments',
  '/tests/new': 'Test registration',
  '/results': 'Test results',
  '/history': 'Medical history',
  '/profile': 'My profile',
  '/about': 'About this project'
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  let pageTitle = pageNames[location.pathname] || 'Patient portal';
  if (location.pathname.startsWith('/results/')) {
    pageTitle = 'Test report';
  }

  function openProfile() {
    navigate('/profile');
  }

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu icon-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <div className="topbar-title">{pageTitle}</div>

          <div className="topbar-right">
            <span className="topbar-greeting">
              Hello, {user?.name?.split(' ')[0] || 'there'}
            </span>

            <button
              className="icon-button notification-button"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <i />
            </button>

            <button
              className="topbar-avatar"
              onClick={openProfile}
              aria-label="Open profile"
            >
              <UserRound size={18} />
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>

        <footer className="app-footer">
          Urologist Healthcare · Patient portal demonstration
        </footer>
      </div>
    </div>
  );
}
