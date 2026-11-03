import { useEffect, useState } from 'react';
import { Save, UserRound } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', age: '', gender: '', bloodGroup: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({
      name: user.name || '', email: user.email || '', phone: user.phone || '',
      age: user.age || '', gender: user.gender || '', bloodGroup: user.bloodGroup || ''
    });
  }, [user]);

  function updateField(event) {
    setSaved(false);
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile({ name: form.name.trim(), phone: form.phone.trim(), age: form.age, gender: form.gender, bloodGroup: form.bloodGroup });
    setSaved(true);
  }

  return (
    <>
      <PageHeader eyebrow="Account details" title="My profile" description="View and update the personal details linked to your patient account." />
      <div className="profile-layout">
        <section className="panel profile-summary">
          <div className="profile-avatar"><UserRound size={32} /></div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="patient-id-pill">Patient ID · {user.id}</span>
          <div className="profile-summary-line"><span>Account type</span><strong>Patient</strong></div>
          <div className="profile-summary-line"><span>Portal status</span><strong className="online-status">Active</strong></div>
        </section>
        <section className="panel profile-form-panel">
          <div className="panel-heading"><div><h2>Personal information</h2><p>Fields marked with * are required.</p></div></div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-grid two-col">
              <div className="form-field"><label>Full name *</label><input name="name" value={form.name} onChange={updateField} required /></div>
              <div className="form-field"><label>Email address</label><input type="email" value={form.email} disabled /></div>
              <div className="form-field"><label>Mobile number</label><input name="phone" value={form.phone} onChange={updateField} pattern="[0-9]{10}" placeholder="10-digit number" /></div>
              <div className="form-field"><label>Age</label><input name="age" type="number" min="1" max="120" value={form.age} onChange={updateField} placeholder="Your age" /></div>
              <div className="form-field"><label>Gender</label><select name="gender" value={form.gender} onChange={updateField}><option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></div>
              <div className="form-field"><label>Blood group</label><select name="bloodGroup" value={form.bloodGroup} onChange={updateField}><option value="">Select blood group</option>{['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((group) => <option key={group}>{group}</option>)}</select></div>
            </div>
            {saved && <p className="success-message">Your profile has been updated.</p>}
            <div className="form-actions"><button className="primary-button" type="submit"><Save size={16} /> Save changes</button></div>
          </form>
        </section>
      </div>
    </>
  );
}

