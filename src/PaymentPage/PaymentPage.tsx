// PaymentPage.tsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import PaymentForm from "./paymentForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PK!
);

type Order = {
  _id: string;
  gigTitle: string;
  sellerName: string;
  price: number;
  paymentStatus: string;
};

const PaymentPage = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axiosInstance.get(
        `/orders/${orderId}`
      );
      setOrder(res.data.data);
    };

    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Checkout
      </h1>

      {/* 💳 STRIPE PROVIDER WRAP */}
      <Elements stripe={stripePromise}>
        <PaymentForm
          orderId={order._id}
          amount={order.price}
          onSuccess={() => {
            console.log("Payment success");
          }}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;