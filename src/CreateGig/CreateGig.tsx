


import React, { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import axios from "axios";
import { useAuth } from "@/AuthContex/UseAuth";

type Category = {
  _id: string;
  name: string;
};

const CreateGig = () => {
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState("");
  const [features, setFeatures] = useState("");

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    categoryId: "",
    price: "",
    deliveryDays: "",
    revisions: "",
  });

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- IMAGE HANDLER (MAX 3) ----------------
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);

  setImages((prev) => {
    const combined = [...prev, ...files];
    return combined.slice(0, 3);
  });

  e.target.value = "";
};

  // ---------------- REMOVE IMAGE ----------------
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- CLOUDINARY UPLOAD ----------------
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
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

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length < 2) {
      alert("Please upload at least 2 images");
      return;
    }

    try {
      setLoading(true);

      const uploadedImages = await Promise.all(
        images.map((img) => uploadImage(img))
      );

      const payload = {
        sellerId: user?.uid,
        name: user?.displayName,
        email: user?.email,

        title: form.title,
        shortDescription: form.shortDescription,
        description: form.description,
        categoryId: form.categoryId,

        price: Number(form.price),
        deliveryDays: Number(form.deliveryDays),
        revisions: Number(form.revisions),

        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        features: features.split(",").map((f) => f.trim()).filter(Boolean),

        images: uploadedImages,

        status: "active",
        rating: 0,
        totalSales: 0,
      };

      await axiosInstance.post("/gigs", payload);

      alert("Gig created successfully!");

      // reset form
      setForm({
        title: "",
        shortDescription: "",
        description: "",
        categoryId: "",
        price: "",
        deliveryDays: "",
        revisions: "",
      });

      setImages([]);
      setTags("");
      setFeatures("");
    } catch (error) {
      console.error(error);
      alert("Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4">

        <h1 className="text-4xl text-center font-bold text-indigo-600 mb-8">
          Create Gig
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <input
            name="title"
            placeholder="Gig Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          {/* SHORT DESCRIPTION */}
          <input
            name="shortDescription"
            placeholder="Short Description"
            value={form.shortDescription}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Full Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
            rows={5}
          />

          {/* CATEGORY */}
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* PRICE + DELIVERY + REVISIONS */}
          <div className="grid grid-cols-3 gap-3">
            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="deliveryDays"
              type="number"
              placeholder="Delivery Days"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="revisions"
              type="number"
              placeholder="Revisions"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />
          </div>

          {/* TAGS */}
          <input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          {/* FEATURES */}
          <input
            placeholder="Features (comma separated)"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          {/* SELLER INFO */}
          <input
            value={user?.displayName || ""}
            readOnly
            className="w-full p-3 bg-gray-100 rounded-xl"
          />
          <input
            value={user?.email || ""}
            readOnly
            className="w-full p-3 bg-gray-100 rounded-xl"
          />

          {/* IMAGES */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="grid grid-cols-3 gap-3 mt-3">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  className="h-28 w-full object-cover rounded"
                />

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl"
          >
            {loading ? "Creating..." : "Create Gig"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateGig;