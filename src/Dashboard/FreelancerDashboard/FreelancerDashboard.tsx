import DashboardHeader from "../DashboardHome/DashboardHeader";
import FreelancerStats from "./FreelancerStats";

const FreelancerDashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <FreelancerStats></FreelancerStats>

     
    </div>
  );
};

export default FreelancerDashboard;