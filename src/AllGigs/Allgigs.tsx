

import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { Link } from "react-router";
import { Search, Filter, RotateCcw, Sparkles, Star, Clock3, Tag } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchGigs = async (params = {}) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/gigs", { params });
      setGigs(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = () => {
    fetchGigs({
      ...(searchTerm.trim() && { search: searchTerm.trim() }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    fetchGigs();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-sm border flex items-center gap-3">
          <span className="loading loading-spinner loading-md text-indigo-600"></span>
          <span className="text-slate-600 font-medium">Loading gigs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-indigo-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
            <Sparkles size={14} />
            Browse top freelance services
          </div>

          <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Find the perfect services
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-base md:text-lg text-slate-600">
            Search by title, skill, or seller and filter by budget to discover services that fit your project.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 pb-12">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Search
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search gigs by title, email, skill, tag..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Min price
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="lg:col-span-3">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Max price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="1000"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="lg:col-span-1 flex lg:flex-col gap-3 lg:justify-end">
              <button
                onClick={handleSearch}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 hover:-translate-y-0.5"
              >
                <Search size={18} />
                <span className="hidden sm:inline">Search</span>
              </button>

              <button
                onClick={handleReset}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Available gigs</h2>
            <p className="text-sm text-slate-500">
              {gigs.length} service{gigs.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <Filter size={16} />
            Filtered results
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={gig.images?.[0] || "https://via.placeholder.com/400"}
                  alt={gig.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                  <Star size={12} className="text-amber-500" />
                  {gig.rating || 0}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  ${gig.price}
                </div>
              </div>

              <div className="p-6">
                <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
                  {gig.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  {gig.shortDescription}
                </p>

                <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Tag size={15} className="text-indigo-500" />
                    <span className="font-medium">{gig.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock3 size={15} className="text-slate-400" />
                    <span>{gig.deliveryDays} Days delivery</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/gigs/${gig._id}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gigs.length === 0 && (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-bold text-slate-900">No gigs found</h2>
            <p className="mt-2 text-slate-500">
              Try different keywords or price ranges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGigs;