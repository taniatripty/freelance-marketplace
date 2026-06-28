import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import {
  DollarSign,
  ShoppingBag,
} from "lucide-react";

interface Order {
  _id: string;
  gigTitle: string;
  buyerName: string;
  buyerPhoto: string;
  price: number;
  platformFee: number;
  sellerEarning: number;
  completedAt: string;
}

interface EarningsResponse {
  totalEarning: number;
  totalOrders: number;
  orders: Order[];
}

const MyEarnings = () => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery<EarningsResponse>({
    queryKey: ["seller-earnings", user?.uid],
    enabled: !!user?.uid,

    queryFn: async () => {
      const res = await axiosInstance.get(
        `/orders/earnings/${user?.uid}`
      );

      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading earnings...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl text-center text-indigo-600 font-bold mb-8">
        My Earnings
      </h1>

      {/* Summary */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow border p-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="text-green-600" />
            </div>

            <div>

              <p className="text-gray-500">
                Total Earnings
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                ${data?.totalEarning || 0}
              </h2>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow border p-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="text-blue-600" />
            </div>

            <div>

              <p className="text-gray-500">
                Completed Orders
              </p>

              <h2 className="text-3xl font-bold">
                {data?.totalOrders || 0}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Orders */}

      <div className="bg-white rounded-2xl border shadow overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold">
            Earnings History
          </h2>

        </div>

        {data?.orders?.length === 0 ? (
          <div className="p-20 text-center text-gray-500">
            No earnings yet.
          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="p-4 text-left">
                    Buyer
                  </th>

                  <th className="p-4 text-left">
                    Gig
                  </th>

                  <th className="p-4">
                    Price
                  </th>

                  

                </tr>

              </thead>

              <tbody>

                {data?.orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        

                        <div>

                          <p className="font-medium">
                            {order.buyerName}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4 font-medium">
                      {order.gigTitle}
                    </td>

                    <td className="p-4 text-center">
                      ${order.price}
                    </td>

                   

                    

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default MyEarnings;