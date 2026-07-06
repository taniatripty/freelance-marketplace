
import { Outlet } from "react-router";
import DashboardSidebar from "./dashboardSilder";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-slate-200"
      >
        {sidebarOpen ? (
          <X size={24} className="text-slate-700" />
        ) : (
          <Menu size={24} className="text-slate-700" />
        )}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <DashboardSidebar />
      </div>

      {/* Content */}
      <div className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;