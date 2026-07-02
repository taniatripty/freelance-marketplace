import DashboardHeader from "../DashboardHome/DashboardHeader";
import StatisticsChart from "./UserLineChart/UserLineChart";



const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />

     <StatisticsChart></StatisticsChart>
    </div>
  );
};

export default AdminDashboard;