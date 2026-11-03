# Experiment 07 – Completion checklist

| Experiment 07 task | Project implementation |
|---|---|
| Verify Node.js and npm | Run `node -v` and `npm -v` in the terminal. |
| Create a React application | This is a Vite + React application. |
| Run the application | Use `npm install`, then `npm run dev`. |
| Identify public and src folders | `index.html` is the entry HTML; the React source is in `src/`. Vite uses the root directory for public assets. |
| Modify App.js to display the selected case study | `src/App.jsx` configures the Urologist Healthcare pages and routes. |
| Create a reusable functional component | `src/components/PatientInfoCard.jsx`, `StatCard.jsx`, `StatusBadge.jsx`, and others. |
| Pass data using props | `PatientInfoCard` receives patient data; `StatCard` receives an icon, label, number and note. |
| Display information using JSX | The page and component files return JSX. |
| Add state using `useState()` | Forms, selected appointment/date/time, detail toggle and demo report action use React state. |
| Handle button clicks and form input | `onClick`, `onChange`, and `onSubmit` handlers are used throughout. |
| Apply CSS | `src/App.css` contains the page, component and responsive styles. |
| Run and test in the browser | Follow the demo workflow in `README.md`. |
| Capture screenshots | After running locally, capture the sign-in, dashboard, appointment and report pages for the practical write-up. |

## Note about the sample task

The experiment handout shows a Student Information example with an Increase Age button. It also instructs students to use their selected case study. This project adapts the same React concepts to the patient portal: patient data is passed as props, UI state is changed by interactions, and forms use event handlers. The reusable patient information card has a show/hide interaction implemented with `useState()`.
