# HealthCare-System_Grp04-React

## Urologist Healthcare – React Component-Based Application

A beginner-friendly React patient portal made for Experiment 07. The website follows the urine test strip reader case study and demonstrates JSX, functional components, props, state, event handling, routing, and CSS.

## Pages included

1. Sign In
2. Sign Up
3. Dashboard
4. Patient Profile
5. Appointments
6. Medical History
7. Test Registration
8. Test Results
9. About and Contact

## Run the project

Install Node.js and npm, then run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, normally `http://localhost:5173`.

To create a production build, run:

```bash
npm run build
```

## Demo login

- Email: `demo@somaiya.edu`
- Password: `patient123`

You can also create an account from the Sign Up page.

## Experiment 07 concepts shown

| Concept | Where it appears |
|---|---|
| React application | Vite project started with `npm run dev` |
| JSX | Page and component files |
| Functional components | Dashboard, Appointments, PatientInfoCard, and other files |
| Reusable components | StatCard, StatusBadge, PageHeader, EmptyState, and PatientInfoCard |
| Props | Patient and statistic information passed to reusable components |
| State with `useState()` | Forms, appointment selection, report status, and expandable patient details |
| Event handling | Form submission, typing, and button clicks |
| CSS | `src/App.css` |
| Case study | Patient-linked test registration and a sample report with ten parameters |

## Demo workflow

1. Sign in with the demo account or create an account.
2. Book an appointment by selecting a doctor, date, and time.
3. Register a test with a sample ID.
4. Use **Simulate demo result** to display example readings.
5. Reopen records from Test Results or Medical History.
6. Use **Print / Save as PDF** on a report to open the browser print dialog.
