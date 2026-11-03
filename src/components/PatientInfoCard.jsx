import { useState } from 'react';
import { ChevronDown, ChevronUp, UserRound } from 'lucide-react';

// A reusable component: the parent sends patient information through props.
export default function PatientInfoCard({ name, patientId, email, phone, age, bloodGroup }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="panel patient-info-card">
      <div className="patient-card-top">
        <div className="avatar avatar-large"><UserRound size={25} /></div>
        <div className="patient-card-main">
          <h3>{name}</h3>
          <p>{patientId}</p>
        </div>
        <button className="icon-button" onClick={() => setShowDetails(!showDetails)} aria-label="Toggle patient details">
          {showDetails ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
        </button>
      </div>
      {showDetails && (
        <div className="patient-extra-details">
          <div><span>Email</span><strong>{email || 'Not added'}</strong></div>
          <div><span>Phone</span><strong>{phone || 'Not added'}</strong></div>
          <div><span>Age</span><strong>{age || 'Not added'}</strong></div>
          <div><span>Blood group</span><strong>{bloodGroup || 'Not added'}</strong></div>
        </div>
      )}
      <p className="helper-text">Select the arrow to view patient details.</p>
    </section>
  );
}
