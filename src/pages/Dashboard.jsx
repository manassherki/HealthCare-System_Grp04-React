import { ArrowRight, CalendarDays, ClipboardList, Clock3, FlaskConical, Plus, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import PatientInfoCard from '../components/PatientInfoCard';
import { useAuth } from '../context/AuthContext';
import { getAppointments, getTests } from '../utils/storage';

export default function Dashboard() {
  const { user } = useAuth();
  const appointments = getAppointments().filter((item) => item.patientId === user.id);
  const tests = getTests().filter((item) => item.patientId === user.id);
  const nextAppointment = appointments.slice().sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
  const latestTest = tests.slice().sort((a, b) => b.createdAt - a.createdAt)[0];

  return (
    <>
      <PageHeader eyebrow="Your care" title={`Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, ${user.name.split(' ')[0]}!`} description="Appointments, urine test records and your profile at a glance." />
      <div className="stats-grid">
        <StatCard icon={CalendarDays} label="Appointments" value={appointments.length} note="Total bookings" />
        <StatCard icon={ClipboardList} label="Test reports" value={tests.filter((item) => item.status === 'Ready for review').length} note="Reports generated" tone="blue" />
        <StatCard icon={Clock3} label="Pending tests" value={tests.filter((item) => item.status !== 'Ready for review').length} note="Awaiting device" tone="amber" />
      </div>

      <section className="section-block">
        <div className="section-heading"><div><h2>Continue with</h2><p>Choose what you would like to do next.</p></div></div>
        <div className="quick-actions-grid">
          <Link to="/appointments" className="quick-action-card"><span className="quick-action-icon teal-icon"><CalendarDays size={21} /></span><span><strong>Book an appointment</strong><small>Find a doctor and choose a slot</small></span><ArrowRight size={17} className="quick-arrow" /></Link>
          <Link to="/tests/new" className="quick-action-card"><span className="quick-action-icon blue-icon"><FlaskConical size={21} /></span><span><strong>Register a test</strong><small>Start a urine test workflow</small></span><ArrowRight size={17} className="quick-arrow" /></Link>
          <Link to="/results" className="quick-action-card"><span className="quick-action-icon purple-icon"><ClipboardList size={21} /></span><span><strong>View test results</strong><small>Open your generated reports</small></span><ArrowRight size={17} className="quick-arrow" /></Link>
          <Link to="/profile" className="quick-action-card"><span className="quick-action-icon amber-icon"><UserRound size={21} /></span><span><strong>Update profile</strong><small>Keep your details up to date</small></span><ArrowRight size={17} className="quick-arrow" /></Link>
        </div>
      </section>

      <div className="dashboard-lower-grid">
        <section className="panel content-panel">
          <div className="panel-heading"><div><h2>Upcoming appointment</h2><p>Your next scheduled visit.</p></div><Link to="/appointments" className="text-link">View all <ArrowRight size={15} /></Link></div>
          {nextAppointment ? (
            <div className="appointment-preview">
              <div className="date-tile"><strong>{new Date(`${nextAppointment.date}T00:00:00`).getDate()}</strong><span>{new Date(`${nextAppointment.date}T00:00:00`).toLocaleString('en-IN', { month: 'short' })}</span></div>
              <div className="preview-copy"><strong>{nextAppointment.doctor}</strong><span>{nextAppointment.department}</span><small>{nextAppointment.time} · {nextAppointment.date}</small></div>
              <StatusBadge tone="green">Booked</StatusBadge>
            </div>
          ) : <EmptyState icon={CalendarDays} title="No appointments yet" description="Your booked appointments will appear here." action={<Link className="small-outline-button" to="/appointments">Book appointment <ArrowRight size={14} /></Link>} />}
        </section>

        <section className="panel content-panel">
          <div className="panel-heading"><div><h2>Latest test report</h2><p>Your most recent urine analysis.</p></div><Link to="/results" className="text-link">View all <ArrowRight size={15} /></Link></div>
          {latestTest ? (
            <div className="latest-report-card">
              <div className="report-icon"><FlaskConical size={21} /></div>
              <div className="preview-copy"><strong>{latestTest.testName}</strong><span>{latestTest.sampleId}</span><small>{new Date(latestTest.createdAt).toLocaleDateString('en-IN')}</small></div>
              <StatusBadge tone={latestTest.status === 'Ready for review' ? 'green' : 'amber'}>{latestTest.status}</StatusBadge>
              <Link to={`/results/${latestTest.id}`} className="icon-button" aria-label="Open report"><ArrowRight size={17} /></Link>
            </div>
          ) : <EmptyState icon={ClipboardList} title="No reports available" description="Once you register a test, its status and report will show here." action={<Link className="small-outline-button" to="/tests/new"><Plus size={14} /> Register a test</Link>} />}
        </section>
      </div>

      <div className="dashboard-profile-row">
        <PatientInfoCard name={user.name} patientId={user.id} email={user.email} phone={user.phone} age={user.age} bloodGroup={user.bloodGroup} />
        <div className="privacy-note"><div className="privacy-icon"><ClipboardList size={19} /></div><div><strong>A note about your reports</strong><p>This student project uses browser storage and sample readings. Real patient reports must be securely stored and reviewed by a qualified clinician.</p></div></div>
      </div>
    </>
  );
}



