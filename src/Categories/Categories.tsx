// import axios from "axios";
// import React, { useState } from "react";

// const AddCategory = () => {
//   const [name, setName] = useState("");
//   const [icon, setIcon] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   // ---------------- FILE HANDLER (FIXED) ----------------
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     console.log("Selected file:", file);

//     if (!file) {
//       setIcon(null);
//       return;
//     }

//     setIcon(file);
//   };

//   // ---------------- CLOUDINARY UPLOAD ----------------
//   const uploadImage = async (file: File) => {
//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append(
//       "upload_preset",
//       import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
//     );

//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${
//         import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
//       }/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       },
//     );

//     const data = await response.json();

//     console.log("Cloudinary response:", data);

//     if (!data.secure_url) {
//       throw new Error(data.error?.message || "Image upload failed");
//     }

//     return data.secure_url;
//   };

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       return alert("Category name is required");
//     }

//     if (!icon) {
//       return alert("Please select an icon image");
//     }

//     try {
//       setLoading(true);

//       // upload image first
//       const iconUrl = await uploadImage(icon);

//       const categoryData = {
//         name,
//         icon: iconUrl,
//       };

//       const res = await axios.post(
//         "http://localhost:5000/categories",
//         categoryData,
//       );

//       console.log("Backend response:", res.data);

//       alert("Category added successfully");

//       // reset form
//       setName("");
//       setIcon(null);
//     } catch (error: any) {
//       console.error("Error:", error);
//       alert(error?.message || "Failed to add category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6">Add Category</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* NAME */}
//         <input
//           type="text"
//           placeholder="Web Development"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//         />

//         {/* FILE INPUT */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full"
//         />

//         {/* PREVIEW */}
//         {icon && (
//           <img
//             src={URL.createObjectURL(icon)}
//             alt="preview"
//             className="w-20 h-20 object-cover rounded border"
//           />
//         )}

//         {/* SUBMIT BUTTON */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           {loading ? "Uploading..." : "Add Category"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;


import axios from "axios";
import React, { useState } from "react";
import { FolderPlus, ImagePlus, Loader2 } from "lucide-react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

    if (!data.secure_url) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.secure_url;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Category name is required");
    }

    if (!icon) {
      return alert("Please select an icon");
    }

    try {
      setLoading(true);

      const iconUrl = await uploadImage(icon);

      await axios.post("http://localhost:5000/categories", {
        name,
        icon: iconUrl,
      });

      alert("Category Added Successfully!");

      setName("");
      setIcon(null);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-800">
            <FolderPlus className="text-indigo-600" size={34} />
            Create New Category
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new service category for freelancers and clients.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-8"
          >
            {/* Category Name */}
            <div>
              <label className="mb-2 block font-semibold text-slate-700">
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
              <label className="mb-3 block font-semibold text-slate-700">
                Category Icon
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-indigo-500 hover:bg-indigo-50">

                <ImagePlus
                  size={40}
                  className="mb-3 text-indigo-600"
                />

                <p className="font-medium text-slate-700">
                  Click to upload an icon
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  PNG, JPG, SVG
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview */}
            {icon && (
              <div className="rounded-xl border bg-slate-50 p-5">

                <p className="mb-4 font-semibold text-slate-700">
                  Preview
                </p>

                <div className="flex items-center gap-4">

                  <img
                    src={URL.createObjectURL(icon)}
                    alt="preview"
                    className="h-24 w-24 rounded-xl border object-cover"
                  />

                  <div>
                    <p className="font-medium">
                      {icon.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {(icon.size / 1024).toFixed(2)} KB
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
                    className="animate-spin"
                    size={20}
                  />
                  Uploading...
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