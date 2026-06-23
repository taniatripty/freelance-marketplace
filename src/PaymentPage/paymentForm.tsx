

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosInstance from "@/UseAxios/axios";

type Props = {
  orderId: string;
  amount: number;
  onSuccess?: () => void;
};

const PaymentForm = ({ orderId, amount, onSuccess }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (loading) return; // prevent double click

    setLoading(true);
    setError(null);

    try {
      // 1. Create Payment Intent
      const res = await axiosInstance.post("/payments/create-intent", {
        orderId,
        amount,
      });

      const clientSecret = res.data?.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Client secret not found");
      }

      // 2. Get card element safely
      const card = elements.getElement(CardElement);

      if (!card) {
        throw new Error("Card element not found");
      }

      // 3. Confirm payment with Stripe
      const paymentResult = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message || "Payment failed");
      }

      const paymentIntent = paymentResult.paymentIntent;

      // 4. SUCCESS CHECK
      if (paymentIntent?.status === "succeeded") {
        const transactionId = paymentIntent.id;

        // 5. Update payment status in backend
        await axiosInstance.patch(`/payments/success/${orderId}`, {
          transactionId,
        });

        
       
        alert("Payment Successful 🎉");

        onSuccess?.();
      } else {
        throw new Error("Payment not completed");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePay}
      className="space-y-4 bg-white border p-5 rounded-xl shadow-sm"
    >
      <h2 className="text-lg font-semibold">
        Pay ${amount.toFixed(2)}
      </h2>

      {/* CARD INPUT */}
      <div className="border p-3 rounded-lg bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#111827",
                "::placeholder": {
                  color: "#9ca3af",
                },
              },
              invalid: {
                color: "#ef4444",
              },
            },
          }}
        />
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Secure payment powered by Stripe (Visa / Mastercard supported)
      </p>
    </form>
  );
};

export default PaymentForm;