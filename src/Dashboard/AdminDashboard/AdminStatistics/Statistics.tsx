// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "@/UseAxios/axios";
// import {
//   Users,
//   UserCheck,
//   Shield,
//   FolderKanban,
//   Package,
//   Star,
//   ShoppingBag,
// } from "lucide-react";

// type Statistics = {
//   users: {
//     total: number;
//     buyers: number;
//     freelancers: number;
//     admins: number;
//   };

//   gigs: {
//     total: number;
//     active: number;
//     pending: number;
//     suspended: number;
//     deleted: number;
//   };

//   orders: {
//     total: number;
//     pending: number;
//     accepted: number;
//     inProgress: number;
//     delivered: number;
//     completed: number;
//     cancelled: number;
//     suspended: number;
//   };

//   reviews: {
//     total: number;
//     averageRating: number;
//   };
// };

// const Statistics = () => {
//   const { data, isLoading } = useQuery<Statistics>({
//     queryKey: ["admin-statistics"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/stas/admin");
//       return res.data.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         Loading statistics...
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="text-center py-20">
//         Failed to load statistics.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10">

//       <div>
//         <h1 className="text-3xl font-bold text-slate-800">
//           Dashboard Statistics
//         </h1>

//         <p className="text-slate-500 mt-2">
//           Overview of your marketplace.
//         </p>
//       </div>

//       {/* USERS */}

//       <section>

//         <h2 className="text-xl font-semibold mb-5">
//           Users
//         </h2>

//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

//           <StatCard
//             title="Total Users"
//             value={data.users.total}
//             color="bg-indigo-100 text-indigo-700"
//             icon={<Users size={22} />}
//           />

//           <StatCard
//             title="Buyers"
//             value={data.users.buyers}
//             color="bg-green-100 text-green-700"
//             icon={<ShoppingBag size={22} />}
//           />

//           <StatCard
//             title="Freelancers"
//             value={data.users.freelancers}
//             color="bg-blue-100 text-blue-700"
//             icon={<UserCheck size={22} />}
//           />

//           <StatCard
//             title="Admins"
//             value={data.users.admins}
//             color="bg-red-100 text-red-700"
//             icon={<Shield size={22} />}
//           />

//         </div>

//       </section>

//       {/* GIGS */}

//       <section>

//         <h2 className="text-xl font-semibold mb-5">
//           Gigs
//         </h2>

//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

//           <StatCard
//             title="Total Gigs"
//             value={data.gigs.total}
//             color="bg-indigo-100 text-indigo-700"
//             icon={<FolderKanban size={22} />}
//           />

//           <StatCard
//             title="Active"
//             value={data.gigs.active}
//             color="bg-green-100 text-green-700"
//           />

//           <StatCard
//             title="Pending"
//             value={data.gigs.pending}
//             color="bg-yellow-100 text-yellow-700"
//           />

//           <StatCard
//             title="Suspended"
//             value={data.gigs.suspended}
//             color="bg-red-100 text-red-700"
//           />

//           <StatCard
//             title="Deleted"
//             value={data.gigs.deleted}
//             color="bg-gray-100 text-gray-700"
//           />

//         </div>

//       </section>

//       {/* ORDERS */}

//       <section>

//         <h2 className="text-xl font-semibold mb-5">
//           Orders
//         </h2>

//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

//           <StatCard
//             title="Total Orders"
//             value={data.orders.total}
//             color="bg-indigo-100 text-indigo-700"
//             icon={<Package size={22} />}
//           />

//           <StatCard
//             title="Pending"
//             value={data.orders.pending}
//             color="bg-yellow-100 text-yellow-700"
//           />

//           <StatCard
//             title="Accepted"
//             value={data.orders.accepted}
//             color="bg-blue-100 text-blue-700"
//           />

//           <StatCard
//             title="In Progress"
//             value={data.orders.inProgress}
//             color="bg-cyan-100 text-cyan-700"
//           />

//           <StatCard
//             title="Delivered"
//             value={data.orders.delivered}
//             color="bg-purple-100 text-purple-700"
//           />

//           <StatCard
//             title="Completed"
//             value={data.orders.completed}
//             color="bg-green-100 text-green-700"
//           />

//           <StatCard
//             title="Cancelled"
//             value={data.orders.cancelled}
//             color="bg-orange-100 text-orange-700"
//           />

//           <StatCard
//             title="Suspended"
//             value={data.orders.suspended}
//             color="bg-red-100 text-red-700"
//           />

//         </div>

//       </section>

//       {/* REVIEWS */}

//       <section>

//         <h2 className="text-xl font-semibold mb-5">
//           Reviews
//         </h2>

//         <div className="grid gap-6 md:grid-cols-2">

//           <StatCard
//             title="Total Reviews"
//             value={data.reviews.total}
//             color="bg-indigo-100 text-indigo-700"
//             icon={<Star size={22} />}
//           />

//           <StatCard
//             title="Average Rating"
//             value={data.reviews.averageRating}
//             color="bg-yellow-100 text-yellow-700"
//             icon={<Star size={22} />}
//           />

//         </div>

//       </section>

//     </div>
//   );
// };

// export default Statistics;

// type StatCardProps = {
//   title: string;
//   value: number | string;
//   color: string;
//   icon?: React.ReactNode;
// };

// const StatCard = ({
//   title,
//   value,
//   color,
//   icon,
// }: StatCardProps) => (
//   <div className="rounded-2xl border bg-white shadow-sm p-6 hover:shadow-md transition">

//     <div className="flex justify-between items-center">

//       <div>

//         <p className="text-gray-500 text-sm">
//           {title}
//         </p>

//         <h2 className="text-3xl font-bold mt-2">
//           {value}
//         </h2>

//       </div>

//       {icon && (
//         <div className={`p-3 rounded-xl ${color}`}>
//           {icon}
//         </div>
//       )}

//     </div>

//   </div>
// );

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import {
  Users,
  UserCheck,
  Shield,
  FolderKanban,
  Package,
  Star,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Statistics = {
  users: {
    total: number;
    buyers: number;
    freelancers: number;
    admins: number;
  };
  gigs: {
    total: number;
    active: number;
    pending: number;
    suspended: number;
    deleted: number;
  };
  orders: {
    total: number;
    pending: number;
    accepted: number;
    inProgress: number;
    delivered: number;
    completed: number;
    cancelled: number;
    suspended: number;
  };
  reviews: {
    total: number;
    averageRating: number;
  };
};

const Statistics = () => {
  const { data, isLoading } = useQuery<Statistics>({
    queryKey: ["admin-statistics"],
    queryFn: async () => {
      const res = await axiosInstance.get("/stas/admin");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-slate-500">
        Loading statistics...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center text-slate-500">
        Failed to load statistics.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Statistics</h1>
        
      </div>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-slate-800">Users</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Users" value={data.users.total} icon={Users} accent="indigo" />
          <StatCard title="Buyers" value={data.users.buyers} icon={ShoppingBag} accent="emerald" />
          <StatCard title="Freelancers" value={data.users.freelancers} icon={UserCheck} accent="blue" />
          <StatCard title="Admins" value={data.users.admins} icon={Shield} accent="rose" />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-slate-800">Gigs</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <StatCard title="Total Gigs" value={data.gigs.total} icon={FolderKanban} accent="indigo" />
          <StatCard title="Active" value={data.gigs.active} icon={FolderKanban} accent="emerald" />
          <StatCard title="Pending" value={data.gigs.pending} icon={FolderKanban} accent="amber" />
          <StatCard title="Suspended" value={data.gigs.suspended} icon={FolderKanban} accent="rose" />
          <StatCard title="Deleted" value={data.gigs.deleted} icon={FolderKanban} accent="slate" />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-slate-800">Orders</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Orders" value={data.orders.total} icon={Package} accent="indigo" />
          <StatCard title="Pending" value={data.orders.pending} icon={Package} accent="amber" />
          <StatCard title="Accepted" value={data.orders.accepted} icon={Package} accent="blue" />
          <StatCard title="In Progress" value={data.orders.inProgress} icon={Package} accent="cyan" />
          <StatCard title="Delivered" value={data.orders.delivered} icon={Package} accent="violet" />
          <StatCard title="Completed" value={data.orders.completed} icon={Package} accent="emerald" />
          <StatCard title="Cancelled" value={data.orders.cancelled} icon={Package} accent="orange" />
          <StatCard title="Suspended" value={data.orders.suspended} icon={Package} accent="rose" />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-slate-800">Reviews</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <StatCard title="Total Reviews" value={data.reviews.total} icon={Star} accent="indigo" />
          <StatCard title="Average Rating" value={data.reviews.averageRating} icon={Star} accent="amber" />
        </div>
      </section>
    </div>
  );
};

export default Statistics;

type Accent =
  | "indigo"
  | "emerald"
  | "blue"
  | "rose"
  | "amber"
  | "slate"
  | "cyan"
  | "violet"
  | "orange";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  accent: Accent;
};

const accentMap: Record<
  Accent,
  { border: string; bg: string; iconBg: string; icon: string; value: string; glow: string }
> = {
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-indigo-100",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-emerald-100",
  },
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    iconBg: "bg-blue-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-blue-100",
  },
  rose: {
    border: "border-rose-200",
    bg: "bg-rose-50",
    iconBg: "bg-rose-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-rose-100",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    iconBg: "bg-amber-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-amber-100",
  },
  slate: {
    border: "border-slate-200",
    bg: "bg-slate-50",
    iconBg: "bg-slate-700",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-slate-100",
  },
  cyan: {
    border: "border-cyan-200",
    bg: "bg-cyan-50",
    iconBg: "bg-cyan-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-cyan-100",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50",
    iconBg: "bg-violet-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-violet-100",
  },
  orange: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    iconBg: "bg-orange-600",
    icon: "text-white",
    value: "text-slate-900",
    glow: "hover:shadow-orange-100",
  },
};

const StatCard = ({ title, value, icon: Icon, accent }: StatCardProps) => {
  const styles = accentMap[accent];

  return (
    <div
      className={`group rounded-2xl border ${styles.border} ${styles.bg} p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${styles.glow}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className={`mt-2 text-3xl font-bold tracking-tight ${styles.value}`}>
            {value}
          </h2>
        </div>

        <div className={`rounded-2xl ${styles.iconBg} p-3 shadow-sm transition duration-300 group-hover:scale-105`}>
          <Icon size={20} className={styles.icon} />
        </div>
      </div>
    </div>
  );
};