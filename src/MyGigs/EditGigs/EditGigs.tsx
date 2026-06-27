import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "@/UseAxios/axios";
import toast from "react-hot-toast";

type Category = {
  _id: string;
  name: string;
};

const EditGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    categoryId: "",
    price: "",
    deliveryDays: "",
    revisions: "",
  });

  const [tags, setTags] = useState("");
  const [features, setFeatures] = useState("");

  const [images, setImages] = useState<string[]>([]);

  // ---------------- Fetch Gig ----------------

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axiosInstance.get(`/gigs/${id}`);

        const gig = res.data.data;

        setForm({
          title: gig.title,
          shortDescription: gig.shortDescription,
          description: gig.description,
          categoryId: gig.categoryId,
          price: gig.price.toString(),
          deliveryDays: gig.deliveryDays.toString(),
          revisions: gig.revisions.toString(),
        });

        setTags(gig.tags.join(", "));
        setFeatures(gig.features.join(", "));
        setImages(gig.images);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  // ---------------- Fetch Categories ----------------

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.data);
    };

    fetchCategories();
  }, []);

  // ---------------- Handle Input ----------------

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

  // ---------------- Update ----------------

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...form,
        price: Number(form.price),
        deliveryDays: Number(form.deliveryDays),
        revisions: Number(form.revisions),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        features: features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        images,
      };

      await axiosInstance.put(
        `/gigs/update/${id}`,
        payload
      );

      toast.success("Gig Updated Successfully");

      navigate("/dashboard/myallgigs");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">

      <h1 className="text-3xl text-center text-indigo-600 font-bold mb-8">
        Edit Gig
      </h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-5"
      >

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
          placeholder="Gig Title"
        />

        <input
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >
          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-3 gap-3">

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            name="deliveryDays"
            value={form.deliveryDays}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            name="revisions"
            value={form.revisions}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

        </div>

        <input
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
          className="w-full border p-3 rounded-xl"
          placeholder="Tags"
        />

        <input
          value={features}
          onChange={(e) =>
            setFeatures(e.target.value)
          }
          className="w-full border p-3 rounded-xl"
          placeholder="Features"
        />

        {/* Existing Images */}

        <div className="grid grid-cols-3 gap-4">

          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className="rounded-xl h-40 object-cover w-full"
            />
          ))}

        </div>

        <button
          disabled={saving}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          {saving
            ? "Updating..."
            : "Update Gig"}
        </button>

      </form>
    </div>
  );
};

export default EditGig;