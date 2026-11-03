import { createContext, useContext, useState } from 'react';
import {
  clearSession,
  getSession,
  getUsers,
  saveSession,
  saveUsers
} from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  function signIn(email, password) {
    const foundUser = getUsers().find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );

    if (!foundUser) {
      return { success: false, message: 'Email or password is incorrect.' };
    }

    const safeUser = { ...foundUser };
    delete safeUser.password;
    setUser(safeUser);
    saveSession(safeUser);
    return { success: true };
  }

  function signUp(formData) {
    const users = getUsers();
    const alreadyExists = users.some(
      (item) => item.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (alreadyExists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      ...formData,
      id: `PAT-${String(users.length + 1).padStart(3, '0')}`
    };
    saveUsers([...users, newUser]);

    const safeUser = { ...newUser };
    delete safeUser.password;
    setUser(safeUser);
    saveSession(safeUser);
    return { success: true };
  }

  function updateProfile(updatedDetails) {
    const updatedUser = { ...user, ...updatedDetails };
    setUser(updatedUser);
    saveSession(updatedUser);

    const users = getUsers().map((item) =>
      item.id === updatedUser.id ? { ...item, ...updatedDetails } : item
    );
    saveUsers(users);
  }

  function signOut() {
    clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
