


// import { useEffect, useState } from "react";
// import axiosInstance from "@/UseAxios/axios";
// import { useAuth } from "@/AuthContex/UseAuth";
// import { useNavigate } from "react-router";

// type Order = {
//   _id: string;
//   gigId: string;
//   gigTitle: string;
//   buyerId: string;
//   buyerName: string;
//   sellerId: string;
//   price: number;
//   status: string;
//   paymentStatus: string;
//   createdAt: string;
// };

// const ManageSellerOrders = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   // ---------------- FETCH ORDERS ----------------
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/orders/seller/${user?.uid}`
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

//   // ---------------- UPDATE STATUS ----------------
//   const updateStatus = async (id: string, status: string) => {
//     try {
//       setUpdatingId(id);

//       await axiosInstance.patch(`/orders/${id}`, {
//         status,
//       });

//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === id ? { ...o, status } : o
//         )
//       );
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update order");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   // ---------------- STATUS COLOR ----------------
//   const statusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-700";
//       case "accepted":
//         return "bg-blue-100 text-blue-700";
//       case "in_progress":
//         return "bg-purple-100 text-purple-700";
//       case "completed":
//         return "bg-green-100 text-green-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   // ---------------- LOADING ----------------
//   if (loading) {
//     return <div className="text-center py-20">Loading Orders...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-8">
//         Manage Orders
//       </h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-500">
//           No orders received yet
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//             >
//               {/* HEADER */}
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="text-lg font-semibold">
//                     {order.gigTitle}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Buyer: {order.buyerName}
//                   </p>
//                 </div>

//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
//                     order.status
//                   )}`}
//                 >
//                   {order.status}
//                 </span>
//               </div>

//               {/* INFO */}
//               <div className="mt-4 space-y-2 text-sm text-gray-600">
//                 <p>
//                   💰 Price:{" "}
//                   <span className="font-semibold">
//                     ${order.price}
//                   </span>
//                 </p>

//                 <p>
//                   📅 Date:{" "}
//                   {new Date(
//                     order.createdAt
//                   ).toLocaleDateString()}
//                 </p>

//                 <p>
//                   💳 Payment: {order.paymentStatus}
//                 </p>
//               </div>

//               {/* ACTIONS */}
//               <div className="mt-5 flex flex-wrap gap-2">

//                 {/* ACCEPT */}
//                 {order.status === "pending" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order._id, "accepted")
//                     }
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
//                   >
//                     Accept Order
//                   </button>
//                 )}

//                 {/* START WORK */}
//                 {order.status === "accepted" && (
//                   <>
//                     <button
//                       onClick={() =>
//                         updateStatus(
//                           order._id,
//                           "in_progress"
//                         )
//                       }
//                       className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
//                     >
//                       Start Work
//                     </button>

//                     {/* CHAT BUTTON */}
//                     <button
//                       onClick={() =>
//                         navigate(`/chat/${order._id}`)
//                       }
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
//                     >
//                       Chat
//                     </button>
//                   </>
//                 )}

//                 {/* IN PROGRESS */}
//                 {order.status === "in_progress" && (
//                   <>
//                     <button
//                       onClick={() =>
//                         updateStatus(order._id, "completed")
//                       }
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
//                     >
//                       Mark Completed
//                     </button>

//                     {/* CHAT ALSO AVAILABLE */}
//                     <button
//                       onClick={() =>
//                         navigate(`/chat/${order._id}`)
//                       }
//                       className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
//                     >
//                       Chat
//                     </button>
//                   </>
//                 )}

//                 {updatingId === order._id && (
//                   <span className="text-sm text-gray-500">
//                     Updating...
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageSellerOrders;


import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import { useNavigate } from "react-router";

type Order = {
  _id: string;
  gigId: string;
  gigTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  price: number;
  status: string;
  paymentStatus: string;
  createdAt: string;

  // 🔥 backend should send this
  unreadCount?: number;
};

const ManageSellerOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ---------------- FETCH ORDERS ----------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.uid) return;

        const res = await axiosInstance.get(
          `/orders/seller/${user.uid}`
        );

        // backend should already include unreadCount
        setOrders(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // ---------------- UPDATE STATUS ----------------
  const updateStatus = async (id: string, status: string) => {
    try {
      setUpdatingId(id);

      await axiosInstance.patch(`/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- STATUS COLORS ----------------
  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading Orders...
      </div>
    );
  }

  // ---------------- EMPTY ----------------
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No orders received yet
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Manage Orders
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="relative bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* 🔴 UNREAD BADGE */}
            {order.unreadCount && order.unreadCount > 0 && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {order.unreadCount} new
              </span>
            )}

            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {order.gigTitle}
                </h2>
                <p className="text-sm text-gray-500">
                  Buyer: {order.buyerName}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* INFO */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                💰 Price:{" "}
                <span className="font-semibold">
                  ${order.price}
                </span>
              </p>

              <p>
                📅 Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p>💳 Payment: {order.paymentStatus}</p>
            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex flex-wrap gap-2">

              {/* ACCEPT */}
              {order.status === "pending" && (
                <button
                  onClick={() =>
                    updateStatus(order._id, "accepted")
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Accept Order
                </button>
              )}

              {/* ACCEPTED */}
              {order.status === "accepted" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus(order._id, "in_progress")
                    }
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
                  >
                    Start Work
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/chat/${order._id}`)
                    }
                    className="relative px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                  >
                    Chat

                    {order.unreadCount! > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 rounded-full">
                        {order.unreadCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {/* IN PROGRESS */}
              {order.status === "in_progress" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus(order._id, "completed")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/chat/${order._id}`)
                    }
                    className="relative px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
                  >
                    Chat

                    {order.unreadCount! > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 rounded-full">
                        {order.unreadCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {updatingId === order._id && (
                <span className="text-sm text-gray-500">
                  Updating...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSellerOrders;