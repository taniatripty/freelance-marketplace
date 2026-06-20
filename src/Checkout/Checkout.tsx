
import { useAuth } from "@/AuthContex/UseAuth";
import axiosInstance from "@/UseAxios/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Gig = {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  deliveryDays: number;
  images: string[];
  sellerId: string;
  name: string;   // seller name
  email: string;  // seller email
};

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // ---------------- FETCH GIG ----------------
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axiosInstance.get(`/gigs/${id}`);
        setGig(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGig();
  }, [id]);

  // ---------------- PLACE ORDER ----------------
  const handleOrder = async () => {
    if (!gig || !user) return;

    try {
      setPlacingOrder(true);

      const payload = {
        gigId: gig._id,
        gigTitle:gig.title,
        buyerId: user.uid,
        buyerName:user.displayName,
        sellerId: gig.sellerId,
        sellerName:gig.name,
        price: gig.price,
        status: "pending",
        paymentStatus: "unpaid",
      };

      const res = await axiosInstance.post("/orders", payload);

      alert("Order placed successfully!");

      navigate(`/orders/${res.data.data.insertedId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading checkout...</div>;
  }

  if (!gig) {
    return <div className="text-center py-20">Gig not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          <h1 className="text-3xl font-bold">Checkout</h1>

          {/* GIG INFO */}
          <div className="bg-white p-6 rounded-2xl border">
            <div className="flex gap-4">
              <img
                src={gig.images?.[0]}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl font-semibold">{gig.title}</h2>

                <p className="text-slate-500 mt-1">
                  {gig.shortDescription}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ${gig.price}
                </p>
              </div>
            </div>
          </div>

          {/* BUYER INFO */}
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-lg font-semibold mb-3">
              Buyer Information
            </h2>
             <p>
              <b>BuyerId:</b> {user?.uid}
            </p>

            <p>
              <b>Name:</b> {user?.displayName}
            </p>

            <p>
              <b>Email:</b> {user?.email}
            </p>
          </div>

          {/* SELLER INFO */}
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-lg font-semibold mb-3">
              Seller Information
            </h2>
            <p>
              <b>SellerId:</b> {gig.sellerId}
            </p>

            <p>
              <b>Name:</b> {gig.name}
            </p>

            <p>
              <b>Email:</b> {gig.email}
            </p>
          </div>

          {/* NOTE */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
            ⚠️ This is demo checkout. Payment integration will be added later.
          </div>

        </div>

        {/* RIGHT SUMMARY */}
        <div className="bg-white p-6 rounded-2xl border h-fit sticky top-5">

          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Service Price</span>
              <span>${gig.price}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>$0</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${gig.price}</span>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            disabled={placingOrder}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
          >
            {placingOrder ? "Placing Order..." : "Confirm Purchase"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-3 border py-3 rounded-xl"
          >
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
};

export default Checkout;