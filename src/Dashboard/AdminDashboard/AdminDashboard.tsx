
import DashboardHeader from "../DashboardHome/DashboardHeader";
import StatisticsChart from "./UserLineChart/UserLineChart";

const AdminDashboard = () => {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <DashboardHeader />
      <div className="w-full overflow-x-auto">
        <StatisticsChart />
      </div>
    </div>
  );
};

export default AdminDashboard;