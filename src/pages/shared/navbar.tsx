// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-white border-b shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           FreelanceHub
//         </Link>

//         {/* Nav Links */}
//         <ul className="hidden md:flex items-center gap-6">
//           <li>
//             <Link
//               to="/"
//               className="font-medium text-gray-700 hover:text-blue-600"
//             >
//               Home
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/jobs"
//               className="font-medium text-gray-700 hover:text-blue-600"
//             >
//               Jobs
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/freelancers"
//               className="font-medium text-gray-700 hover:text-blue-600"
//             >
//               Freelancers
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/about"
//               className="font-medium text-gray-700 hover:text-blue-600"
//             >
//               About
//             </Link>
//           </li>
//         </ul>

//         {/* Buttons */}
//         <div className="flex items-center gap-3">
//           <Link
//             to="/login"
//             className="rounded-md border px-4 py-2 text-sm font-medium"
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

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

      <NavLink to="/allarticle" className={linkClass}>
        Articles
      </NavLink>

      <NavLink to="/entertainment" className={linkClass}>
        Entertainment
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        {/* LEFT - Mobile button + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-xl"
          >
            ☰
          </button>

          {/* Project Title (shown everywhere) */}
          <Link
            to="/"
            className="text-xl font-bold text-indigo-400"
          >
            {projectTitle}
          </Link>
        </div>

        {/* CENTER - Desktop links */}
        <div className="hidden lg:flex gap-6">
          {links}
        </div>

        {/* RIGHT - Auth buttons (placeholder) */}
        <div className="hidden lg:flex gap-3">
          <Link to="/login" className="border px-3 py-1 rounded">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 px-3 py-1 rounded"
          >
            Register
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-gray-800 px-4 py-4 flex flex-col gap-3">

          {/* Title in mobile */}
          <div className="text-lg font-bold text-indigo-400 pb-2 border-b border-gray-700">
            {projectTitle}
          </div>

          {/* Links */}
          {links}

          {/* Auth */}
          <div className="flex gap-3 pt-3">
            <Link to="/login" className="border px-3 py-1 rounded">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
