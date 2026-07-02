import axiosInstance from "@/UseAxios/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import {  useNavigate } from "react-router";

type Freelancer = {
    _id:string;
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  profession: string;
  headline: string;
  totalSales: number;
  totalReviews: number;
  rating: number;
};

const TopFreelancers = () => {
  const { data: freelancers = [], isLoading } = useQuery<Freelancer[]>({
    queryKey: ["top-freelancers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/freelancer/all/topfreelancers");
      return res.data.data;
    },
  });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-3xl animate-pulse bg-slate-200"
          />
        ))}
      </div>
    );
  }

  return (
    <section className="py-20">

      <div className="text-center mb-14">

        <h2 className="text-4xl font-bold">
          Top Freelancers
        </h2>

        <p className="text-slate-500 mt-3">
          Meet our highest-rated professionals trusted by clients.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

        {freelancers.map((freelancer) => (

          <div
            key={freelancer.uid}
            className="group rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >

            {/* Cover */}

            <div className="h-24 rounded-t-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500" />

            {/* Avatar */}

            <div className="-mt-12 flex justify-center">

              <img
                src={freelancer.photoURL}
                alt={freelancer.name}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
              />

            </div>

            <div className="p-6 text-center">

              <div className="flex items-center justify-center gap-1">

                <h3 className="text-xl font-bold">
                  {freelancer.name}
                </h3>

                <BadgeCheck
                  size={18}
                  className="text-blue-600"
                />

              </div>

              <p className="mt-2 font-medium text-indigo-600">
                {freelancer.profession}
              </p>

              <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                {freelancer.headline}
              </p>

              {/* Stats */}

              <div className="mt-6 grid grid-cols-3 gap-3">

                <div className="rounded-xl bg-yellow-50 py-3">

                  <Star
                    className="mx-auto text-yellow-500"
                    size={18}
                    fill="currentColor"
                  />

                  <p className="mt-1 font-bold">
                    {freelancer.rating}
                  </p>

                </div>

                <div className="rounded-xl bg-green-50 py-3">

                  <ShoppingBag
                    className="mx-auto text-green-600"
                    size={18}
                  />

                  <p className="mt-1 font-bold">
                    {freelancer.totalSales}
                  </p>

                </div>

                <div className="rounded-xl bg-blue-50 py-3">

                  <MessageSquare
                    className="mx-auto text-blue-600"
                    size={18}
                  />

                  <p className="mt-1 font-bold">
                    {freelancer.totalReviews}
                  </p>

                </div>

              </div>

             <button
  onClick={() => navigate(`/freelancer/${freelancer._id}`)}
  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
>
  View Profile
  <ArrowRight size={18} />
</button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default TopFreelancers;