
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import toast from "react-hot-toast";

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

      //  Confirm payment with Stripe
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

      //  SUCCESS CHECK
      if (paymentIntent?.status === "succeeded") {
        const transactionId = paymentIntent.id;

        // Update payment status in backend
        await axiosInstance.patch(`/payments/success/${orderId}`, {
          transactionId,
        });

        
       
        toast.success("Payment Successful 🎉");

        onSuccess?.();
      } else {
        throw new Error("Payment not completed");
      }
    }catch (err: unknown) {
      console.error(err);

      const message =
        err instanceof Error
          ? err.message
          : "Payment failed";

      setError(message);
      toast.error(message);
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

// import {
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import axiosInstance from "@/UseAxios/axios";
// import toast from "react-hot-toast";

// type Props = {
//   orderId: string;
//   amount: number;
//   onSuccess?: () => void;
// };

// type CreateIntentResponse = {
//   data?: {
//     clientSecret?: string;
//   };
// };

// const PaymentForm = ({ orderId, amount, onSuccess }: Props) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;
//     if (loading) return;

//     setLoading(true);
//     setError(null);

//     try {
//       // 1. Create Payment Intent
//       const res = await axiosInstance.post<CreateIntentResponse>(
//         "/payments/create-intent",
//         {
//           orderId,
//           amount,
//         }
//       );

//       const clientSecret = res.data?.data?.clientSecret;

//       if (!clientSecret) {
//         throw new Error("Client secret not found");
//       }

//       // 2. Get CardElement
//       const card = elements.getElement(CardElement);

//       if (!card) {
//         throw new Error("Card element not found");
//       }

//       // 3. Confirm payment with Stripe
//       const paymentResult = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card,
//           },
//         }
//       );

//       if (paymentResult.error) {
//         throw new Error(
//           paymentResult.error.message || "Payment failed"
//         );
//       }

//       const paymentIntent = paymentResult.paymentIntent;

//       // 4. Check payment status
//       if (paymentIntent?.status !== "succeeded") {
//         throw new Error("Payment not completed");
//       }

//       const transactionId = paymentIntent.id;

//       // 5. Update payment status in backend
//       await axiosInstance.patch(`/payments/success/${orderId}`, {
//         transactionId,
//       });

//       toast.success("Payment Successful 🎉");

//       onSuccess?.();
//     } catch (err: unknown) {
//       console.error(err);

//       const message =
//         err instanceof Error
//           ? err.message
//           : "Payment failed";

//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handlePay}
//       className="space-y-4 rounded-xl border bg-white p-5 shadow-sm"
//     >
//       <h2 className="text-lg font-semibold">
//         Pay ${amount.toFixed(2)}
//       </h2>

//       {/* CARD INPUT */}
//       <div className="rounded-lg border bg-gray-50 p-3">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#111827",
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

//       {/* ERROR */}
//       {error && (
//         <p className="text-sm text-red-500">
//           {error}
//         </p>
//       )}

//       {/* BUTTON */}
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
//       >
//         {loading
//           ? "Processing..."
//           : `Pay $${amount.toFixed(2)}`}
//       </button>

//       <p className="text-center text-xs text-gray-400">
//         Secure payment powered by Stripe (Visa / Mastercard
//         supported)
//       </p>
//     </form>
//   );
// };

// export default PaymentForm;