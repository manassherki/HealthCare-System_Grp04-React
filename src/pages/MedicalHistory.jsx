import { CalendarDays, ClipboardList, FileClock, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { getAppointments, getTests } from '../utils/storage';

export default function MedicalHistory() {
  const { user } = useAuth();
  const tests = getTests()
    .filter((item) => item.patientId === user.id)
    .sort((first, second) => second.createdAt - first.createdAt);
  const appointments = getAppointments()
    .filter((item) => item.patientId === user.id)
    .sort((first, second) => second.createdAt - first.createdAt);

  return (
    <>
      <PageHeader eyebrow="Your records" title="Medical history" description="A simple timeline of your registered tests and doctor appointments." />
      <div className="history-summary-grid">
        <div className="history-summary-card"><span className="quick-action-icon blue-icon"><FlaskConical size={20} /></span><div><strong>{tests.length}</strong><small>Test records</small></div></div>
        <div className="history-summary-card"><span className="quick-action-icon teal-icon"><CalendarDays size={20} /></span><div><strong>{appointments.length}</strong><small>Appointments</small></div></div>
      </div>
      <section className="panel content-panel history-section">
        <div className="panel-heading"><div><h2>Test history</h2><p>Your urine analysis registrations and reports.</p></div></div>
        {tests.length ? <div className="history-list">{tests.map((item) => <div className="history-item" key={item.id}><div className="timeline-dot"><FlaskConical size={16} /></div><div className="history-item-content"><div className="history-item-top"><strong>{item.testName}</strong><StatusBadge tone={item.status === 'Ready for review' ? 'green' : 'amber'}>{item.status}</StatusBadge></div><p>{item.sampleId} · {item.id}</p><small>{new Date(item.createdAt).toLocaleString('en-IN')}</small>{item.status === 'Ready for review' && <Link to={`/results/${item.id}`} className="text-link history-report-link">View report <ClipboardList size={14} /></Link>}</div></div>)}</div> : <EmptyState icon={FileClock} title="No test history yet" description="Your registered samples and generated reports will appear here." action={<Link to="/tests/new" className="small-outline-button">Register a test</Link>} />}
      </section>
      <section className="panel content-panel history-section">
        <div className="panel-heading"><div><h2>Appointment history</h2><p>Your doctor consultation bookings.</p></div></div>
        {appointments.length ? <div className="table-wrap"><table className="data-table"><thead><tr><th>Doctor</th><th>Department</th><th>Date</th><th>Time</th><th>Status</th></tr></thead><tbody>{appointments.map((item) => <tr key={item.id}><td><strong>{item.doctor}</strong><small>{item.id}</small></td><td>{item.department}</td><td>{item.date}</td><td>{item.time}</td><td><StatusBadge tone="green">{item.status}</StatusBadge></td></tr>)}</tbody></table></div> : <EmptyState icon={CalendarDays} title="No appointments yet" description="Your doctor bookings will appear here." action={<Link to="/appointments" className="small-outline-button">Book an appointment</Link>} />}
      </section>
      <p className="helper-text history-disclaimer">Only records created in this browser demo are shown. This is not a connected hospital medical record system.</p>
    </>
  );
}



