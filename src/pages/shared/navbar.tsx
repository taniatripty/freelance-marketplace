import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          FreelanceHub
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/jobs"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/freelancers"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Freelancers
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
