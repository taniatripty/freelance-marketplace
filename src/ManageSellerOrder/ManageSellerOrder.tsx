
import { useAuth } from "@/AuthContex/UseAuth";
import axiosInstance from "@/UseAxios/axios";
import { useEffect, useState } from "react";
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
        n.orderId === orderId && n.isRead === false && n.type === "message",
    ).length;
  };

  // ---------------- STATUS UPDATE ----------------
  const updateStatus = async (id: string, status: string) => {
    try {
      setUpdatingId(id);

      await axiosInstance.patch(`/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- SELLER CANCEL ORDER ----------------
  const cancelOrder = async (id: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      setUpdatingId(id);

      await axiosInstance.patch(`/orders/seller-cancel/${id}`, {
        sellerId: user?.uid,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                status: "cancelled_by_seller",
              }
            : order,
        ),
      );

      alert("Order cancelled successfully");
    } catch (error: any) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to cancel order");
    } finally {
      setUpdatingId(null);
    }
  };

  // ---------------- STATUS COLOR ----------------
  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-700";

      case "accepted":
        return "text-blue-700";

      case "in_progress":
        return "text-purple-700";

      case "completed":
        return "text-green-700";

      case "cancelled_by_buyer":
      case "cancelled_by_seller":
        return "text-red-700";

      default:
        return "text-gray-600";
    }
  };

  // ---------------- CHAT CONDITION ----------------
  const canChat = (status: string) =>
    status === "accepted" || status === "in_progress" || status === "completed";

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="inline-block rounded-2xl border bg-white px-6 py-4 shadow-sm">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <p className="text-lg font-semibold text-gray-700">No orders yet</p>
            <p className="mt-2 text-sm text-gray-500">
              You'll see your orders here when buyers purchase your gigs.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {orders.map((order) => {
            const unread = getUnreadMessageCount(order._id);

            return (
              <div
                key={order._id}
                className="relative bg-white border rounded-2xl p-4 sm:p-5 shadow-sm"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base sm:text-lg font-semibold truncate">
                      {order.gigTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Buyer: {order.buyerName}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold capitalize whitespace-nowrap ${statusColor(
                      order.status,
                    )}`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>

                {/* INFO */}
                <div className="mt-4 text-xs sm:text-sm space-y-1">
                  <p className="font-medium text-gray-700">
                    💰 ${order.price}
                  </p>
                  <p className="text-gray-500">
                    📅 {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {/* ACCEPT */}
                  {order.status === "pending" && (
                    <button
                      onClick={() => updateStatus(order._id, "accepted")}
                      disabled={updatingId === order._id}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Accept
                    </button>
                  )}

                  {/* START WORK */}
                  {order.status === "accepted" && (
                    <button
                      onClick={() => updateStatus(order._id, "in_progress")}
                      disabled={updatingId === order._id}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Start Work
                    </button>
                  )}

                  {/* COMPLETE */}
                  {order.status === "in_progress" && (
                    <button
                      onClick={() => updateStatus(order._id, "completed")}
                      disabled={updatingId === order._id}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Complete
                    </button>
                  )}

                  {/* 💬 CHAT BUTTON */}
                  {canChat(order.status) && (
                    <button
                      onClick={() => navigate(`/chat/${order._id}`)}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2"
                    >
                      💬 Chat
                      {/* 🔥 ONLY MESSAGE TYPE UNREAD */}
                      {unread > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse min-w-[20px] text-center">
                          {unread}
                        </span>
                      )}
                    </button>
                  )}
                  
                  {/* CANCEL ORDER */}
                  {(order.status === "pending" || order.status === "accepted") &&
                    order.paymentStatus !== "paid" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        disabled={updatingId === order._id}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                    )}
                    
                  {updatingId === order._id && (
                    <span className="text-xs text-gray-500 flex items-center">
                      Updating...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageSellerOrders;