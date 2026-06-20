import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";

type Order = {
  _id: string;
  gigTitle: string;
  sellerName: string;
  price: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

const MyPurchaseServices = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(
          `/orders/buyer/${user?.uid}`
        );

        setOrders(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl text-center text-indigo-600 font-bold mb-6">
        My Purchases Services
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl border">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Gig</th>
              <th className="p-4 text-left">Seller</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">
                  {order.gigTitle}
                </td>

                <td className="p-4">
                  {order.sellerName}
                </td>

                <td className="p-4">
                  ${order.price}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                    {order.status}
                  </span>
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                    {order.paymentStatus}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchaseServices;