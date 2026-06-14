// import { useContext } from "react";
// import { AuthContex } from "./AuthContex";

// export const useAuth = () => {
//   const context = useContext(AuthContex);

//   if (!context) {
//     throw new Error("useAuth must be used inside Authprovider");
//   }

//   return context;
// };

import { useContext } from "react";
import { AuthContex } from "./AuthContex";

export const useAuth = () => {
  const context = useContext(AuthContex);

  if (!context) {
    throw new Error("useAuth must be used within Authprovider");
  }

  return context;
};