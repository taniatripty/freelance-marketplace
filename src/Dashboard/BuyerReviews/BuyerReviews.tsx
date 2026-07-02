
import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import { Star, Clock3, BadgeDollarSign, Image as ImageIcon } from "lucide-react";

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
        const res = await axiosInstance.get(`/reviews/buyer/${user.uid}`);
        setReviews(res.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">My Reviews</h1>
        <p className="mt-2 text-sm text-slate-500">
          Review history for your completed orders.
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Star className="h-8 w-8" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            No Reviews Yet
          </h3>
          <p className="mt-2 text-slate-500">
            Your completed order reviews will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default BuyerReviews;

const ReviewCard = ({ review }: { review: Review }) => {
  const image = Array.isArray(review.orderImage)
    ? review.orderImage[0]
    : review.orderImage;

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/600x400"}
          alt={review.orderTitle}
          className="h-52 w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          Order Review
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
              {review.orderTitle}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Clock3 className="h-4 w-4" />
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 px-3 py-2 text-amber-700">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={
                    star <= review.rating
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

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm leading-6 text-slate-600">
            “{review.comment}”
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BadgeDollarSign className="h-4 w-4 text-emerald-600" />
            <span className="font-medium text-slate-700">
              ${review.orderPrice}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ImageIcon className="h-4 w-4 text-indigo-600" />
            <span>{Array.isArray(review.orderImage) ? review.orderImage.length : 1} images</span>
          </div>
        </div>
      </div>
    </div>
  );
};