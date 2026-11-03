import { NavLink, useNavigate } from 'react-router-dom';
import {
  CalendarDays, ClipboardList, FileClock, FlaskConical,
  Info, LayoutDashboard, LogOut, UserRound
} from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/tests/new', label: 'Register a test', icon: FlaskConical },
  { to: '/results', label: 'Test results', icon: ClipboardList },
  { to: '/history', label: 'Medical history', icon: FileClock },
  { to: '/profile', label: 'My profile', icon: UserRound },
  { to: '/about', label: 'About this project', icon: Info }
];

export default function Sidebar({ open, onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate('/signin');
  }

  return (
    <>
      {open && <button className="sidebar-scrim" onClick={onClose} aria-label="Close menu" />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand"><Logo /></div>
        <p className="sidebar-label">Your care</p>
        <nav className="side-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <div className="help-dot" />
            <div><strong>Need help?</strong><span>Contact the help desk</span></div>
          </div>
          <button className="nav-link logout-link" onClick={handleLogout}>
            <LogOut size={18} /><span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

