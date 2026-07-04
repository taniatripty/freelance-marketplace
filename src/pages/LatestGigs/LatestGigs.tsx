

import axiosInstance from "@/UseAxios/axios";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  Sparkles,
  Star,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Gig {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  deliveryDays: number;
  images: string[];
  rating: number;
  totalSales: number;
  sellerName: string;
  sellerPhoto: string;
  createdAt: string;
}

export default function LatestGigs() {
  const { data: gigs = [], isLoading } = useQuery<Gig[]>({
    queryKey: ["latest-gigs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/gigs/latest/all");
      return res.data.data;
    },
  });

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_30%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="mb-10 h-20 w-80 rounded-3xl bg-slate-200/80 animate-pulse" />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-sm"
              >
                <div className="h-60 bg-slate-200 animate-pulse" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-24 rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-6 w-3/4 rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-4 w-full rounded-full bg-slate-200 animate-pulse" />
                  <div className="h-4 w-5/6 rounded-full bg-slate-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_30%)]" />
      <div className="container mx-auto px-4 relative">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
              <Sparkles size={15} />
              Fresh services, just published
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Discover newly launched gigs with a premium feel.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Explore the latest freelance offerings from skilled sellers, arranged in a modern layout that highlights value, trust, and speed.
            </p>
          </div>

          <Link
            to="/allservices"
            className="group inline-flex items-center gap-2 self-start rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            View all services
            <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {gigs.map((gig) => (
            <article
              key={gig._id}
              className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_18px_60px_rgba(15,23,42,0.14)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/5 opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <img
                  src={gig.images?.[0] || "https://via.placeholder.com/800x600?text=No+Image"}
                  alt={gig.title}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                    <BadgeCheck size={12} />
                    New
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                    {formatDate(gig.createdAt)}
                  </span>
                </div>

                <div className="pointer-events-none absolute bottom-5 left-5 right-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 rounded-full bg-white/90 px-3 py-2 backdrop-blur">
                      <img
                        src={gig.sellerPhoto || "https://via.placeholder.com/100x100?text=User"}
                        alt={gig.sellerName}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {gig.sellerName}
                        </p>
                        <p className="text-xs text-slate-500">Verified seller</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-slate-900/85 px-3 py-2 text-sm font-semibold text-white backdrop-blur">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      {gig.rating}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-6">
                <h3 className="line-clamp-2 text-xl font-extrabold tracking-tight text-slate-900 transition group-hover:text-indigo-600">
                  {gig.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {gig.shortDescription}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Clock3 size={13} />
                      Delivery
                    </div>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {gig.deliveryDays} days
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <CalendarDays size={13} />
                      Orders
                    </div>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {gig.totalSales}+ sold
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Starting from
                    </p>
                    <h4 className="mt-1 text-3xl font-black text-indigo-600">
                      ${gig.price}
                    </h4>
                  </div>

                  <Link
                    to={`/gigs/${gig._id}`}
                    className="relative z-20 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}