
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import {
  ArrowLeft,
  ShoppingBag,
  Calendar,
  DollarSign,
  
} from "lucide-react";

type OrderStatus =
  | "pending"
  | "accepted"
  | "in-progress"
  | "delivered"
  | "completed"
  | "cancelled_by_buyer"
  | "cancelled_by_seller"
  | "suspended";

type Order = {
  _id: string;
  status: OrderStatus;
  price: number;
  createdAt: string;
  gigTitle: string;
  gigImage: string;
  deliveryDays: number;
  buyer: {
    uid?: string;
    name?: string;
    email?: string;
    photoURL?: string;
  };
  seller: {
    uid?: string;
    name?: string;
    email?: string;
    photoURL?: string;
  };
};

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["admin-order-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/orders/admin/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center text-red-500">
        Order not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">Order Details</h1>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <SummaryItem
            icon={<ShoppingBag className="text-indigo-600" />}
            label="Gig"
            value={order.gigTitle}
          />
          <SummaryItem
            icon={<DollarSign className="text-green-600" />}
            label="Price"
            value={`$${order.price}`}
          />
          <SummaryItem
            icon={<Calendar className="text-orange-500" />}
            label="Delivery"
            value={`${order.deliveryDays} Days`}
          />

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                order.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : order.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "suspended"
                  ? "bg-red-100 text-red-700"
                  : order.status === "cancelled_by_buyer" ||
                    order.status === "cancelled_by_seller"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UserCard
          title="Buyer"
          name={order.buyer?.name ?? "Unknown Buyer"}
          email={order.buyer?.email ?? "No email"}
          photo={order.buyer?.photoURL}
        />

        <UserCard
          title="Seller"
          name={order.seller?.name ?? "Unknown Seller"}
          email={order.seller?.email ?? "No email"}
          photo={order.seller?.photoURL}
        />
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-semibold">Gig Information</h2>

        <div className="flex flex-col gap-8 lg:flex-row">
          <img
            src={order.gigImage || "https://via.placeholder.com/600x400"}
            alt={order.gigTitle}
            className="h-80 w-full rounded-xl object-cover lg:w-80"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-bold">{order.gigTitle}</h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
             
              <InfoBox label="Delivery Time" value={`${order.deliveryDays} Days`} />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default OrderDetails;

const SummaryItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const UserCard = ({
  title,
  name,
  email,
  photo,
}: {
  title: string;
  name: string;
  email: string;
  photo?: string;
}) => (
  <div className="rounded-2xl border bg-white p-6 shadow">
    <h2 className="mb-5 text-lg font-semibold">{title}</h2>
    <div className="flex items-center gap-4">
      <img
        src={photo || "https://via.placeholder.com/80"}
        alt={name}
        className="h-20 w-20 rounded-full object-cover"
      />
      <div>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-gray-500">{email}</p>
      </div>
    </div>
  </div>
);

const InfoBox = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-slate-50 p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-2 font-semibold text-slate-900">{value}</p>
  </div>
);