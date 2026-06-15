

// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
// import axiosInstance from "@/UseAxios/axios";


// const Register: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
  

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // -----------------------------
//   // TANSTACK QUERY MUTATION
//   // -----------------------------
//   const registerMutation = useMutation({
//     mutationFn: async (formData: FormData) => {
//       const { data } = await axiosInstance.post(
//         "/api/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return data;
//     },
//   });

//   // -----------------------------
//   // HANDLE IMAGE
//   // -----------------------------
//   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && e.target.files[0]) {
//   //     setImage(e.target.files[0]);
//   //   }
//   // };

//   // -----------------------------
//   // HANDLE REGISTER
//   // -----------------------------
//   const handleRegister = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("password", password);

//     // if (image) {
//     //   formData.append("image", image);
//     // }

//     registerMutation.mutate(formData, {
//       onSuccess: (data) => {
//         console.log("Registered:", data);
//         alert("Account created successfully!");
//       },
//       onError: (error) => {
//         console.log(error);
//         alert("Registration failed!");
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-semibold text-gray-900">
//             Create Account
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Join the freelance marketplace
//           </p>
//         </div>

//         <form onSubmit={handleRegister} className="space-y-4">

//           {/* PROFILE IMAGE */}
//           {/* <div className="flex flex-col items-center gap-2">
//             <div className="w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
//               {image ? (
//                 <img
//                   src={URL.createObjectURL(image)}
//                   alt="profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <User className="text-gray-400" />
//               )}
//             </div>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="text-sm"
//             />
//           </div> */}

//           {/* NAME */}
//           <input
//             type="text"
//             placeholder="Your name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           {/* EMAIL */}
//           <input
//             type="email"
//             placeholder="you@example.com"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           {/* PASSWORD */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2 text-gray-500"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowConfirmPassword(!showConfirmPassword)
//               }
//               className="absolute right-3 top-2 text-gray-500"
//             >
//               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={registerMutation.isPending}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
//           >
//             {registerMutation.isPending
//               ? "Creating account..."
//               : "Create account"}
//           </button>
//         </form>

//         {/* FOOTER */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Already have an account?{" "}
//           <span className="text-blue-600 font-medium cursor-pointer">
//             Sign in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // -----------------------------
  // MUTATION (JSON REQUEST)
  // -----------------------------
  const registerMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await axiosInstance.post(
        "/auth/register",
        payload
      );
      return data;
    },
  });

  // -----------------------------
  // HANDLE REGISTER
  // -----------------------------
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          alert("Account created successfully!");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        },
        onError: (error: any) => {
          console.log(error);
          alert(
            error?.response?.data?.message ||
              "Registration failed!"
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join the freelance marketplace
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-2 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;