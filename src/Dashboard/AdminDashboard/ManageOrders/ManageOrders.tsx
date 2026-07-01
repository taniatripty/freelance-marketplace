// import axiosInstance from "@/UseAxios/axios";
// import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
// import { Ban, Eye, Search } from "lucide-react";
// import { useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";

// type OrderStatus =
//   | "pending"
//   | "accepted"
//   | "in-progress"
//   | "delivered"
//   | "completed"
//   | "cancelled_by_buyer"
//   | "cancelled_by_seller"
//   | "suspended";

// type FilterStatus = "all" | OrderStatus;

// type Order = {
//   _id: string;
//   gigTitle?: string;
//   price: number;
//   buyerName?: string;
//   sellerName?: string;
//   buyerPhoto?: string;
//   sellerPhoto?: string;
//   status: OrderStatus;
//   createdAt: string;
// };

// const ManageOrders = () => {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState<FilterStatus>("all");

//   const { data: orders = [], isLoading } = useQuery<Order[]>({
//     queryKey: ["admin-orders"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/orders/all/admin");
//       return Array.isArray(res.data.data) ? res.data.data : [];
//     },
//   });

//   const suspendMutation = useMutation({
//     mutationFn: async (id: string) => {
//       const res = await axiosInstance.patch(`/orders/admin/${id}/suspend`);

//       return res.data;
//     },

//     onSuccess: () => {
//       toast.success("Order suspended");

//       QueryClient.invalidateQueries({
//         queryKey: ["admin-orders"],
//       });
//     },

//     onError: () => {
//       toast.error("Failed to suspend order");
//     },
//   });
//   const handleSuspend = async (id: string) => {
//     const result = await Swal.fire({
//       title: "Suspend Order?",
//       text: "This order will be suspended.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Suspend",
//     });

//     if (!result.isConfirmed) return;

//     suspendMutation.mutate(id);
//   };

//   const filteredOrders = useMemo(() => {
//     const keyword = search.trim().toLowerCase();

//     return orders.filter((order) => {
//       const title = (order.gigTitle ?? "").toLowerCase();
//       const buyerName = (order.buyerName ?? "").toLowerCase();
//       const sellerName = (order.sellerName ?? "").toLowerCase();

//       const matchSearch =
//         keyword.length === 0 ||
//         title.includes(keyword) ||
//         buyerName.includes(keyword) ||
//         sellerName.includes(keyword);

//       const matchStatus = filter === "all" ? true : order.status === filter;

//       return matchSearch && matchStatus;
//     });
//   }, [orders, search, filter]);

//   const stats = useMemo(
//     () => ({
//       total: orders.length,
//       pending: orders.filter((o) => o.status === "pending").length,
//       progress: orders.filter((o) => o.status === "in-progress").length,
//       completed: orders.filter((o) => o.status === "completed").length,
//       cancelled: orders.filter((o) =>
//         ["cancelled_by_buyer", "cancelled_by_seller"].includes(o.status),
//       ).length,
//       suspended: orders.filter((o) => o.status === "suspended").length,
//     }),
//     [orders],
//   );

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm">
//           Loading Orders...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div className="rounded-3xl border bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-sm">
//         <h1 className="text-3xl font-bold">Manage Orders</h1>
//         <p className="mt-2 text-sm text-indigo-100">
//           Monitor all marketplace orders in one place.
//         </p>
//       </div>

//       <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
//         <StatCard title="Total" value={stats.total} color="text-indigo-600" />
//         <StatCard
//           title="Pending"
//           value={stats.pending}
//           color="text-yellow-500"
//         />
//         <StatCard
//           title="Progress"
//           value={stats.progress}
//           color="text-blue-600"
//         />
//         <StatCard
//           title="Completed"
//           value={stats.completed}
//           color="text-green-600"
//         />
//         <StatCard
//           title="Cancelled"
//           value={stats.cancelled}
//           color="text-gray-600"
//         />
//         <StatCard
//           title="Suspended"
//           value={stats.suspended}
//           color="text-red-600"
//         />
//       </div>

//       <div className="rounded-2xl border bg-white p-4 shadow-sm">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div className="relative w-full md:max-w-sm">
//             <Search
//               size={18}
//               className="absolute left-4 top-3.5 text-gray-400"
//             />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search orders..."
//               className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
//             />
//           </div>

//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value as FilterStatus)}
//             className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white md:w-56"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="accepted">Accepted</option>
//             <option value="in-progress">In Progress</option>
//             <option value="delivered">Delivered</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//             <option value="suspended">Suspended</option>
//           </select>
//         </div>
//       </div>

//       {filteredOrders.length > 0 ? (
//         <div className="grid gap-5">
//           {filteredOrders.map((order) => (
//             <div
//               key={order._id}
//               className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//             >
//               <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//                 <div className="min-w-0 flex-1">
//                   <div className="flex flex-wrap items-center gap-3">
//                     <h3 className="text-lg font-semibold text-slate-900">
//                       {order.gigTitle ?? "Untitled Order"}
//                     </h3>
//                     <StatusBadge status={order.status} />
//                   </div>

//                   <p className="mt-2 text-sm text-slate-500">
//                     Order created on{" "}
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </p>

//                   <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//                     <PersonCard
//                       label="Buyer"
//                       name={order.buyerName ?? "Unknown Buyer"}
//                       photo={order.buyerPhoto}
//                     />
//                     <PersonCard
//                       label="Seller"
//                       name={order.sellerName ?? "Unknown Seller"}
//                       photo={order.sellerPhoto}
//                     />
//                     <div className="rounded-2xl bg-slate-50 p-4">
//                       <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//                         Price
//                       </p>
//                       <p className="mt-2 text-2xl font-bold text-indigo-600">
//                         ${order.price}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
//                   <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600">
//                     <Eye size={16} />
//                     View Details
//                   </button>

//                   <button
//                     onClick={() => handleSuspend(order._id)}
//                     disabled={
//                       order.status === "suspended" ||
//                       order.status === "completed" ||
//                       order.status === "cancelled_by_buyer" ||
//                       order.status === "cancelled_by_seller" ||
//                       suspendMutation.isPending
//                     }
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
//                   >
//                     <Ban size={16} />
//                     {order.status === "suspended" ? "Suspended" : "Suspend"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
//           <p className="text-lg font-semibold text-slate-900">
//             No orders found
//           </p>
//           <p className="mt-2 text-sm text-slate-500">
//             Try changing the search term or status filter.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageOrders;

// type StatCardProps = {
//   title: string;
//   value: number;
//   color: string;
// };

// const StatCard = ({ title, value, color }: StatCardProps) => (
//   <div className="rounded-2xl border bg-white p-5 shadow-sm">
//     <p className="text-sm font-medium text-gray-500">{title}</p>
//     <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
//   </div>
// );

// const StatusBadge = ({ status }: { status: OrderStatus }) => {
//   const styles =
//     status === "pending"
//       ? "bg-yellow-100 text-yellow-700"
//       : status === "accepted"
//         ? "bg-indigo-100 text-indigo-700"
//         : status === "in-progress"
//           ? "bg-blue-100 text-blue-700"
//           : status === "delivered"
//             ? "bg-cyan-100 text-cyan-700"
//             : status === "completed"
//               ? "bg-green-100 text-green-700"
//               : status === "suspended"
//                 ? "bg-red-100 text-red-700"
//                 : "bg-slate-100 text-slate-700";

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles}`}
//     >
//       {status}
//     </span>
//   );
// };
// const PersonCard = ({
//   label,
//   name,
//   photo,
// }: {
//   label: string;
//   name: string;
//   photo?: string;
// }) => (
//   <div className="rounded-2xl bg-slate-50 p-4">
//     <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//       {label}
//     </p>
//     <div className="mt-3 flex items-center gap-3">
//       <img
//         src={photo || "https://via.placeholder.com/40"}
//         alt={name}
//         className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
//       />
//       <p className="font-medium text-slate-900">{name}</p>
//     </div>
//   </div>
// );

import axiosInstance from "@/UseAxios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ban, Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";

type OrderStatus =
  | "pending"
  | "accepted"
  | "in-progress"
  | "delivered"
  | "completed"
  | "cancelled_by_buyer"
  | "cancelled_by_seller"
  | "suspended";

type FilterStatus = "all" | OrderStatus;

type Order = {
  _id: string;
  gigTitle?: string;
  price: number;
  buyerName?: string;
  sellerName?: string;
  buyerPhoto?: string;
  sellerPhoto?: string;
  status: OrderStatus;
  createdAt: string;
};

const ManageOrders = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const queryClient = useQueryClient();
 const navigate=useNavigate()
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/orders/all/admin");
      return Array.isArray(res.data.data) ? res.data.data : [];
    },
  });

  const suspendMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.patch(`/orders/admin/${id}/suspend`);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Order suspended");
      await queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: () => {
      toast.error("Failed to suspend order");
    },
  });

  const handleSuspend = async (id: string) => {
    const result = await Swal.fire({
      title: "Suspend Order?",
      text: "This order will be suspended.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Suspend",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;
    suspendMutation.mutate(id);
  };

  const filteredOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return orders.filter((order) => {
      const title = (order.gigTitle ?? "").toLowerCase();
      const buyerName = (order.buyerName ?? "").toLowerCase();
      const sellerName = (order.sellerName ?? "").toLowerCase();

      const matchSearch =
        keyword.length === 0 ||
        title.includes(keyword) ||
        buyerName.includes(keyword) ||
        sellerName.includes(keyword);

      const matchStatus = filter === "all" ? true : order.status === filter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, filter]);

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      progress: orders.filter((o) => o.status === "in-progress").length,
      completed: orders.filter((o) => o.status === "completed").length,
      cancelled: orders.filter((o) =>
        ["cancelled_by_buyer", "cancelled_by_seller"].includes(o.status),
      ).length,
      suspended: orders.filter((o) => o.status === "suspended").length,
    }),
    [orders],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-sm">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
        <p className="mt-2 text-sm text-indigo-100">
          Monitor all marketplace orders in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <StatCard title="Total" value={stats.total} color="text-indigo-600" />
        <StatCard
          title="Pending"
          value={stats.pending}
          color="text-yellow-500"
        />
        <StatCard
          title="Progress"
          value={stats.progress}
          color="text-blue-600"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          color="text-green-600"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          color="text-gray-600"
        />
        <StatCard
          title="Suspended"
          value={stats.suspended}
          color="text-red-600"
        />
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterStatus)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white md:w-56"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="in-progress">In Progress</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="cancelled_by_buyer">Cancelled by Buyer</option>
            <option value="cancelled_by_seller">Cancelled by Seller</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="grid gap-5">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {order.gigTitle ?? "Untitled Order"}
                    </h3>
                    <StatusBadge status={order.status} />
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Order created on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <PersonCard
                      label="Buyer"
                      name={order.buyerName ?? "Unknown Buyer"}
                      photo={order.buyerPhoto}
                    />
                    <PersonCard
                      label="Seller"
                      name={order.sellerName ?? "Unknown Seller"}
                      photo={order.sellerPhoto}
                    />
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Price
                      </p>
                      <p className="mt-2 text-2xl font-bold text-indigo-600">
                        ${order.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/admin/order/${order._id}`)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  <button
                    onClick={() => handleSuspend(order._id)}
                    disabled={
                      order.status === "suspended" ||
                      order.status === "completed" ||
                      order.status === "cancelled_by_buyer" ||
                      order.status === "cancelled_by_seller" ||
                      suspendMutation.isPending
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <Ban size={16} />
                    {order.status === "suspended" ? "Suspended" : "Suspend"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            No orders found
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Try changing the search term or status filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;

type StatCardProps = {
  title: string;
  value: number;
  color: string;
};

const StatCard = ({ title, value, color }: StatCardProps) => (
  <div className="rounded-2xl border bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
  </div>
);

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const styles =
    status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : status === "accepted"
        ? "bg-indigo-100 text-indigo-700"
        : status === "in-progress"
          ? "bg-blue-100 text-blue-700"
          : status === "delivered"
            ? "bg-cyan-100 text-cyan-700"
            : status === "completed"
              ? "bg-green-100 text-green-700"
              : status === "suspended"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles}`}
    >
      {status}
    </span>
  );
};

const PersonCard = ({
  label,
  name,
  photo,
}: {
  label: string;
  name: string;
  photo?: string;
}) => (
  <div className="rounded-2xl bg-slate-50 p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <div className="mt-3 flex items-center gap-3">
      <img
        src={photo || "https://via.placeholder.com/40"}
        alt={name}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
      />
      <p className="font-medium text-slate-900">{name}</p>
    </div>
  </div>
);
