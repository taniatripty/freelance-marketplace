
import axiosInstance from "@/UseAxios/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Statistics = {
  users: {
    total: number;
    client: number;
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

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

const StatisticsChart = () => {
  const { data, isLoading } = useQuery<Statistics>({
    queryKey: ["admin-statistics"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "https://freelancemarketplace-server.vercel.app/stas/admin",
      );
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-500">
        Loading chart...
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

  const userData = [
    { name: "client", value: data.users.client },
    { name: "Freelancers", value: data.users.freelancers },
    { name: "Admins", value: data.users.admins },
  ];

  const orderData = [
    { name: "Completed", value: data.orders.completed },
    { name: "Cancelled", value: data.orders.cancelled },
    { name: "Suspended", value: data.orders.suspended },
    { name: "Accepted", value: data.orders.accepted },
    { name: "Delivered", value: data.orders.delivered },
    { name: "In Progress", value: data.orders.inProgress },
    { name: "Pending", value: data.orders.pending },
  ];

  return (
    <div className="grid gap-6 px-4 sm:px-6 lg:px-8">
      {/* Users Distribution */}
      <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
        <h2 className="mb-1 text-base sm:text-xl font-semibold text-slate-900">
          Users Distribution
        </h2>
        <p className="mb-4 sm:mb-5 text-xs sm:text-sm text-slate-500">
          Breakdown of buyers, freelancers, and admins.
        </p>

        <div className="h-[280px] sm:h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {userData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px',
                  paddingTop: '10px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Status */}
      <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm">
        <h2 className="mb-1 text-base sm:text-xl font-semibold text-slate-900">
          Orders Status
        </h2>
        <p className="mb-4 sm:mb-5 text-xs sm:text-sm text-slate-500">
          Order status breakdown from your dashboard data.
        </p>

        <div className="h-[280px] sm:h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={orderData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 11 }}
                width={30}
              />
              <Tooltip />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '12px',
                  paddingTop: '10px'
                }} 
              />
              <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;