import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  FlaskConical,
  Info,
  Printer,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { getTests, saveTests } from '../utils/storage';

const demoValues = [
  { name: 'Glucose', value: '100 mg/dL' },
  { name: 'Protein', value: '30 mg/dL' },
  { name: 'pH', value: '6.0' },
  { name: 'Ketones', value: 'Demo reading' },
  { name: 'Blood', value: 'Demo reading' },
  { name: 'Bilirubin', value: 'Demo reading' },
  { name: 'Urobilinogen', value: 'Demo reading' },
  { name: 'Nitrite', value: 'Demo reading' },
  { name: 'Leucocytes', value: 'Demo reading' },
  { name: 'Specific gravity', value: 'Demo reading' }
];

export default function TestResults() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tests, setTests] = useState(() => getTests());

  const test = tests.find((item) => {
    return item.patientId === user.id && (!id || item.id === id);
  });

  const allTests = tests
    .filter((item) => item.patientId === user.id)
    .sort((first, second) => second.createdAt - first.createdAt);

  function simulateResult(testId) {
    const updatedTests = tests.map((testItem) => {
      if (testItem.id === testId) {
        return {
          ...testItem,
          status: 'Ready for review',
          values: demoValues,
          completedAt: Date.now()
        };
      }

      return testItem;
    });

    saveTests(updatedTests);
    setTests(updatedTests);
  }

  function printReport() {
    window.print();
  }

  function showAllReports() {
    navigate('/results');
  }

  if (!id) {
    return (
      <>
        <PageHeader
          eyebrow="Your lab records"
          title="Test results"
          description="Open your registered urine test records and generated reports."
        />

        <section className="panel content-panel">
          {allTests.length > 0 ? (
            <div className="test-record-list">
              {allTests.map((item) => (
                <div className="test-record-row" key={item.id}>
                  <div className="report-icon">
                    <FileText size={20} />
                  </div>

                  <div className="preview-copy">
                    <strong>{item.testName}</strong>
                    <span>{item.sampleId} · {item.id}</span>
                    <small>
                      {new Date(item.createdAt).toLocaleString('en-IN')}
                    </small>
                  </div>

                  <StatusBadge
                    tone={item.status === 'Ready for review' ? 'green' : 'amber'}
                  >
                    {item.status}
                  </StatusBadge>

                  <Link
                    className="small-outline-button"
                    to={`/results/${item.id}`}
                  >
                    Open report
                    <ArrowLeft size={14} className="arrow-right-rotate" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FlaskConical}
              title="No test records found"
              description="Register a sample to create your first patient-linked test record."
              action={(
                <Link to="/tests/new" className="small-outline-button">
                  Register a test
                </Link>
              )}
            />
          )}
        </section>
      </>
    );
  }

  if (!test) {
    return (
      <EmptyState
        icon={FileText}
        title="Report not found"
        description="This test record may not exist or may belong to another patient."
        action={(
          <Link to="/results" className="small-outline-button">
            Back to test results
          </Link>
        )}
      />
    );
  }

  const isReady = test.status === 'Ready for review';

  return (
    <>
      <div className="report-page-header no-print">
        <PageHeader
          eyebrow="Laboratory report"
          title="Urine test report"
          description="A patient-linked digital record for your urine test."
          action={(
            <button className="secondary-button" onClick={showAllReports}>
              <ArrowLeft size={15} />
              All reports
            </button>
          )}
        />
      </div>

      <section className="panel report-panel">
        <div className="report-topline">
          <div className="report-heading-mark">
            <div className="report-icon">
              <FlaskConical size={22} />
            </div>
            <div>
              <h2>Urine analysis</h2>
              <p>Urologist Healthcare · Patient report</p>
            </div>
          </div>

          <StatusBadge tone={isReady ? 'green' : 'amber'}>
            {test.status}
          </StatusBadge>
        </div>

        <div className="report-meta-grid">
          <div>
            <span>Patient name</span>
            <strong>{test.patientName}</strong>
          </div>
          <div>
            <span>Patient ID</span>
            <strong>{test.patientId}</strong>
          </div>
          <div>
            <span>Sample ID</span>
            <strong>{test.sampleId}</strong>
          </div>
          <div>
            <span>Registered on</span>
            <strong>{new Date(test.createdAt).toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span>Test type</span>
            <strong>{test.sampleType}</strong>
          </div>
          <div>
            <span>Report ID</span>
            <strong>{test.id}</strong>
          </div>
        </div>

        <div className="report-section-heading">
          <div>
            <h3>Test parameters</h3>
            <p>Ten parameters included in the urine test strip reader use case.</p>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table result-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Result</th>
                <th>Review status</th>
              </tr>
            </thead>
            <tbody>
              {demoValues.map((item) => (
                <tr key={item.name}>
                  <td><strong>{item.name}</strong></td>
                  <td>{isReady ? item.value : 'Not available yet'}</td>
                  <td>
                    {isReady ? (
                      <StatusBadge tone="blue">For clinician review</StatusBadge>
                    ) : (
                      <StatusBadge tone="neutral">Pending</StatusBadge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isReady ? (
          <div className="clinical-review-box">
            <div className="review-icon"><Info size={18} /></div>
            <div>
              <strong>Clinical review required</strong>
              <p>
                These are illustrative demo values, not actual device readings.
                A qualified clinician or pathologist must review real results
                before any clinical decision.
              </p>
            </div>
          </div>
        ) : (
          <div className="pending-box">
            <div className="pending-icon"><RefreshCw size={18} /></div>
            <div>
              <strong>Waiting for device output</strong>
              <p>
                In the actual system, the Raspberry Pi reader captures the strip
                after the reaction period and sends the processed readings to the
                patient database.
              </p>
            </div>
          </div>
        )}

        <div className="report-actions no-print">
          {!isReady && (
            <button
              className="primary-button"
              onClick={() => simulateResult(test.id)}
            >
              <CheckCircle2 size={16} />
              Simulate demo result
            </button>
          )}

          {isReady && (
            <button className="primary-button" onClick={printReport}>
              <Printer size={16} />
              Print / Save as PDF
            </button>
          )}

          <Link to="/tests/new" className="secondary-button">
            <FlaskConical size={16} />
            Register another test
          </Link>
        </div>

        <p className="report-footnote">
          Demonstration report only · Not for medical diagnosis or treatment.
        </p>
      </section>
    </>
  );
}


