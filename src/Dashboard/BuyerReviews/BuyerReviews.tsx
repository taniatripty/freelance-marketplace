

import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import { Star } from "lucide-react";

type Review = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;

  orderTitle: string;
  orderPrice: number;
  orderImage: string[] | string;
};

const BuyerReviews = () => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const loadReviews = async () => {
      try {
        const res = await axiosInstance.get(
          `/reviews/buyer/${user.uid}`
        );

        setReviews(res.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading reviews...
      </div>
    );
  }

  return (
   <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

  <div className="overflow-x-auto">
    <table className="w-full">

      <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">

        <tr>
          <th className="px-6 py-5 text-left font-semibold">#</th>

          <th className="px-6 py-5 text-left font-semibold">
            Gig
          </th>

          <th className="px-6 py-5 text-left font-semibold">
            Title
          </th>

          <th className="px-6 py-5 text-center font-semibold">
            Rating
          </th>

          <th className="px-6 py-5 text-left font-semibold">
            Review
          </th>

          <th className="px-6 py-5 text-center font-semibold">
            Price
          </th>

          
        </tr>

      </thead>

      <tbody>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <tr
              key={review._id}
              className="border-b border-slate-100 hover:bg-indigo-50 transition duration-200"
            >
              <td className="px-6 py-5 font-semibold text-slate-500">
                {index + 1}
              </td>

              <td className="px-6 py-5">
                <img
                  src={
                    Array.isArray(review.orderImage)
                      ? review.orderImage[0]
                      : review.orderImage
                  }
                  alt={review.orderTitle}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-indigo-100 shadow"
                />
              </td>

              <td className="px-6 py-5">
                <h4 className="font-semibold text-slate-800">
                  {review.orderTitle}
                </h4>
              </td>

              <td className="px-6 py-5">

                <div className="flex flex-col items-center">

                  <div className="flex">

                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}

                  </div>

                  <span className="mt-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    {review.rating}.0 / 5
                  </span>

                </div>

              </td>

              <td className="px-6 py-5">

                <div className="max-w-md rounded-xl bg-slate-50 p-4">

                  <p className="text-sm text-slate-600 line-clamp-3">
                    {review.comment}
                  </p>

                </div>

              </td>

              <td className="px-6 py-5 text-center">

                <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                  ${review.orderPrice}
                </span>

              </td>

              
            </tr>
          ))
        ) : (
          <tr>

            <td
              colSpan={7}
              className="py-20 text-center"
            >

              <div className="flex flex-col items-center gap-3">

                <div className="text-6xl">
                  ⭐
                </div>

                <h3 className="text-xl font-semibold">
                  No Reviews Yet
                </h3>

                <p className="text-slate-500">
                  Your completed order reviews will appear here.
                </p>

              </div>

            </td>

          </tr>
        )}

      </tbody>

    </table>
  </div>
</div>
  );
};

export default BuyerReviews;