

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";

type Order = {
  _id: string;
  gigTitle: string;
  buyerName: string;
  sellerName: string;
  price: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH ORDER ----------------
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id) return;

        const res = await axiosInstance.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusColor = (status: string) => {
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

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 text-red-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">

        {/* LEFT SIDE */}
        <div className="space-y-4 overflow-y-auto">

          <div className="border rounded-xl p-4 bg-white">
            <h2 className="text-lg font-bold">{order.gigTitle}</h2>
            <p className="text-sm text-gray-500">
              Order ID: {order._id}
            </p>

            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>

          <div className="border rounded-xl p-4 bg-white">
            <p><strong>Buyer:</strong> {order.buyerName}</p>
            <p><strong>Seller:</strong> {order.sellerName}</p>
          </div>

          <div className="border rounded-xl p-4 bg-white">
            <p>
              Payment:{" "}
              <span className={order.paymentStatus === "paid" ? "text-green-600" : "text-red-500"}>
                {order.paymentStatus}
              </span>
            </p>

            <p className="text-xl font-bold text-green-600 mt-2">
              ${order.price}
            </p>
          </div>

        </div>

        {/* RIGHT SIDE CHAT BUTTON ONLY */}
        <div className="lg:col-span-2 border rounded-xl bg-white flex items-center justify-center">

          <button
            onClick={() => navigate(`/chat/${order._id}`)}
            className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition"
          >
            💬 Open Chat
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderPage;