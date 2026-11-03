const USERS_KEY = 'somaiya_users';
const SESSION_KEY = 'somaiya_session';
const APPOINTMENTS_KEY = 'somaiya_appointments';
const TESTS_KEY = 'somaiya_tests';

const demoUser = {
  id: 'PAT-001',
  name: 'Demo Patient',
  email: 'demo@somaiya.edu',
  password: 'patient123',
  phone: '9876543210',
  age: '20',
  gender: 'Prefer not to say',
  bloodGroup: 'O+'
};

export function initialiseDemoData() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
  }

  if (!localStorage.getItem(APPOINTMENTS_KEY)) {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([]));
  }

  if (!localStorage.getItem(TESTS_KEY)) {
    localStorage.setItem(TESTS_KEY, JSON.stringify([]));
  }
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getAppointments() {
  return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
}

export function saveAppointments(appointments) {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function getTests() {
  return JSON.parse(localStorage.getItem(TESTS_KEY) || '[]');
}

export function saveTests(tests) {
  localStorage.setItem(TESTS_KEY, JSON.stringify(tests));
}

export function makeId(prefix) {
  return `${prefix}-${Date.now().toString().slice(-6)}`;
}
