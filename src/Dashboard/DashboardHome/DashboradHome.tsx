

import useCurrentUser from "@/hooks/UserRoles";
import ClientDashboard from "../ClientDashboard/ClientDashboard";
import FreelancerDashboard from "../FreelancerDashboard/FreelancerDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";



const DashboardHome = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return 
  }

  switch (currentUser?.role) {
    case "client":
      return <ClientDashboard />;

    case "freelancer":
      return <FreelancerDashboard />;

    case "admin":
      return <AdminDashboard />;

    default:
      return (
        <div className="text-center py-20">
          Invalid User Role
        </div>
      );
  }
};

export default DashboardHome;