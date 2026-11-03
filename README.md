# Urologist Healthcare – React Component-Based Application

A beginner-friendly React patient portal made for Experiment 07. The UI follows the urine test strip reader case study and demonstrates JSX, functional components, props, state, event handling, and CSS.

## Pages included

1. Sign In
2. Sign Up
3. Home / Dashboard
4. Patient Profile
5. Appointments
6. Medical History
7. Test Registration
8. Test Results

## Run the project

You need Node.js and npm installed.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (normally `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

## Demo login

- Email: `demo@somaiya.edu`
- Password: `patient123`

You can also create a new account from the Sign Up page.

## How this covers Experiment 07

| Experiment requirement | Where it is demonstrated |
|---|---|
| Create and run a React application | Vite project with `npm run dev` |
| JSX | All page and component files use JSX |
| Functional components | `Dashboard.jsx`, `Appointments.jsx`, `PatientInfoCard.jsx`, etc. |
| Reusable components | `StatCard`, `StatusBadge`, `PageHeader`, `EmptyState`, `PatientInfoCard` |
| Props | `PatientInfoCard` receives patient details; `StatCard` receives icon, label and value |
| State with `useState()` | Sign in/up forms, profile form, appointment selection, report simulation, patient detail toggle |
| Event handling | `onClick`, `onChange`, and `onSubmit` handlers throughout the application |
| CSS styling | `src/App.css` |
| Case-study integration | Patient-linked urine test registration, 120-second workflow description, 10 analyte report fields and clinical review note |

## Demo workflow

1. Sign in using the demo credentials.
2. From the dashboard, choose **Book an appointment** and save a date/time.
3. Choose **Register a test** and enter a sample ID.
4. On the report page, use **Simulate demo result** to populate illustrative readings.
5. Go to Test Results or Medical History to reopen the record.
6. Use **Print / Save as PDF** on the report to open the browser print dialog.

## Important limitations

- This is a front-end college demonstration. User accounts, appointments and test records are stored in the current browser's `localStorage`.
- It is not connected to a real hospital database, doctor scheduling service, Raspberry Pi camera, OpenCV pipeline or trained AI model.
- The result simulation uses example values for interface demonstration only. These are not real patient readings and must not be used for diagnosis or treatment.
- Real deployment would require secure server-side authentication, authorization, encrypted storage/transmission, validated device/model integration and clinician review.

