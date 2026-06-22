


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

   const handlePayment = (order: Order) => {
  navigate(`/payment/${order._id}`, {
    state: {
      orderId: order._id,
      gigTitle: order.gigTitle,
      sellerName: order.sellerName,
      amount: order.price,
    },
  });
};

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
  onClick={() =>handlePayment (order)}
  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2"
>
  💳 Pay Now
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