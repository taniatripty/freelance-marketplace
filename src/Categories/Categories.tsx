
import axios from "axios";
import React, { useRef, useState } from "react";
import { FolderPlus, ImagePlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/UseAxios/axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---------------- FILE CHANGE ----------------
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setIcon(null);
      return;
    }

    setIcon(file);
  };

  // ---------------- CLOUDINARY ----------------
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );

    if (!response.data.secure_url) {
      throw new Error(
        response.data.error?.message || "Image upload failed"
      );
    }

    return response.data.secure_url;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    if (!icon) {
      return toast.error("Please select a category icon");
    }

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const iconUrl = await uploadImage(icon);

      // Protected Backend Route
      const res = await axiosInstance.post("/categories", {
        name,
        icon: iconUrl,
      });

      if (res.data.success) {
        toast.success(
          res.data.message || "Category created successfully!"
        );

        setName("");
        setIcon(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 401) {
        toast.error("Unauthorized! Please login.");
      } else if (error.response?.status === 403) {
        toast.error("Only admins can create categories.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to create category."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-800">
            <FolderPlus size={34} className="text-indigo-600" />
            Create Category
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new category for your freelance marketplace.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white shadow-lg border border-slate-200">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-8"
          >
            {/* Category Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category Name
              </label>

              <input
                type="text"
                placeholder="e.g. Web Development"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Upload */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Category Icon
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 transition hover:border-indigo-500 hover:bg-indigo-50">
                <ImagePlus
                  className="mb-4 text-indigo-600"
                  size={42}
                />

                <h3 className="font-semibold text-slate-700">
                  Click to upload an icon
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  PNG, JPG, JPEG, SVG
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview */}
            {icon && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 font-semibold text-slate-700">
                  Preview
                </h3>

                <div className="flex items-center gap-5">
                  <img
                    src={URL.createObjectURL(icon)}
                    alt="Preview"
                    className="h-24 w-24 rounded-xl border object-cover"
                  />

                  <div>
                    <p className="font-medium text-slate-800">
                      {icon.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {(icon.size / 1024).toFixed(2)} KB
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                      Ready to upload
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Creating Category...
                </>
              ) : (
                <>
                  <FolderPlus size={20} />
                  Create Category
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;