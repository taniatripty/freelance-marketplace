
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import {
  Search,
  Star,
  ImageOff,
  MessageSquareText,

  Clock3,
  BadgeCheck,
} from "lucide-react";

type Review = {
  _id: string;
  rating: number;
  comment: string;
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
      return Array.isArray(res.data.data) ? res.data.data : [];
    },
  });

  const filteredReviews = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchSearch =
        review.gigTitle?.toLowerCase().includes(keyword) ||
        review.buyerName?.toLowerCase().includes(keyword) ||
        review.sellerName?.toLowerCase().includes(keyword) ||
        review.comment?.toLowerCase().includes(keyword);

      const matchRating =
        ratingFilter === "all" ? true : review.rating === Number(ratingFilter);

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
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Loading Reviews...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Manage Reviews</h1>
        <p className="mt-2 text-slate-500">
          View and moderate all buyer feedback in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <Stat title="Total" value={stats.total} color="text-indigo-600" />
        <Stat title="5★" value={stats.five} color="text-emerald-600" />
        <Stat title="4★" value={stats.four} color="text-blue-600" />
        <Stat title="3★" value={stats.three} color="text-amber-600" />
        <Stat title="2★" value={stats.two} color="text-orange-600" />
        <Stat title="1★" value={stats.one} color="text-rose-600" />
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
              placeholder="Search by gig, buyer, seller, or comment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white md:w-48"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Star</option>
            <option value="4">4 Star</option>
            <option value="3">3 Star</option>
            <option value="2">2 Star</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {filteredReviews.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-56">
                  {review.gigImage ? (
                    <img
                      src={review.gigImage}
                      alt={review.gigTitle}
                      className="h-60 w-full object-cover sm:h-full"
                    />
                  ) : (
                    <div className="flex h-60 w-full items-center justify-center bg-slate-100 text-slate-400 sm:h-full">
                      <ImageOff size={28} />
                    </div>
                  )}

                  
                </div>

                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {review.gigTitle}
                      </h2>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <Clock3 size={14} />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-amber-50 px-3 py-2 text-amber-700">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "fill-amber-500 text-amber-500"
                                : "text-amber-200"
                            }
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-center text-xs font-semibold">
                        {review.rating}.0 / 5
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <PersonInfo
                      title="Buyer"
                      name={review.buyerName}
                      email={review.buyerEmail}
                      photo={review.buyerPhoto}
                    />
                    <PersonInfo
                      title="Seller"
                      name={review.sellerName || "Unknown Seller"}
                      email={review.sellerEmail || "No email"}
                      photo={review.sellerPhoto
                      }
                    />
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <MessageSquareText size={16} className="text-indigo-600" />
                      Comment
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                      {review.comment}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <BadgeCheck size={16} className="text-emerald-600" />
                      Verified review
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Star className="h-8 w-8" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            No Reviews Found
          </h3>
          <p className="mt-2 text-slate-500">
            Try changing the search term or rating filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;

const Stat = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-slate-500">{title}</p>
    <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
  </div>
);

const PersonInfo = ({
  title,
  name,
  email,
  photo,
}: {
  title: string;
  name: string;
  email: string;
  photo?: string;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {title}
    </p>
    <div className="flex items-center gap-3">
      <img
        src={photo || "https://via.placeholder.com/48"}
        alt={name}
        className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100"
      />
      <div className="min-w-0">
        <p className="truncate font-semibold text-slate-900">{name || "Unknown"}</p>
        <p className="truncate text-sm text-slate-500">{email || "No email"}</p>
      </div>
    </div>
  </div>
);