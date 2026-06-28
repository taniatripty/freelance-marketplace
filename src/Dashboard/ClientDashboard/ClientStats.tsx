import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import {
  ShoppingBag,
  CheckCircle,
  Clock3,
  Wallet,
} from "lucide-react";

interface ClientStatsData {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalSpent: number;
}

const ClientStats = () => {
  const { user } = useAuth();

  const [stats, setStats] =
    useState<ClientStatsData>({
      totalOrders: 0,
      completedOrders: 0,
      pendingOrders: 0,
      totalSpent: 0,
    });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const loadStats = async () => {
      try {
        const res = await axiosInstance.get(
          `/stas/clientstats/${user.uid}`
        );

        setStats(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        Loading statistics...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      border: "border-blue-300 hover:border-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Completed Orders",
      value: stats.completedOrders,
      icon: CheckCircle,
      border:
        "border-emerald-300 hover:border-emerald-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock3,
      border:
        "border-orange-300 hover:border-orange-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent}`,
      icon: Wallet,
      border:
        "border-violet-300 hover:border-violet-500",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];

  return (
   <div className="max-w-6xl mx-auto px-4 ">
    <h1 className="text-3xl font-black mb-8 text-center text-indigo-600">Client Overview</h1>
     <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`rounded-3xl border-2 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.border}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-4 text-4xl font-bold text-slate-900">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg}`}
              >
                <Icon
                  size={28}
                  className={card.iconColor}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Updated just now
              </span>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>

                <span className="text-xs font-medium text-green-600">
                  Live
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
   </div>
  );
};

export default ClientStats;