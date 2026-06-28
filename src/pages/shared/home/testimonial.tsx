import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import { Star } from "lucide-react";

interface WebsiteReview {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  role: string;
  rating: number;
  comment: string;
}

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["website-reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/reviews/website-reviews"
      );

      return res.data.data;
    },
  });

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            What Our Community Says
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Honest reviews from freelancers and clients using our
            marketplace.
          </p>

        </div>

        {/* Loading */}

        {isLoading ? (
          <div className="text-center py-20">
            Loading Reviews...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            No reviews yet.
          </div>
        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {testimonials.map((review: WebsiteReview) => (

              <div
                key={review._id}
                className="rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >

                {/* Rating */}

                <div className="mb-5 flex">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <Star
                      key={star}
                      size={18}
                      className={
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />

                  ))}

                </div>

                {/* Review */}

                <p className="mb-6 text-slate-600 leading-7 italic">
                  "{review.comment}"
                </p>

                {/* User */}

                <div className="flex items-center gap-4">

                  <img
                    src={
                      review.photoURL ||
                      "https://i.pravatar.cc/100"
                    }
                    alt={review.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div>

                    <h4 className="font-semibold text-slate-900">
                      {review.name}
                    </h4>

                    <p className="text-sm text-slate-500 capitalize">
                      {review.role}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* Bottom Stats */}

        <div className="mt-16 grid grid-cols-2 gap-8 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-4">

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              10K+
            </h3>
            <p className="text-slate-500">
              Freelancers
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              25K+
            </h3>
            <p className="text-slate-500">
              Projects
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              98%
            </h3>
            <p className="text-slate-500">
              Success Rate
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              50+
            </h3>
            <p className="text-slate-500">
              Countries
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;