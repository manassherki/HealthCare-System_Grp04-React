import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  if (user) return <Navigate to="/dashboard" replace />;

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (form.password.length < 6) return setError('Password should contain at least 6 characters.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    const result = signUp({
      name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
      password: form.password, age: '', gender: '', bloodGroup: ''
    });
    if (result.success) navigate('/dashboard');
    else setError(result.message);
  }

  return (
    <div className="auth-page">
      <div className="auth-side-panel">
        <div className="auth-side-content">
          <Logo />
          <div className="auth-message">
            <span className="auth-kicker">New patient</span>
            <h1>Start with your care details.</h1>
            <p>Set up a patient record to book appointments and review your urine test history.</p>
          </div>
          <div className="auth-side-note"><span className="note-check">✓</span> Your patient information in one place</div>
        </div>
      </div>
      <div className="auth-main">
        <div className="auth-card signup-card">
          <div className="auth-mobile-brand"><Logo /></div>
          <p className="eyebrow">NEW PATIENT</p>
          <h2>Create your account</h2>
          <p className="auth-subtitle">Enter a few details to get started.</p>
          <form onSubmit={handleSubmit} className="form-stack">
            <label className="field-label">Full name</label>
            <div className="input-with-icon"><UserRound size={17} /><input name="name" value={form.name} onChange={updateField} placeholder="Your full name" required /></div>
            <label className="field-label">Email address</label>
            <div className="input-with-icon"><Mail size={17} /><input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /></div>
            <label className="field-label">Mobile number</label>
            <div className="input-with-icon"><Phone size={17} /><input name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="10-digit mobile number" pattern="[0-9]{10}" required /></div>
            <label className="field-label">Password</label>
            <div className="input-with-icon"><LockKeyhole size={17} /><input name="password" type="password" value={form.password} onChange={updateField} placeholder="At least 6 characters" required /></div>
            <label className="field-label">Confirm password</label>
            <div className="input-with-icon"><LockKeyhole size={17} /><input name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} placeholder="Enter password again" required /></div>
            {error && <p className="form-error">{error}</p>}
            <button className="primary-button full-button" type="submit">Create account <ArrowRight size={17} /></button>
          </form>
          <div className="auth-switch">Already have an account? <Link to="/signin">Sign in</Link></div>
          <p className="auth-disclaimer">Demo only: account details are stored in this browser, not a secure server.</p>
        </div>
      </div>
    </div>
  );
}


