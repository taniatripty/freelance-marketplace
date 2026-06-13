import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">
              FreelanceHub
            </h2>
            <p className="text-sm leading-6">
              Connect with talented freelancers and clients worldwide. Build
              projects, grow your business, and work with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/jobs" className="hover:text-white">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link to="/freelancers" className="hover:text-white">
                  Find Freelancers
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-2">
              <li>
                <Link to="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Newsletter
            </h3>

            <p className="mb-4 text-sm">
              Subscribe to get the latest jobs and freelance opportunities.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border border-slate-700 bg-slate-800 px-3 py-2 outline-none"
              />

              <button className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm">
          © {new Date().getFullYear()} FreelanceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}