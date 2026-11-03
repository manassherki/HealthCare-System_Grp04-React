import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const portalSections = [
  {
    id: 'dashboard',
    title: 'Patient dashboard',
    description: 'A home view with appointment counts, test status, and links to the main patient tasks.'
  },
  {
    id: 'appointments',
    title: 'Appointments',
    description: 'A patient can select a doctor, date, and time and save an appointment in the browser.'
  },
  {
    id: 'test-records',
    title: 'Urine test records',
    description: 'A patient can register a sample and view its report status and demonstration readings.'
  }
];

export default function About() {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');

  function handleQuerySubmit(event) {
    event.preventDefault();

    const question = query.toLowerCase();

    if (question.includes('appointment') || question.includes('doctor') || question.includes('book')) {
      setReply('To book a visit in this demo, open Appointments, choose a doctor, then select a date and time. The booking is saved only in this browser.');
    } else if (question.includes('test') || question.includes('report') || question.includes('sample')) {
      setReply('To try the test workflow, open Register a test and enter a sample ID. Any readings shown in the report are examples, not medical results.');
    } else if (question.includes('map') || question.includes('location') || question.includes('address')) {
      setReply('The map above shows the K. J. Somaiya Hospital reference location in Sion, Mumbai. You can use the directions link to open it in Google Maps.');
    } else {
      setReply('Thanks for asking. This student demo cannot send your query to hospital staff. For a real enquiry, please use the phone number or email shown above.');
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="About the project"
        title="About Urologist Healthcare"
        description="A React single-page application for a patient portal case study."
      />

      <section className="panel content-panel about-project-panel">
        <div className="panel-heading">
          <div>
            <h2>What this application includes</h2>
            <p>These sections are generated from a JavaScript array using map().</p>
          </div>
        </div>

        <div className="about-feature-list">
          {portalSections.map((section) => (
            <article className="about-feature" key={section.id}>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel content-panel about-contact-panel">
        <div className="panel-heading">
          <div>
            <h2>Contact Us</h2>
            <p>Hospital contact details and location used as the reference for this project.</p>
          </div>
        </div>

        <div className="about-contact-layout">
          <div className="about-contact-details">
            <p className="about-contact-name">K. J. Somaiya Hospital and Research Centre</p>

            <div className="about-contact-item">
              <span>24-hour enquiries</span>
              <a href="tel:+912261124800">+91 22 6112 4800</a>
            </div>

            <div className="about-contact-item">
              <span>General hospital</span>
              <a href="tel:+912250954700">+91 22 5095 4700</a>
            </div>

            <div className="about-contact-item">
              <span>Email</span>
              <a href="mailto:admin.kjsh@somaiya.edu">admin.kjsh@somaiya.edu</a>
            </div>

            <div className="about-contact-item">
              <span>Address</span>
              <address>Somaiya Ayurvihar Complex, Eastern Express Highway, Sion, Mumbai - 400 022.</address>
            </div>

            <a
              className="small-outline-button about-directions-link"
              href="https://www.google.com/maps/search/?api=1&query=19.0473893%2C72.8721188"
              target="_blank"
              rel="noreferrer"
            >
              Open directions in Google Maps
            </a>
          </div>

          <div className="about-map-wrap">
            <iframe
              title="Map showing K. J. Somaiya Hospital in Sion, Mumbai"
              src="https://www.google.com/maps?q=19.0473893,72.8721188&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="about-query-section">
          <h3>Ask a question</h3>
          <p>Ask about appointments, the test demo, or finding the hospital.</p>

          <form className="about-query-form" onSubmit={handleQuerySubmit}>
            <div className="form-field about-query-field">
              <label htmlFor="about-query">Your question</label>
              <textarea
                id="about-query"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setReply('');
                }}
                placeholder="Type your question here"
                maxLength={500}
                rows={4}
                required
              />
            </div>

            <div className="about-query-actions">
              <button className="primary-button" type="submit">Get a reply</button>
            </div>
          </form>

          {reply && (
            <div className="about-query-reply" role="status" aria-live="polite">
              <strong>Reply</strong>
              <p>{reply}</p>
            </div>
          )}

        </div>
      </section>

      <p className="helper-text about-project-note">
        The contact information and map are for K. J. Somaiya Hospital, the reference location for this student project. The portal itself is a demonstration and is not connected to the hospital.
      </p>
    </>
  );
}
