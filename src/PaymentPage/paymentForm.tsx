// // PaymentForm.tsx
// import {
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import axiosInstance from "@/UseAxios/axios";

// type Props = {
//   orderId: string;
//   amount: number;
//   onSuccess?: () => void;
// };

// const PaymentForm = ({ orderId, amount, onSuccess }: Props) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handlePay = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     try {
//       setLoading(true);

//       // 1. Create Payment Intent from backend
//       const res = await axiosInstance.post(
//         "/payments/create-intent",
//         {
//           orderId,
//           amount,
//         }
//       );

//       const clientSecret = res.data.data.clientSecret;

//       // 2. Confirm card payment
//       const card = elements.getElement(CardElement);

//       const paymentResult = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: card!,
//           },
//         }
//       );

//       if (paymentResult.error) {
//         setError(paymentResult.error.message || "Payment failed");
//       } else {
//         if (paymentResult.paymentIntent?.status === "succeeded") {
//           alert("Payment Successful 🎉");

//           // optional callback
//           onSuccess?.();
//         }
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handlePay}
//       className="space-y-4 bg-white border p-5 rounded-xl shadow-sm"
//     >
//       <h2 className="text-lg font-semibold">
//         Pay ${amount}
//       </h2>

//       {/* 💳 CARD ELEMENT (Visa / Mastercard UI handled by Stripe) */}
//       <div className="border p-3 rounded-lg bg-gray-50">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#111",
//                 "::placeholder": {
//                   color: "#9ca3af",
//                 },
//               },
//               invalid: {
//                 color: "#ef4444",
//               },
//             },
//           }}
//         />
//       </div>

//       {error && (
//         <p className="text-red-500 text-sm">{error}</p>
//       )}

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>

//       <p className="text-xs text-gray-400 text-center">
//         Secure payment powered by Stripe (Visa / Mastercard supported)
//       </p>
//     </form>
//   );
// };

// export default PaymentForm;


// PaymentForm.tsx
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

const PaymentForm = ({
  orderId,
  amount,
  onSuccess,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);
      setError(null);

      // 1. Create Payment Intent
      const res = await axiosInstance.post(
        "/payments/create-intent",
        {
          orderId,
          amount,
        }
      );

      const clientSecret =
        res.data.data.clientSecret;

      // 2. Get Card Element
      const card = elements.getElement(CardElement);

      if (!card) {
        setError("Card information is missing");
        return;
      }

      // 3. Confirm Payment
      const paymentResult =
        await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card,
            },
          }
        );

      if (paymentResult.error) {
        setError(
          paymentResult.error.message ||
            "Payment failed"
        );
        return;
      }

      // 4. Payment Success
      if (
        paymentResult.paymentIntent?.status ===
        "succeeded"
      ) {
        // 🔥 Update Order Payment Status
        await axiosInstance.patch(
          `/payments/success/${orderId}`,
          {
            transactionId:
              paymentResult.paymentIntent.id,
          }
        );

        alert("Payment Successful 🎉");

        onSuccess?.();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed");
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
        Pay ${amount}
      </h2>

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

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : `Pay $${amount}`}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Secure payment powered by Stripe
      </p>
    </form>
  );
};

export default PaymentForm;