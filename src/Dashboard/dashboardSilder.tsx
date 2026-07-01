
import useCurrentUser from "@/hooks/UserRoles";
import { useAuth } from "@/AuthContex/UseAuth";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Star,
  Briefcase,
  PlusCircle,
  ClipboardList,
  Wallet,
  Users,
  FolderKanban,
  Package,
  LogOut,
  
  BadgeCheck
 
} from "lucide-react";

const DashboardSidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all font-medium ${
      isActive
        ? "bg-indigo-600 text-white shadow"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b">
        <NavLink
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          FreelanceHub
        </NavLink>

        {currentUser?.role && (
          <div className="mt-3">
            <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 capitalize">
              {currentUser.role}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-5 space-y-2">
        <NavLink to="/dashboard" end className={navClass}>
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={navClass}
        >
          <User size={18} />
          <span>Profile</span>
        </NavLink>

        {/* CLIENT */}
        {currentUser?.role === "client" && (
          <>

          

            <NavLink
              to="/dashboard/mypurchase"
              className={navClass}
            >
              <ShoppingBag size={18} />
              <span>My Purchases</span>
            </NavLink>
           <NavLink
              to="/dashboard/completedorders"
              className={navClass}
            >
              <BadgeCheck size={18} />
              <span>Completed Orders</span>
            </NavLink>
             <NavLink
              to="/dashboard/buyerpayment"
              className={navClass}
            >
              <Wallet size={18} />
              <span>Total Payment</span>
            </NavLink>

            <NavLink
              to="/dashboard/myreviews"
              className={navClass}
            >
              <Star size={18} />
              <span>My Reviews</span>
            </NavLink>
          </>
        )}

        {/* FREELANCER */}
        {currentUser?.role === "freelancer" && (
          <>
            <NavLink
              to="/dashboard/myallgigs"
              className={navClass}
            >
              <Briefcase size={18} />
              <span>My Gigs</span>
            </NavLink>

            <NavLink
              to="/dashboard/createGig"
              className={navClass}
            >
              <PlusCircle size={18} />
              <span>Create Gig</span>
            </NavLink>

            <NavLink
              to="/dashboard/managesellerOrder"
              className={navClass}
            >
              <ClipboardList size={18} />
              <span>Manage Orders</span>
            </NavLink>

            <NavLink
              to="/dashboard/myearning"
              className={navClass}
            >
              <Wallet size={18} />
              <span>Earnings</span>
            </NavLink>
          </>
        )}

        {/* ADMIN */}
        {currentUser?.role === "admin" && (
          <>
            <NavLink
              to="/dashboard/users"
              className={navClass}
            >
              <Users size={18} />
              <span>Manage Users</span>
            </NavLink>

            <NavLink
              to="/dashboard/gigs"
              className={navClass}
            >
              <FolderKanban size={18} />
              <span>Manage Gigs</span>
            </NavLink>

            <NavLink
              to="/dashboard/manageorder"
              className={navClass}
            >
              <Package size={18} />
              <span>Manage Orders</span>
            </NavLink>
            <NavLink
              to="/dashboard/allreviews"
              className={navClass}
            >
              <Package size={18} />
              <span>All Reviews</span>
            </NavLink>
          </>
        )}
      </div>

      {/* Logout */}
      <div className="p-5 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;