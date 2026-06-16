

// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate, Link } from "react-router";
// import axiosInstance from "@/UseAxios/axios";

// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] =
//     useState(false);

//   const loginMutation = useMutation({
//     mutationFn: async (payload: {
//       email: string;
//       password: string;
//     }) => {
//       const { data } = await axiosInstance.post(
//         "/auth/login",
//         payload
//       );

//       return data;
//     },
//   });

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return alert("Please fill all fields");
//     }

//     loginMutation.mutate(
//       {
//         email,
//         password,
//       },
//       {
//         onSuccess: (data) => {
//           console.log("Login Success", data);

//           // Future JWT Token
//           // localStorage.setItem("token", data.token);

//           setEmail("");
//           setPassword("");

//           alert("Login Successful");

//           navigate("/");
//         },

//         onError: (error: any) => {
//           console.log(error);

//           alert(
//             error?.response?.data?.message ||
//               "Login Failed"
//           );
//         },
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-center mb-2">
//           Welcome Back
//         </h2>

//         <p className="text-center text-gray-500 mb-6">
//           Login to your account
//         </p>

//         <form
//           onSubmit={handleLogin}
//           className="space-y-4"
//         >
//           {/* Email */}
//           <div>
//             <label className="block mb-2 text-sm font-medium">
//               Email
//             </label>

//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//               className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-2 text-sm font-medium">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={
//                   showPassword ? "text" : "password"
//                 }
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) =>
//                   setPassword(e.target.value)
//                 }
//                 className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(!showPassword)
//                 }
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//               >
//                 {showPassword ? (
//                   <EyeOff size={20} />
//                 ) : (
//                   <Eye size={20} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loginMutation.isPending}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loginMutation.isPending
//               ? "Signing In..."
//               : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center mt-6 text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-blue-600 font-medium"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, Googlelogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // =========================
  // EMAIL/PASSWORD LOGIN (Firebase + backend optional)
  // =========================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      // Firebase login
      const result = await login(email, password);

      // optional backend sync (recommended if you use MongoDB roles)
      const token = await result.user.getIdToken();

      await axiosInstance.post(
        "/auth/login",
        {
          email,
          uid: result.user.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmail("");
      setPassword("");

      alert("Login Successful");
      navigate("/");
    } catch (error: any) {
      alert(error?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result = await Googlelogin();

      await axiosInstance.post("/auth/register", {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        role: "client",
        
      });

      alert("Google Login Successful");
    } catch (error: any) {
      alert(error?.message || "Google Login Failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

       

        

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center gap-3 mt-4 mb-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

         {/* GOOGLE LOGIN (TOP or ABOVE FORM) */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition mb-4"
        >
          <Mail size={18} />
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;