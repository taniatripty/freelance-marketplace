import { useAuth } from "@/AuthContex/UseAuth";
import axiosInstance from "@/UseAxios/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type Gig = {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  deliveryDays: number;
  status: string;
  rating: number;
  totalSales: number;
  totalReviews: number;
  images: string[];
  createdAt: string;
};

const MyGigs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await axiosInstance.get(`/gigs/my/${user?.uid}`);

        setGigs(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchMyGigs();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gig?\n\nExisting orders will not be affected, but new buyers won't be able to purchase this gig.",
    );

    if (!confirmDelete) return;

    try {
      const res = await axiosInstance.delete(`/gigs/delete/${id}`);

      if (res.data.success) {
        setGigs((prev) =>
          prev.map((gig) =>
            gig._id === id
              ? {
                  ...gig,
                  status: "deleted",
                }
              : gig,
          ),
        );

        toast.success("Gig deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete gig.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading gigs...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-indigo-600 font-bold">My Gigs</h1>

        <button
          onClick={() => navigate("/dashboard/createGig")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          Add New Gig
        </button>
      </div>

      {gigs.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center">
          No gigs found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border"
            >
              <img
                src={gig.images?.[0]}
                alt={gig.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h2 className="font-bold text-lg line-clamp-1">{gig.title}</h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {gig.shortDescription}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-semibold">${gig.price}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Delivery</p>
                    <p className="font-semibold">{gig.deliveryDays} Days</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Rating</p>
                    <p className="font-semibold">
                      ⭐ {gig.rating?.toFixed(1) || 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Reviews</p>
                    <p className="font-semibold">{gig.totalReviews || 0}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Sales</p>
                    <p className="font-semibold">{gig.totalSales || 0}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Status</p>

                    {/* <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        gig.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {gig.status}
                    </span> */}

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        gig.status === "active"
                          ? "bg-green-100 text-green-700"
                          : gig.status === "deleted"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {gig.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => navigate(`/dashboard/gig/${gig._id}`)}
                    className="flex-1 border rounded-lg py-2"
                  >
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/dashboard/edit-gig/${gig._id}`)}
                    className="flex-1 bg-blue-600 text-white rounded-lg py-2"
                  >
                    Edit
                  </button>

                  <button
                    disabled={gig.status === "deleted"}
                    onClick={() => handleDelete(gig._id)}
                    className="flex-1 bg-red-600 text-white rounded-lg py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {gig.status === "deleted" ? "Deleted" : "Delete"}
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Created: {new Date(gig.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGigs;
