// import { useEffect, useState } from "react";
// import {
//   DollarSign,
//   Briefcase,
//   ShoppingCart,
//   CheckCircle,
// } from "lucide-react";

// import axiosInstance from "@/UseAxios/axios";
// import { useAuth } from "@/AuthContex/UseAuth";

// interface FreelancerStats {
//   totalGigs: number;
//   totalOrders: number;
//   completedOrders: number;
//   totalEarnings: number;
// }

// const FreelancerStats = () => {
//   const { user } = useAuth();

//   const [stats, setStats] = useState<FreelancerStats>({
//     totalGigs: 0,
//     totalOrders: 0,
//     completedOrders: 0,
//     totalEarnings: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.uid) return;

//     const fetchStats = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/stas/freelancerstats/${user.uid}`
//         );

//         setStats(res.data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [user?.uid]);

//   if (loading) {
//     return (
//       <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
//         {[1, 2, 3, 4].map((item) => (
//           <div
//             key={item}
//             className="h-36 rounded-2xl bg-gray-100 animate-pulse"
//           />
//         ))}
//       </div>
//     );
//   }

//   const cards = [
//     {
//       title: "Total Earnings",
//       value: `$${stats.totalEarnings}`,
//       icon: DollarSign,
//       bg: "bg-green-100",
//       color: "text-green-600",
//     },
//     {
//       title: "My Gigs",
//       value: stats.totalGigs,
//       icon: Briefcase,
//       bg: "bg-blue-100",
//       color: "text-blue-600",
//     },
//     {
//       title: "Total Orders",
//       value: stats.totalOrders,
//       icon: ShoppingCart,
//       bg: "bg-orange-100",
//       color: "text-orange-600",
//     },
//     {
//       title: "Completed Orders",
//       value: stats.completedOrders,
//       icon: CheckCircle,
//       bg: "bg-purple-100",
//       color: "text-purple-600",
//     },
//   ];

//   return (
//    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
//   {cards.map((card) => {
//     const Icon = card.icon;

//     return (
//       <div
//         key={card.title}
//         className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl"
//       >
//         {/* Grid Background */}
//         <div
//           className="absolute inset-0 opacity-40"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right,#e5e7eb 1px,transparent 1px),
//               linear-gradient(to bottom,#e5e7eb 1px,transparent 1px)
//             `,
//             backgroundSize: "26px 26px",
//           }}
//         />

//         {/* Colored Glow */}
//         <div
//           className={`absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:opacity-40 ${card.bg}`}
//         />

//         <div className="relative z-10">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-500">
//                 {card.title}
//               </p>

//               <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
//                 {card.value}
//               </h2>
//             </div>

//             <div
//               className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg} shadow-sm transition-all duration-300 group-hover:scale-110`}
//             >
//               <Icon
//                 size={28}
//                 className={card.color}
//               />
//             </div>
//           </div>

//           <div className="mt-8 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />

//               <span className="text-xs text-slate-500">
//                 Live statistics
//               </span>
//             </div>

//             <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
//               <div className="h-full w-2/3 rounded-full bg-indigo-500 transition-all duration-700 group-hover:w-full" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   })}
// </div>
//   );
// };

// export default FreelancerStats;

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

  const [stats, setStats] =
    useState<FreelancerStatsData>({
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
        Loading statistics...
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
    <div className="max-w-6xl mx-auto px-4 ">
    <h1 className="text-3xl font-black mb-8 text-center text-indigo-600">Freelancer Overview</h1>
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

export default FreelancerStats;