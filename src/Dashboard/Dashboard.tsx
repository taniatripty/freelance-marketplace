import { Outlet } from "react-router";
import DashboardSidebar from "./dashboardSilder";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;