


import { useState } from "react";
import { Star, Send, MessageSquare } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/UserRoles";
import axiosInstance from "@/UseAxios/axios";

const AddWebsiteReview = () => {
  const { data: currentUser } = useCurrentUser();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const reviewMutation = useMutation({
  mutationFn: async (reviewData: {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
    rating: number;
    comment: string;
  }) => {
    const res = await axiosInstance.post(
      "/reviews/website-reviews",
      reviewData
    );

    return res.data;
  },

  onSuccess: () => {
    toast.success("Thank you for your review!");

    setRating(0);
    setComment("");
  },

  onError: (error) => {
    console.log(error);
    toast.error("Failed to submit review.");
  },
});

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!rating) {
    return toast.error("Please give a rating.");
  }

  if (!comment.trim()) {
    return toast.error("Please write a review.");
  }

  reviewMutation.mutate({
    uid: currentUser.uid,
    name: currentUser.name,
    email: currentUser.email,
    photoURL: currentUser.photoURL,
    role: currentUser.role,
    rating,
    comment,
  });
};

  if (!currentUser) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-16">
      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">

            <h2 className="text-3xl font-bold">
              Share Your Experience
            </h2>

            <p className="mt-2 text-indigo-100">
              Your feedback helps us improve our platform and
              helps other freelancers and clients.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-8"
          >

            {/* User */}

            <div className="flex items-center gap-5">

              <img
                src={
                  currentUser.photoURL ||
                  "https://i.pravatar.cc/150"
                }
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-100"
              />

              <div>

                <h3 className="text-xl font-semibold">
                  {currentUser.name}
                </h3>

                <p className="text-slate-500">
                  {currentUser.email}
                </p>

              </div>

            </div>

            {/* Rating */}

            <div>

              <label className="block font-semibold text-slate-700 mb-4">
                Rate Your Experience
              </label>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition hover:scale-125"
                  >

                    <Star
                      size={40}
                      color="#FACC15"
                      fill={
                        star <= (hover || rating)
                          ? "#FACC15"
                          : "transparent"
                      }
                    />

                  </button>

                ))}

              </div>

              {rating > 0 && (
                <p className="mt-3 text-sm text-slate-500">
                  You selected{" "}
                  <span className="font-semibold">
                    {rating}
                  </span>{" "}
                  star{rating > 1 && "s"}.
                </p>
              )}

            </div>

            {/* Comment */}

            <div>

              <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">

                <MessageSquare size={18} />

                Your Review

              </label>

              <textarea
                rows={6}
                maxLength={500}
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Tell everyone about your experience..."
                className="w-full rounded-2xl border border-slate-300 p-5 resize-none outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />

              <div className="flex justify-between mt-2">

                <p className="text-sm text-slate-400">
                  Please be honest and respectful.
                </p>

                <p className="text-sm text-slate-500">
                  {comment.length}/500
                </p>

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={
                reviewMutation.isPending ||
                !rating ||
                !comment.trim()
              }
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-xl hover:scale-[1.01] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >

              <Send size={18} />

              {reviewMutation.isPending
                ? "Submitting..."
                : "Submit Review"}

            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default AddWebsiteReview;