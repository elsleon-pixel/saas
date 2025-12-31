
import React, { createContext, useContext, useEffect, useState } from 'react';
// Fix: Suppress TS errors for modular Firebase imports and handle User type casting.
// @ts-ignore
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

interface AuthState {
  user: User | null;
  userData: any;
  loading: boolean;
  isSuperAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({ user: null, userData: null, loading: true, isSuperAdmin: false, logout: async () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const SUPER_ADMINS = ["YXrR8wSTzhOEizrmZIkQfu8ArOk2", "y2WKwptm1IZHDe5XAuV1epUF82B3"];

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser: any) => {
      const typedUser = currentUser as User | null;
      setUser(typedUser);
      if (typedUser) {
        return onSnapshot(doc(db, "users2", typedUser.uid), (snap) => {
          setUserData(snap.exists() ? snap.data() : { uid: typedUser.uid });
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const isSuperAdmin = !!user && SUPER_ADMINS.includes(user.uid);

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
