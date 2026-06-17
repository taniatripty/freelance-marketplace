

// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [mobileMenu, setMobileMenu] = useState(false);

//   const projectTitle = "FreelanceHub";

//   const linkClass = ({ isActive }: any) =>
//     isActive
//       ? "text-indigo-400 font-semibold"
//       : "hover:text-indigo-300 transition";

//   const links = (
//     <>
//       <NavLink to="/" className={linkClass}>
//         Home
//       </NavLink>

//       <NavLink to="/aboutus" className={linkClass}>
//         About
//       </NavLink>

//       <NavLink to="/allarticle" className={linkClass}>
//         Articles
//       </NavLink>

//       <NavLink to="/entertainment" className={linkClass}>
//         Entertainment
//       </NavLink>
//     </>
//   );

//   return (
//     <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between px-4 py-3">

//         {/* LEFT - Mobile button + Title */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="lg:hidden text-xl"
//           >
//             ☰
//           </button>

//           {/* Project Title (shown everywhere) */}
//           <Link
//             to="/"
//             className="text-xl font-bold text-indigo-400"
//           >
//             {projectTitle}
//           </Link>
//         </div>

//         {/* CENTER - Desktop links */}
//         <div className="hidden lg:flex gap-6">
//           {links}
//         </div>

//         {/* RIGHT - Auth buttons (placeholder) */}
//         <div className="hidden lg:flex gap-3">
//           <Link to="/login" className="border px-3 py-1 rounded">
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="bg-indigo-600 px-3 py-1 rounded"
//           >
//             Register
//           </Link>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileMenu && (
//         <div className="lg:hidden bg-gray-800 px-4 py-4 flex flex-col gap-3">

//           {/* Title in mobile */}
//           <div className="text-lg font-bold text-indigo-400 pb-2 border-b border-gray-700">
//             {projectTitle}
//           </div>

//           {/* Links */}
//           {links}

//           {/* Auth */}
//           <div className="flex gap-3 pt-3">
//             <Link to="/login" className="border px-3 py-1 rounded">
//               Login
//             </Link>

//             <Link
//               to="/register"
//               className="bg-indigo-600 px-3 py-1 rounded"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useAuth } from "@/AuthContex/UseAuth";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";



const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user, logOut } = useAuth();

  const projectTitle = "FreelanceHub";

  const linkClass = ({ isActive }: any) =>
    isActive
      ? "text-indigo-400 font-semibold"
      : "hover:text-indigo-300 transition";

  const links = (
    <>
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>

      <NavLink to="/aboutus" className={linkClass}>
        About
      </NavLink>

      <NavLink to="/becomefreelancer" className={linkClass}>
        Become a Freelancer
      </NavLink>

      <NavLink to="/entertainment" className={linkClass}>
        Entertainment
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-xl"
          >
            ☰
          </button>

          <Link
            to="/"
            className="text-xl font-bold text-indigo-400"
          >
            {projectTitle}
          </Link>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex gap-6">{links}</div>

        {/* RIGHT (AUTH SECTION UPDATED) */}
        <div className="hidden lg:flex gap-3 items-center">
          {user ? (
            <>
              <div className="text-right leading-tight">
                <p className="text-sm font-semibold">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-300">
                  {user.email}
                </p>
              </div>

              <button
                onClick={logOut}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border px-3 py-1 rounded"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 px-3 py-1 rounded"
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

          {/* AUTH MOBILE */}
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-700">
            {user ? (
              <>
                <div>
                  <p className="font-semibold">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={logOut}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border px-3 py-1 rounded"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 px-3 py-1 rounded"
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