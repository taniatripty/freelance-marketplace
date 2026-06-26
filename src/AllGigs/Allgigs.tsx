import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { Link } from "react-router";

type Gig = {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  deliveryDays: number;
  rating: number;
  images: string[];
  name: string;
  email: string;
};

const AllGigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await axiosInstance.get("/gigs");
        setGigs(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading gigs...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-center">
            Explore Services
          </h1>

          <p className="text-center text-slate-500 mt-3">
            Find professional freelancers for your next project
          </p>
        </div>

        {/* Gig Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <img
                src={
                  gig.images?.[0] ||
                  "https://via.placeholder.com/400"
                }
                alt={gig.title}
                className="w-full h-52 object-cover"
              />

              {/* Content */}
              <div className="p-5">

                <h2 className="font-bold text-lg line-clamp-2">
                  {gig.title}
                </h2>

                <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                  {gig.shortDescription}
                </p>

                {/* Seller */}
                <div className="mt-4 border-t pt-3">
                  <p className="font-medium">
                    {gig.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {gig.email}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex justify-between mt-4 text-sm">
                  <span>
                    ⭐ {gig.rating || 0}
                  </span>

                  <span>
                    ⏱ {gig.deliveryDays} Days
                  </span>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center mt-5">

                  <div>
                    <p className="text-xs text-slate-400">
                      Starting at
                    </p>

                    <p className="text-xl font-bold text-green-600">
                      ${gig.price}
                    </p>
                  </div>

                  <Link
                    to={`/gigs/${gig._id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Details
                  </Link>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {gigs.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No gigs found
            </h2>

            <p className="text-slate-500 mt-2">
              Be the first freelancer to create a gig.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGigs;