import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@somaiya.edu');
  const [password, setPassword] = useState('patient123');
  const [error, setError] = useState('');

  if (user) return <Navigate to="/dashboard" replace />;

  function handleSubmit(event) {
    event.preventDefault();
    const result = signIn(email, password);
    if (result.success) navigate('/dashboard');
    else setError(result.message);
  }

  return (
    <div className="auth-page">
      <div className="auth-side-panel">
        <div className="auth-side-content">
          <Logo />
          <div className="auth-message">
            <span className="auth-kicker">Urology care</span>
            <h1>Your urology care, in one place.</h1>
            <p>Keep appointments, urine test records and personal details together.</p>
          </div>
          <div className="auth-side-note"><span className="note-check">✓</span> Simple access to your patient records</div>
        </div>
      </div>

      <div className="auth-main">
        <div className="auth-card">
          <div className="auth-mobile-brand"><Logo /></div>
          <p className="eyebrow">PATIENT PORTAL</p>
          <h2>Welcome back</h2>
          <p className="auth-subtitle">Sign in to continue to your account.</p>
          <form onSubmit={handleSubmit} className="form-stack">
            <label className="field-label">Email address</label>
            <div className="input-with-icon"><Mail size={17} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
            <label className="field-label">Password</label>
            <div className="input-with-icon"><LockKeyhole size={17} /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required /></div>
            {error && <p className="form-error">{error}</p>}
            <button className="primary-button full-button" type="submit">Sign in <ArrowRight size={17} /></button>
          </form>
          <div className="auth-switch">Don't have an account? <Link to="/signup">Create an account</Link></div>
          <div className="demo-login"><strong>Demo account</strong><span>demo@somaiya.edu</span><span>patient123</span></div>
          <p className="auth-disclaimer">Student project demo. This page does not provide real medical account security.</p>
        </div>
      </div>
    </div>
  );
}


