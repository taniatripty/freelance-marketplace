


import axiosInstance from "@/UseAxios/axios";
import useCurrentUser from "@/hooks/UserRoles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export interface CurrentUser {
  uid: string;
  name: string;
  email: string;
  role: string;
  photoURL: string;
  phone?: string;
  country?: string;
  city?: string;
  bio?: string;
  createdAt?: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: currentUser, refetch } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: currentUser?.name ?? "",
    phone: currentUser?.phone ?? "",
    country: currentUser?.country ?? "",
    city: currentUser?.city ?? "",
    bio: currentUser?.bio ?? "",
  });

  const uploadImage = async () => {
    if (!image) return currentUser?.photoURL || "";

    const formData = new FormData();
    formData.append("file", image);
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

    return res.data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const photoURL = await uploadImage();

      const payload = {
        name: form.name,
        phone: form.phone,
        country: form.country,
        city: form.city,
        bio: form.bio,
        photoURL,
      };

      await axiosInstance.patch(`/auth/users/${currentUser.uid}`, payload);
      await refetch();

      toast.success("Profile Updated");
      navigate("/dashboard/profile");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div key={currentUser.uid} className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow border p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : currentUser.photoURL || "https://i.pravatar.cc/300"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            readOnly
            value={currentUser.email}
            className="w-full border rounded-xl p-3 bg-gray-100"
          />

          <input
            readOnly
            value={currentUser.role}
            className="w-full border rounded-xl p-3 bg-gray-100 capitalize"
          />

          

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border rounded-xl p-3"
              placeholder="Country"
              value={form.country}
              onChange={(e) =>
                setForm({
                  ...form,
                  country: e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }

              
            />
            <input
            className="w-full border rounded-xl p-3"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />
          </div>

          <textarea
            rows={6}
            className="w-full border rounded-xl p-3"
            placeholder="Bio"
            value={form.bio}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;