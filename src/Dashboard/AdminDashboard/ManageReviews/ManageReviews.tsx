import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import {
  Search,
  Star,
 
  ImageOff,
} from "lucide-react";

type Review = {
  _id: string;

  rating: number;
  review: string;
  createdAt: string;

  buyerName: string;
  buyerEmail: string;
  buyerPhoto: string;

  sellerName: string;
  sellerEmail: string;
  sellerPhoto: string;

  gigTitle: string;
  gigImage: string;
  category: string;
};

const ManageReviews = () => {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews/admin");
      return res.data.data;
    },
  });

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        review.gigTitle.toLowerCase().includes(keyword) ||
        review.buyerName.toLowerCase().includes(keyword) ||
        review.sellerName.toLowerCase().includes(keyword);

      const matchRating =
        ratingFilter === "all"
          ? true
          : review.rating === Number(ratingFilter);

      return matchSearch && matchRating;
    });
  }, [reviews, search, ratingFilter]);

  const stats = useMemo(
    () => ({
      total: reviews.length,
      five: reviews.filter((r) => r.rating === 5).length,
      four: reviews.filter((r) => r.rating === 4).length,
      three: reviews.filter((r) => r.rating === 3).length,
      two: reviews.filter((r) => r.rating === 2).length,
      one: reviews.filter((r) => r.rating === 1).length,
    }),
    [reviews]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading Reviews...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Manage Reviews
        </h1>

        <p className="text-gray-500 mt-2">
          View and moderate all buyer reviews.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">

        <Stat title="Total" value={stats.total} />

        <Stat title="5★" value={stats.five} />

        <Stat title="4★" value={stats.four} />

        <Stat title="3★" value={stats.three} />

        <Stat title="2★" value={stats.two} />

        <Stat title="1★" value={stats.one} />

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4 justify-between">

        <div className="relative md:w-80">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            className="border rounded-xl pl-11 py-3 w-full"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={ratingFilter}
          onChange={(e) =>
            setRatingFilter(e.target.value)
          }
          className="border rounded-xl px-4"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Star</option>
          <option value="4">4 Star</option>
          <option value="3">3 Star</option>
          <option value="2">2 Star</option>
          <option value="1">1 Star</option>
        </select>

      </div>

      {/* Reviews */}

      <div className="grid lg:grid-cols-2 gap-6">

        {filteredReviews.map((review) => (

          <div
            key={review._id}
            className="rounded-2xl border bg-white shadow-sm overflow-hidden"
          >

            {/* Gig */}

            <div className="flex">

              {review.gigImage ? (

                <img
                  src={review.gigImage}
                  className="w-40 h-40 object-cover"
                />

              ) : (

                <div className="w-40 h-40 flex items-center justify-center bg-gray-100">
                  <ImageOff />
                </div>

              )}

              <div className="p-5 flex-1">

                <h2 className="font-bold text-lg">
                  {review.gigTitle}
                </h2>

                <p className="text-gray-500 text-sm">
                  {review.category}
                </p>

                <div className="flex items-center gap-1 mt-3">

                  {Array.from({
                    length: review.rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}

                </div>

                <p className="mt-4 text-gray-700 italic">
                  "{review.review}"
                </p>

              </div>

            </div>

            {/* Buyer */}

            <div className="border-t p-5 flex justify-between">

              <div className="flex gap-3">

                <img
                  src={review.buyerPhoto}
                  className="w-12 h-12 rounded-full"
                />

                <div>

                  <p className="font-semibold">
                    {review.buyerName}
                  </p>

                  <p className="text-xs text-gray-500">
                    Buyer
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <img
                  src={review.sellerPhoto}
                  className="w-12 h-12 rounded-full"
                />

                <div>

                  <p className="font-semibold">
                    {review.sellerName}
                  </p>

                  <p className="text-xs text-gray-500">
                    Seller
                  </p>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="border-t px-5 py-4 flex justify-between items-center">

              <span className="text-sm text-gray-500">
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </span>

              

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ManageReviews;

const Stat = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => (
  <div className="rounded-2xl border bg-white p-5 shadow-sm">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2 text-indigo-600">
      {value}
    </h2>
  </div>
);