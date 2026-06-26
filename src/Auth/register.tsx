

import React, { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import { Link } from "react-router-dom";
import axios from "axios";


const Register: React.FC = () => {
  const { createuser, upadeteuser, Googlelogin } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ---------------- UPLOAD IMAGE ----------------

  const uploadImage = async (): Promise<string> => {
  if (images.length === 0) return "";

  const formData = new FormData();

  formData.append("file", images[0]);

  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    formData
  );

  console.log("Cloudinary Response:", res.data);

  return res.data.secure_url;
};
 

  // ---------------- REGISTER ----------------

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return alert("All fields are required.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    if (password.length < 6) {
      return alert(
        "Password must be at least 6 characters."
      );
    }

  try {
  setLoading(true);

  // Upload image first
  const photoURL =await  uploadImage();

  console.log("Photo URL:", photoURL);

  // Firebase Register
  const result = await createuser(email, password);

  // Update Firebase Profile
  await upadeteuser({
    displayName: name,
    photoURL,
  });

  // Save into Database
  await axiosInstance.post("/auth/register", {
    uid: result.user.uid,
    name,
    email,
    role: "client",
    photoURL,
  });

  alert("Registration Successful");

  setName("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
  setImages([]);
}
catch (error: any) {
  console.error(error);
  alert(error.response?.data?.message || error.message);
}
finally {
  setLoading(false);
}
  };

  // ---------------- GOOGLE LOGIN ----------------

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const result = await Googlelogin();

      await axiosInstance.post("/auth/register", {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        role: "client",
        photoURL: result.user.photoURL,
      });

      alert("Google Login Successful");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join FreelanceHub today
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          {/* Name */}

          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              className="w-full border rounded-lg mt-1 p-3"
              placeholder="John Doe"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          {/* Email */}

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full border rounded-lg mt-1 p-3"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          {/* Profile Image */}

         {/* Profile Image */}

<div>
  <label className="text-sm font-medium">
    Profile Image
  </label>

  <input
    type="file"
    accept="image/*"
    className="w-full border rounded-lg mt-1 p-3"
    onChange={(e) => {
      const files = Array.from(e.target.files || []);
      setImages(files);
    }}
  />
</div>

          {/* Password */}

          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="w-full border rounded-lg p-3"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative mt-1">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="w-full border rounded-lg p-3"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-3"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Register */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>

          <span className="text-gray-400 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google */}

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <Mail size={18} />

          {googleLoading
            ? "Signing In..."
            : "Continue with Google"}
        </button>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;