import { useState } from 'react';
import { ArrowRight, Clock3, FlaskConical, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { getTests, makeId, saveTests } from '../utils/storage';

export default function TestRegistration() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sampleId, setSampleId] = useState('');
  const [sampleType, setSampleType] = useState('Urine test strip');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!sampleId.trim()) return setError('Please enter a sample ID.');
    const tests = getTests();
    if (tests.some((item) => item.sampleId.toLowerCase() === sampleId.trim().toLowerCase())) {
      return setError('This sample ID is already in use. Please enter another one.');
    }
    const test = {
      id: makeId('TEST'), patientId: user.id, patientName: user.name,
      sampleId: sampleId.trim(), sampleType, testName: 'Urine analysis', notes: notes.trim(),
      status: 'Registered', createdAt: Date.now(), values: null
    };
    saveTests([...tests, test]);
    navigate(`/results/${test.id}`);
  }

  return (
    <>
      <PageHeader eyebrow="Laboratory" title="Register a new test" description="Create a patient-linked sample record before the device workflow begins." />
      <div className="test-registration-layout">
        <section className="panel registration-panel">
          <div className="panel-heading"><div><h2>Sample information</h2><p>Enter the details for the urine test strip.</p></div><span className="step-count">STEP 01</span></div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-grid two-col">
              <div className="form-field"><label>Patient name</label><input value={user.name} disabled /></div>
              <div className="form-field"><label>Patient ID</label><input value={user.id} disabled /></div>
              <div className="form-field"><label>Sample ID *</label><input value={sampleId} onChange={(e) => { setSampleId(e.target.value); setError(''); }} placeholder="Example: SMP-001" required /></div>
              <div className="form-field"><label>Test type</label><select value={sampleType} onChange={(e) => setSampleType(e.target.value)}><option>Urine test strip</option><option>Routine urinalysis</option></select></div>
              <div className="form-field full-field"><label>Notes (optional)</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="Add any sample-related notes" /></div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-actions"><button type="submit" className="primary-button">Register sample <ArrowRight size={16} /></button></div>
          </form>
        </section>
        <aside className="panel workflow-panel">
          <div className="workflow-icon"><FlaskConical size={24} /></div>
          <h3>What happens next?</h3>
          <div className="workflow-steps">
            <div className="workflow-step active"><span>1</span><div><strong>Sample registration</strong><small>Patient and sample details are saved.</small></div></div>
            <div className="workflow-step"><span>2</span><div><strong>Reaction period</strong><small>The case study describes a 120-second wait.</small></div></div>
            <div className="workflow-step"><span>3</span><div><strong>Image processing</strong><small>Camera capture and reagent-pad analysis.</small></div></div>
            <div className="workflow-step"><span>4</span><div><strong>Digital report</strong><small>Ten analyte values are linked to the patient.</small></div></div>
          </div>
          <div className="info-note"><Info size={16} /><span>This React demo simulates the workflow. It is not connected to the Raspberry Pi or an AI model.</span></div>
        </aside>
      </div>
      <div className="reaction-note"><Clock3 size={17} /><span><strong>Case study detail:</strong> the proposed reader waits 120 seconds after the strip is prepared before image capture.</span></div>
    </>
  );
}

