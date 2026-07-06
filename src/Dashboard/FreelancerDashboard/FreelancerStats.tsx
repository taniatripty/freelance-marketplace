
import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { useAuth } from "@/AuthContex/UseAuth";
import {
  DollarSign,
  Briefcase,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

interface FreelancerStatsData {
  totalGigs: number;
  totalOrders: number;
  completedOrders: number;
  totalEarnings: number;
}

const FreelancerStats = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState<FreelancerStatsData>({
    totalGigs: 0,
    totalOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const loadStats = async () => {
      try {
        const res = await axiosInstance.get(
          `/stas/freelancerstats/${user.uid}`
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
        <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm text-slate-600">
          Loading statistics...
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings}`,
      icon: DollarSign,
      border: "border-emerald-300 hover:border-emerald-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "My Gigs",
      value: stats.totalGigs,
      icon: Briefcase,
      border: "border-blue-300 hover:border-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      border: "border-orange-300 hover:border-orange-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      icon: CheckCircle,
      border: "border-violet-300 hover:border-violet-500",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 text-center text-indigo-600">
        Freelancer Overview
      </h1>
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`rounded-2xl sm:rounded-3xl border-2 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.border}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl ${card.iconBg}`}
                >
                  <Icon
                    size={24}
                    className={`${card.iconColor} sm:w-7 sm:h-7`}
                  />
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex items-center justify-between">
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

export default FreelancerStats;