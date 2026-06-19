

import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------- FILE HANDLER (FIXED) ----------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    console.log("Selected file:", file);

    if (!file) {
      setIcon(null);
      return;
    }

    setIcon(file);
  };

  // ---------------- CLOUDINARY UPLOAD ----------------
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("Cloudinary response:", data);

    if (!data.secure_url) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.secure_url;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Category name is required");
    }

    if (!icon) {
      return alert("Please select an icon image");
    }

    try {
      setLoading(true);

      // upload image first
      const iconUrl = await uploadImage(icon);

      const categoryData = {
        name,
        icon: iconUrl,
      };

      const res = await axios.post(
        "http://localhost:5000/categories",
        categoryData
      );

      console.log("Backend response:", res.data);

      alert("Category added successfully");

      // reset form
      setName("");
      setIcon(null);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <input
          type="text"
          placeholder="Web Development"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {/* PREVIEW */}
        {icon && (
          <img
            src={URL.createObjectURL(icon)}
            alt="preview"
            className="w-20 h-20 object-cover rounded border"
          />
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;