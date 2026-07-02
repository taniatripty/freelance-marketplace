import axiosInstance from "@/UseAxios/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  ShoppingCart,
  Clock3,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

type Gig = {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  deliveryDays: number;
  images: string[];
  rating: number;
  totalSales: number;
  totalReviews: number;
};

const PopularServices = () => {
  const { data: gigs = [], isLoading } = useQuery<Gig[]>({
    queryKey: ["popular-services"],
    queryFn: async () => {
      const res = await axiosInstance.get("/gigs/all/popular");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading popular services...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          Most Popular Services
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Explore the services customers love the most.
          These gigs have generated the highest sales and
          excellent client ratings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={gig.images[0]}
                alt={gig.title}
                className="h-60 w-full object-cover group-hover:scale-110 duration-500"
              />

              <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-indigo-600 shadow">
                Best Seller
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg line-clamp-1">
                {gig.title}
              </h3>

              <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                {gig.shortDescription}
              </p>

              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star
                    size={18}
                    fill="currentColor"
                  />
                  <span className="font-semibold">
                    {gig.rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <MessageSquare size={16} />
                  {gig.totalReviews}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <ShoppingCart size={15} />
                    Sales
                  </div>

                  <p className="font-bold mt-1">
                    {gig.totalSales}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock3 size={15} />
                    Delivery
                  </div>

                  <p className="font-bold mt-1">
                    {gig.deliveryDays} Days
                  </p>
                </div>

              </div>

              <div className="flex items-center justify-between mt-6">

                <div>
                  <p className="text-sm text-gray-500">
                    Starting From
                  </p>

                  <h3 className="text-2xl font-bold text-indigo-600">
                    ${gig.price}
                  </h3>
                </div>

                <Link
                  to={`/gig/${gig._id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 duration-300"
                >
                  Details
                  <ArrowRight size={18} />
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>

      {gigs.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No popular services found.
        </div>
      )}
    </section>
  );
};

export default PopularServices;