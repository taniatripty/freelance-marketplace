import useCurrentUser from "@/hooks/UserRoles";
import { NavLink } from "react-router";


const DashboardSidebar = () => {
  const { data: currentUser } = useCurrentUser();
console.log(currentUser)
  return (
    <aside className="w-64 bg-white border-r p-5">
      <h2 className="text-2xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="space-y-2">

        <NavLink
          to="/dashboard"
          className="block p-2 rounded hover:bg-slate-100"
        >
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className="block p-2 rounded hover:bg-slate-100"
        >
          Profile
        </NavLink>

        {/* BUYER */}
        {currentUser?.role === "buyer" && (
          <>
            <NavLink
              to="/dashboard/purchases"
              className="block p-2 rounded hover:bg-slate-100"
            >
              My Purchases
            </NavLink>

            <NavLink
              to="/dashboard/my-reviews"
              className="block p-2 rounded hover:bg-slate-100"
            >
              My Reviews
            </NavLink>
          </>
        )}

        {/* SELLER */}
        {currentUser?.role === "seller" && (
          <>
            <NavLink
              to="/dashboard/my-gigs"
              className="block p-2 rounded hover:bg-slate-100"
            >
              My Gigs
            </NavLink>

            <NavLink
              to="/dashboard/add-gig"
              className="block p-2 rounded hover:bg-slate-100"
            >
              Add Gig
            </NavLink>

            <NavLink
              to="/dashboard/manage-orders"
              className="block p-2 rounded hover:bg-slate-100"
            >
              Manage Orders
            </NavLink>

            <NavLink
              to="/dashboard/earnings"
              className="block p-2 rounded hover:bg-slate-100"
            >
              Earnings
            </NavLink>
          </>
        )}

        {/* ADMIN */}
        {currentUser?.role === "admin" && (
          <>
            <NavLink
              to="/dashboard/users"
              className="block p-2 rounded hover:bg-slate-100"
            >
              Manage Users
            </NavLink>

            <NavLink
              to="/dashboard/gigs"
              className="block p-2 rounded hover:bg-slate-100"
            >
              Manage Gigs
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              className="block p-2 rounded hover:bg-slate-100"
            >
              Manage Orders
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;