import DashboardHeader from "../DashboardHome/DashboardHeader";
import ClientStats from "./ClientStats";


const ClientDashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <ClientStats></ClientStats>

      
    </div>
  );
};

export default ClientDashboard;