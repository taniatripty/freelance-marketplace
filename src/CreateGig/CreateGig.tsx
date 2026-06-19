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

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- IMAGE HANDLER ----------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
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
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return res.data.secure_url;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // upload images
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
        views: 0,
        orders: 0,
      };

      await axiosInstance.post("/gigs", payload);

      alert("Gig created successfully!");

      // reset
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

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Create Gig</h1>
          <p className="text-slate-500 mt-2">
            Publish your service and start getting clients
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INFO */}
          <div className="bg-white p-6 rounded-2xl border space-y-4">
            <h2 className="text-xl font-semibold">Basic Info</h2>

            <input
              name="title"
              placeholder="Gig Title"
              className={inputClass}
              onChange={handleChange}
              value={form.title}
            />

            <input
              name="shortDescription"
              placeholder="Short Description"
              className={inputClass}
              onChange={handleChange}
              value={form.shortDescription}
            />

            <textarea
              name="description"
              placeholder="Full Description"
              rows={6}
              className={inputClass}
              onChange={handleChange}
              value={form.description}
            />

            <select
              name="categoryId"
              className={inputClass}
              onChange={handleChange}
              value={form.categoryId}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* PRICING */}
          <div className="bg-white p-6 rounded-2xl border space-y-4">
            <h2 className="text-xl font-semibold">Pricing</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="price"
                type="number"
                placeholder="Price"
                className={inputClass}
                onChange={handleChange}
              />

              <input
                name="deliveryDays"
                type="number"
                placeholder="Delivery Days"
                className={inputClass}
                onChange={handleChange}
              />

              <input
                name="revisions"
                type="number"
                placeholder="Revisions"
                className={inputClass}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* TAGS & FEATURES */}
          <div className="bg-white p-6 rounded-2xl border space-y-4">
            <h2 className="text-xl font-semibold">Tags & Features</h2>

            <input
              placeholder="Tags (comma separated)"
              className={inputClass}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <input
              placeholder="Features (comma separated)"
              className={inputClass}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>

          {/* SELLER INFO */}
          <div className="bg-white p-6 rounded-2xl border space-y-4">
            <h2 className="text-xl font-semibold">Seller Info</h2>

            <input
              value={user?.displayName || ""}
              readOnly
              className="bg-slate-100 px-4 py-3 rounded-xl w-full"
            />

            <input
              value={user?.email || ""}
              readOnly
              className="bg-slate-100 px-4 py-3 rounded-xl w-full"
            />
          </div>

          {/* IMAGES */}
          <div className="bg-white p-6 rounded-2xl border space-y-4">
            <h2 className="text-xl font-semibold">Images</h2>

            <input type="file" multiple onChange={handleImageChange} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="h-28 w-full object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;