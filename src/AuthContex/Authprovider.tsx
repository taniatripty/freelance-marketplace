// import { createContext } from "react";

// import type { User, UserCredential } from "firebase/auth";
// import type { Dispatch, SetStateAction } from "react";

// export interface UpdateUserData {
//   displayName?: string;
//   photoURL?: string;
// }

// export interface AuthContextType {
//   user: User | null;
//   loading: boolean;

//   setUser: Dispatch<SetStateAction<User | null>>;
//   setloading: Dispatch<SetStateAction<boolean>>;

//   createuser: (
//     email: string,
//     password: string
//   ) => Promise<UserCredential>;

//   login: (
//     email: string,
//     password: string
//   ) => Promise<UserCredential>;

//   Googlelogin: () => Promise<UserCredential>;

//   logOut: () => Promise<void>;

//   upadeteuser: (
//     updatadata: UpdateUserData
//   ) => Promise<void>;
// }
// // 
// export const AuthContex = createContext<AuthContextType | null>(
//   null
// );

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import type { User } from "firebase/auth";

import { auth } from "../../firebase.init";
import {
  AuthContex,
  type AuthContextType,
  type UpdateUserData,
} from "./AuthContex";

interface AuthProviderProps {
  children: ReactNode;
}

const provider = new GoogleAuthProvider();

const Authprovider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState<boolean>(true);

  const createuser = (email: string, password: string) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const Googlelogin = () => {
    setloading(true);
    return signInWithPopup(auth, provider);
  };

  const login = (email: string, password: string) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const upadeteuser = (updatadata: UpdateUserData) => {
    if (!auth.currentUser) {
      return Promise.reject(new Error("No authenticated user"));
    }

    return updateProfile(auth.currentUser, updatadata);
  };

  const logOut = () => {
    setloading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
    });

    return () => unsubscribe();
  }, []);

  const userinfo: AuthContextType = {
    user,
    setUser,
    loading,
    setloading,
    createuser,
    login,
    Googlelogin,
    logOut,
    upadeteuser,
  };

  return (
    <AuthContex.Provider value={userinfo}>
      {children}
    </AuthContex.Provider>
  );
};

export default Authprovider;