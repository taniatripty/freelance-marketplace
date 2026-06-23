

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

// type Notification = {
//   _id: string;
//   orderId: string;
//   isRead: boolean;
// };

// const ManageSellerOrders = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!user?.uid) return;

//         const [orderRes, notifRes] = await Promise.all([
//           axiosInstance.get(`/orders/seller/${user.uid}`),
//           axiosInstance.get(`/notifications/${user.uid}`),
//         ]);

//         setOrders(orderRes.data.data || []);
//         setNotifications(notifRes.data.data || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const getUnreadCount = (orderId: string) => {
//     return notifications.filter(
//       (n) => n.orderId === orderId && n.isRead === false
//     ).length;
//   };

//   const updateStatus = async (id: string, status: string) => {
//     try {
//       setUpdatingId(id);

//       await axiosInstance.patch(`/orders/${id}`, { status });

//       setOrders((prev) =>
//         prev.map((o) => (o._id === id ? { ...o, status } : o))
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setUpdatingId(null);
//     }
//   };

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

//   // ✅ CHAT CONDITION FIXED HERE
//   const canChat = (status: string) =>
//     status === "accepted" ||
//     status === "in_progress" ||
//     status === "completed";

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-gray-500">
//         Loading Orders...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Manage Orders
//       </h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         {orders.map((order) => {
//           const unread = getUnreadCount(order._id);

//           return (
//             <div
//               key={order._id}
//               className="relative bg-white border rounded-2xl p-5 shadow-sm"
//             >
//               {/* HEADER */}
//               <div className="flex justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold">
//                     {order.gigTitle}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Buyer: {order.buyerName}
//                   </p>
//                 </div>

//                 <span
//                   className={`px-3 py-1 rounded-full text-xs ${statusColor(
//                     order.status
//                   )}`}
//                 >
//                   {order.status}
//                 </span>
//               </div>

//               {/* INFO */}
//               <div className="mt-4 text-sm">
//                 <p>💰 ${order.price}</p>
//                 <p>
//                   📅{" "}
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               {/* ACTIONS */}
//               <div className="mt-5 flex gap-2 flex-wrap">
//                 {order.status === "pending" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order._id, "accepted")
//                     }
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
//                   >
//                     Accept
//                   </button>
//                 )}

//                 {order.status === "accepted" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order._id, "in_progress")
//                     }
//                     className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
//                   >
//                     Start Work
//                   </button>
//                 )}

//                 {/* ✅ CHAT BUTTON (FIXED LOGIC) */}
//                 {canChat(order.status) && (
//                   <button
//                     onClick={() =>
//                       navigate(`/chat/${order._id}`)
//                     }
//                     className="relative px-4 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center gap-2"
//                   >
//                     💬 Chat

//                     {unread > 0 && (
//                       <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full animate-pulse">
//                         {unread}
//                       </span>
//                     )}
//                   </button>
//                 )}

//                 {order.status === "in_progress" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order._id, "completed")
//                     }
//                     className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
//                   >
//                     Complete
//                   </button>
//                 )}

//                 {updatingId === order._id && (
//                   <span className="text-sm text-gray-500">
//                     Updating...
//                   </span>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
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
};

type Notification = {
  _id: string;
  orderId: string;
  type: string;
  isRead: boolean;
};

const ManageSellerOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.uid) return;

        const [orderRes, notifRes] = await Promise.all([
          axiosInstance.get(`/orders/seller/${user.uid}`),
          axiosInstance.get(`/notifications/${user.uid}`),
        ]);

        setOrders(orderRes.data.data || []);
        setNotifications(notifRes.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // ---------------- ONLY MESSAGE UNREAD COUNT ----------------
  const getUnreadMessageCount = (orderId: string) => {
    return notifications.filter(
      (n) =>
        n.orderId === orderId &&
        n.isRead === false &&
        n.type === "message"
    ).length;
  };

  // ---------------- STATUS UPDATE ----------------
  const updateStatus = async (id: string, status: string) => {
    try {
      setUpdatingId(id);

      await axiosInstance.patch(`/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- STATUS COLOR ----------------
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

  // ---------------- CHAT CONDITION ----------------
  const canChat = (status: string) =>
    status === "accepted" ||
    status === "in_progress" ||
    status === "completed";

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Manage Orders
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => {
          const unread = getUnreadMessageCount(order._id);

          return (
            <div
              key={order._id}
              className="relative bg-white border rounded-2xl p-5 shadow-sm"
            >
              {/* HEADER */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {order.gigTitle}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Buyer: {order.buyerName}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* INFO */}
              <div className="mt-4 text-sm">
                <p>💰 ${order.price}</p>
                <p>
                  📅{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex gap-2 flex-wrap">

                {/* ACCEPT */}
                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "accepted")
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Accept
                  </button>
                )}

                {/* START WORK */}
                {order.status === "accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "in_progress")
                    }
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
                  >
                    Start Work
                  </button>
                )}

                {/* COMPLETE */}
                {order.status === "in_progress" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "completed")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                  >
                    Complete
                  </button>
                )}

                {/* 💬 CHAT BUTTON (FIXED) */}
                {canChat(order.status) && (
                  <button
                    onClick={() =>
                      navigate(`/chat/${order._id}`)
                    }
                    className="relative px-4 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center gap-2"
                  >
                    💬 Chat

                    {/* 🔥 ONLY MESSAGE TYPE UNREAD */}
                    {unread > 0 && (
                      <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full animate-pulse">
                        {unread}
                      </span>
                    )}
                  </button>
                )}

                {updatingId === order._id && (
                  <span className="text-sm text-gray-500">
                    Updating...
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageSellerOrders;