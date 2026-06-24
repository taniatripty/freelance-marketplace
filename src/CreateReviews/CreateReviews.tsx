import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";

type Order = {
  _id: string;
  gigId: string;
  gigTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  status: string;
  paymentStatus: string;
};

const CreateReview = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ---------------- FETCH ORDER ----------------

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) return;

        const res = await axiosInstance.get(
          `/orders/${orderId}`
        );

        setOrder(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // ---------------- SUBMIT REVIEW ----------------

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!order) return;

    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      setSubmitting(true);

      await axiosInstance.post("/reviews", {
        gigId: order.gigId,
        orderId: order._id,

        buyerId: user?.uid,
        buyerName:
          user?.displayName ||
          order.buyerName,

        rating,
        comment,
      });

      alert("Review submitted successfully");

      navigate(`/gigs/${order.gigId}`);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to submit review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------- LOADING ----------------

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 text-red-500">
        Order not found
      </div>
    );
  }

  // ---------------- VALIDATION ----------------

  if (
    order.status !== "completed" ||
    order.paymentStatus !== "paid"
  ) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-red-50 border border-red-200 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-red-600">
          Review Not Allowed
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          You can only review after
          completing the order and
          payment.
        </p>
      </div>
    );
  }

  // ---------------- UI ----------------

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h1 className="text-2xl font-bold mb-2">
          Leave a Review
        </h1>

        <p className="text-gray-500 mb-6">
          {order.gigTitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Rating */}

          <div>
            <label className="block mb-2 font-medium">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(e.target.value)
                )
              }
              className="w-full border rounded-lg p-3"
            >
              <option value={5}>
                ⭐⭐⭐⭐⭐ (5)
              </option>

              <option value={4}>
                ⭐⭐⭐⭐ (4)
              </option>

              <option value={3}>
                ⭐⭐⭐ (3)
              </option>

              <option value={2}>
                ⭐⭐ (2)
              </option>

              <option value={1}>
                ⭐ (1)
              </option>
            </select>
          </div>

          {/* Comment */}

          <div>
            <label className="block mb-2 font-medium">
              Review
            </label>

            <textarea
              rows={5}
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              placeholder="Share your experience..."
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
          >
            {submitting
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;