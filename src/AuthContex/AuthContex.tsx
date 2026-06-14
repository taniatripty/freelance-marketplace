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

// export const AuthContex = createContext<AuthContextType | null>(
//   null
// );

import { createContext } from "react";

import type { User, UserCredential } from "firebase/auth";
import type { Dispatch, SetStateAction } from "react";

export interface UpdateUserData {
  displayName?: string;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;

  setUser: Dispatch<SetStateAction<User | null>>;
  setloading: Dispatch<SetStateAction<boolean>>;

  createuser: (
    email: string,
    password: string
  ) => Promise<UserCredential>;

  login: (
    email: string,
    password: string
  ) => Promise<UserCredential>;

  Googlelogin: () => Promise<UserCredential>;

  logOut: () => Promise<void>;

  upadeteuser: (
    updatadata: UpdateUserData
  ) => Promise<void>;
}

export const AuthContex = createContext<AuthContextType | null>(null);