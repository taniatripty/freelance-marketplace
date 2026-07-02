import { useAuth } from "@/AuthContex/UseAuth";
import useCurrentUser from "@/hooks/UserRoles";
import NotificationBell from "@/Notification/Notification";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user, logOut } = useAuth();
  const { data: currentUser } = useCurrentUser();

  const projectTitle = "FreelanceHub";

  const linkClass = ({ isActive }: any) =>
    isActive ? "text-indigo-400" : "hover:text-indigo-300 transition";

  const links = (
    <>
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>

      <NavLink to="/aboutus" className={linkClass}>
        About
      </NavLink>
      <NavLink to="/blog" className={linkClass}>
        Blog
      </NavLink>

      {/* Only Guest + Client */}
      {(!currentUser || currentUser?.role === "client") && (
        <NavLink to="/becomefreelancer" className={linkClass}>
          Become a Freelancer
        </NavLink>
      )}

      <NavLink to="/allfreelancer" className={linkClass}>
        All Freelancer
      </NavLink>

      <NavLink to="/allservices" className={linkClass}>
        Our All Services
      </NavLink>

      <NavLink to="/categorytable" className={linkClass}>
        All Category
      </NavLink>

      <NavLink to="/websitereview" className={linkClass}>
        Give Review
      </NavLink>

      {user && (
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-2 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-xl"
          >
            ☰
          </button>

          <Link to="/" className="text-xl mr-3 font-bold text-indigo-400">
            {projectTitle}
          </Link>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex gap-5 items-center">{links}</div>

        {/* RIGHT */}
        <div className="hidden lg:flex gap-4 items-center">
          {user ? (
            <>
              <NotificationBell userId={user.uid} />

              <div className="relative group">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 cursor-pointer"
                />

                {/* Tooltip */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {user.displayName || "User"}
                </div>
              </div>

              <button
                onClick={logOut}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border px-3 py-1 rounded hover:bg-gray-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-gray-800 px-4 py-4 flex flex-col gap-3">
          {links}

          <div className="flex flex-col gap-3 pt-3 border-t border-gray-700">
            {user ? (
              <>
                <div className="flex justify-center">
                  <NotificationBell userId={user.uid} />
                </div>

                <div className="relative group">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 cursor-pointer"
                  />

                  {/* Tooltip */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    {user.displayName || "User"}
                  </div>
                </div>

                <button
                  onClick={logOut}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="border px-3 py-2 rounded">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 px-3 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
