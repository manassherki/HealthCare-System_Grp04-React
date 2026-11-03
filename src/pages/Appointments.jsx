import { useState } from 'react';
import { CalendarDays, Check, Clock3, Stethoscope } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { getAppointments, makeId, saveAppointments } from '../utils/storage';

const doctors = [
  {
    id: 'doctor-1',
    name: 'Dr. Ninad Sharma',
    department: 'Urology',
    description: 'General consultation and urinary health',
    initials: 'NS'
  },
  {
    id: 'doctor-2',
    name: 'Dr. Aditi Deshmukh',
    department: 'General Medicine',
    description: 'Routine health consultation',
    initials: 'AD'
  }
];

const timeSlots = [
  '10:00 AM',
  '11:30 AM',
  '12:00 PM',
  '02:30 PM',
  '04:00 PM'
];

export default function Appointments() {
  const { user } = useAuth();

  const [doctorId, setDoctorId] = useState(doctors[0].id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const appointments = getAppointments()
    .filter((appointment) => appointment.patientId === user.id)
    .sort((firstAppointment, secondAppointment) => {
      return secondAppointment.createdAt - firstAppointment.createdAt;
    });

  const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
  const today = new Date().toISOString().slice(0, 10);

  function handleBooking(event) {
    event.preventDefault();
    setError('');

    if (!date || !time) {
      setError('Please select an appointment date and time.');
      return;
    }

    const allAppointments = getAppointments();
    const slotIsTaken = allAppointments.some((appointment) => {
      return appointment.doctorId === doctorId
        && appointment.date === date
        && appointment.time === time;
    });

    if (slotIsTaken) {
      setError('This demo slot has already been booked. Please choose another time.');
      return;
    }

    const booking = {
      id: makeId('APT'),
      patientId: user.id,
      doctorId: doctorId,
      doctor: selectedDoctor.name,
      department: selectedDoctor.department,
      date: date,
      time: time,
      status: 'Booked',
      createdAt: Date.now()
    };

    saveAppointments([...allAppointments, booking]);

    const bookingTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    setMessage(`Your appointment with ${selectedDoctor.name} was booked at ${bookingTime}.`);
    setDate('');
    setTime('');
  }

  function selectTimeSlot(slot) {
    setTime(slot);
    setError('');
  }

  return (
    <>
      <PageHeader
        eyebrow="Clinic visit"
        title="Book an appointment"
        description="Choose a doctor and select a date and time that works for you."
      />

      <div className="appointment-layout">
        <section className="panel booking-panel">
          <div className="panel-heading">
            <div>
              <h2>1. Choose a doctor</h2>
              <p>Select a department for your consultation.</p>
            </div>
          </div>

          <div className="doctor-list">
            {doctors.map((doctor) => {
              const isSelected = doctorId === doctor.id;
              const buttonClass = isSelected
                ? 'doctor-option selected'
                : 'doctor-option';

              return (
                <button
                  key={doctor.id}
                  type="button"
                  className={buttonClass}
                  onClick={() => setDoctorId(doctor.id)}
                >
                  <span className="doctor-avatar">{doctor.initials}</span>

                  <span className="doctor-info">
                    <strong>{doctor.name}</strong>
                    <small>{doctor.department}</small>
                    <em>{doctor.description}</em>
                  </span>

                  <span className="doctor-select-indicator">
                    {isSelected && <Check size={14} />}
                  </span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleBooking}>
            <div className="panel-heading booking-subheading">
              <div>
                <h2>2. Select date and time</h2>
                <p>Available demo slots are shown below.</p>
              </div>
            </div>

            <div className="form-field date-field">
              <label htmlFor="appointment-date">Appointment date</label>
              <input
                id="appointment-date"
                type="date"
                value={date}
                min={today}
                onChange={(event) => {
                  setDate(event.target.value);
                  setError('');
                }}
                required
              />
            </div>

            <div className="form-field">
              <label>Available time slots</label>
            </div>

            <div className="time-slot-grid">
              {timeSlots.map((slot) => {
                const isSelected = time === slot;
                const buttonClass = isSelected
                  ? 'time-slot selected'
                  : 'time-slot';

                return (
                  <button
                    key={slot}
                    type="button"
                    className={buttonClass}
                    onClick={() => selectTimeSlot(slot)}
                  >
                    <Clock3 size={14} />
                    {slot}
                  </button>
                );
              })}
            </div>

            {error && <p className="form-error">{error}</p>}

            {message && (
              <p className="success-message">
                <Check size={15} />
                {message}
              </p>
            )}

            <button className="primary-button booking-submit" type="submit">
              <CalendarDays size={16} />
              Confirm appointment
            </button>
          </form>
        </section>

        <aside className="panel booking-summary">
          <div className="summary-top-icon">
            <Stethoscope size={23} />
          </div>
          <h3>Booking summary</h3>
          <p>Check your selection before confirming.</p>

          <div className="summary-item">
            <span>Doctor</span>
            <strong>{selectedDoctor.name}</strong>
          </div>
          <div className="summary-item">
            <span>Department</span>
            <strong>{selectedDoctor.department}</strong>
          </div>
          <div className="summary-item">
            <span>Date</span>
            <strong>{date || 'Not selected'}</strong>
          </div>
          <div className="summary-item">
            <span>Time</span>
            <strong>{time || 'Not selected'}</strong>
          </div>

          <div className="summary-reminder">
            Please arrive a little before your scheduled appointment. This is a
            sample booking interface for the project.
          </div>
        </aside>
      </div>

      <section className="panel content-panel appointment-history-panel">
        <div className="panel-heading">
          <div>
            <h2>My appointments</h2>
            <p>Your previous and upcoming bookings.</p>
          </div>
          <StatusBadge>{appointments.length} total</StatusBadge>
        </div>

        {appointments.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <strong>{appointment.doctor}</strong>
                      <small>{appointment.id}</small>
                    </td>
                    <td>{appointment.department}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <StatusBadge tone="green">
                        {appointment.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={CalendarDays}
            title="No bookings yet"
            description="Your confirmed appointments will appear in this section."
          />
        )}
      </section>
    </>
  );
}

