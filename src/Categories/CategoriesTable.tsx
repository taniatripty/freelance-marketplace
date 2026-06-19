import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";

type Category = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

const CategoriesTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/categories");

        setCategories(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center text-indigo-600 font-bold mb-4">
        All Categories
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Icon</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-t">
                <td className="p-3">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>

                <td className="p-3 font-medium">
                  {cat.name}
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesTable;