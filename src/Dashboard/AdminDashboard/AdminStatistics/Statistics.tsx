

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