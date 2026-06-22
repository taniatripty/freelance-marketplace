

// import { useEffect, useState } from "react";
// import axiosInstance from "@/UseAxios/axios";
// import { useAuth } from "@/AuthContex/UseAuth";
// import { useNavigate } from "react-router";

// type Order = {
//   _id: string;
//   gigTitle: string;
//   sellerName: string;
//   price: number;
//   status: string;
//   paymentStatus: string;
//   createdAt: string;
// };

// const MyPurchaseServices = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ---------------- FETCH ORDERS ----------------
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/orders/buyer/${user?.uid}`
//         );

//         setOrders(res.data.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.uid) fetchOrders();
//   }, [user]);

//   // ---------------- PAYMENT CLICK ----------------
//   const handlePayment = (orderId: string) => {
//     // later connect Stripe/SSLCommerz here
//     alert(`Redirect to payment for order: ${orderId}`);
//   };

//   // ---------------- LOADING ----------------
//   if (loading) {
//     return (
//       <div className="text-center py-20">
//         Loading Orders...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-3xl text-center text-indigo-600 font-bold mb-6">
//         My Purchased Services
//       </h1>

//       <div className="overflow-x-auto bg-white rounded-2xl border">
//         <table className="w-full">

//           {/* HEADER */}
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-4 text-left">Gig</th>
//               <th className="p-4 text-left">Seller</th>
//               <th className="p-4 text-left">Price</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-left">Payment</th>
//               <th className="p-4 text-left">Actions</th>
//               <th className="p-4 text-left">Date</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {orders.map((order) => (
//               <tr
//                 key={order._id}
//                 className="border-t hover:bg-slate-50"
//               >

//                 {/* GIG */}
//                 <td className="p-4 font-medium">
//                   {order.gigTitle}
//                 </td>

//                 {/* SELLER */}
//                 <td className="p-4">
//                   {order.sellerName}
//                 </td>

//                 {/* PRICE */}
//                 <td className="p-4 font-semibold text-green-600">
//                   ${order.price}
//                 </td>

//                 {/* STATUS */}
//                 <td className="p-4">
//                   <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
//                     {order.status}
//                   </span>
//                 </td>

//                 {/* PAYMENT */}
//                 <td className="p-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       order.paymentStatus === "paid"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {order.paymentStatus}
//                   </span>
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="p-4 flex gap-2">

//                   {/* 💬 CHAT BUTTON */}
//                   <button
//                     onClick={() =>
//                       navigate(`/chat/${order._id}`)
//                     }
//                     className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
//                   >
//                     Chat
//                   </button>

//                   {/* 💳 PAYMENT BUTTON */}
//                   {order.paymentStatus !== "paid" && (
//                     <button
//                       onClick={() =>
//                         handlePayment(order._id)
//                       }
//                       className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
//                     >
//                       Pay Now
//                     </button>
//                   )}

//                 </td>

//                 {/* DATE */}
//                 <td className="p-4 text-sm text-gray-500">
//                   {new Date(
//                     order.createdAt
//                   ).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* EMPTY STATE */}
//         {orders.length === 0 && (
//           <div className="text-center py-10 text-slate-500">
//             No orders found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyPurchaseServices;


import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import { useNavigate } from "react-router";

type Order = {
  _id: string;
  gigTitle: string;
  sellerName: string;
  price: number;
  status: string;
  paymentStatus: string;
  createdAt: string;

  unread?: boolean; // 🔥 from notification system
};

type Notification = {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  orderId: string;
  isRead: boolean;
};

const MyPurchaseServices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (!user?.uid) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [orderRes, notifRes] = await Promise.all([
          axiosInstance.get(`/orders/buyer/${user.uid}`),
          axiosInstance.get(`/notifications/${user.uid}`),
        ]);

        const ordersData = orderRes.data.data;
        const notificationsData = notifRes.data.data;

        setNotifications(notificationsData);

        // 🔥 map unread status per order using notifications ONLY
        const enrichedOrders = ordersData.map((order: Order) => {
          const hasUnread = notificationsData.some(
            (n: Notification) =>
              n.orderId === order._id && n.isRead === false
          );

          return {
            ...order,
            unread: hasUnread,
          };
        });

        setOrders(enrichedOrders);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading orders...
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  // ---------------- EMPTY ----------------
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 shadow-sm hover:shadow-md transition"
          >
            {/* LEFT SIDE */}
            <div>
              <h2 className="font-semibold text-lg">
                {order.gigTitle}
              </h2>

              <p className="text-sm text-gray-500">
                Seller: {order.sellerName}
              </p>

              <div className="text-sm mt-2">
                Status:{" "}
                <span className="font-medium text-blue-600">
                  {order.status}
                </span>
              </div>

              <div className="text-sm mt-1">
                Payment:{" "}
                <span
                  className={
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-2 items-start md:items-end">
              <p className="font-bold text-green-600 text-lg">
                ${order.price}
              </p>

              <div className="flex gap-2">
                {/* 💬 CHAT BUTTON (NEW LOGIC) */}
                <button
                  onClick={() =>
                    navigate(`/chat/${order._id}`)
                  }
                  className="relative px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Chat

                  {/* 🔴 ONLY FROM NOTIFICATIONS */}
                  {order.unread && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full animate-pulse">
                      New
                    </span>
                  )}
                </button>

                {/* 💳 PAYMENT BUTTON */}
                {order.paymentStatus !== "paid" && (
                  <button
                    onClick={() =>
                      alert(`Payment for ${order._id}`)
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                  >
                    Pay Now
                  </button>
                )}
              </div>

              <span className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPurchaseServices;