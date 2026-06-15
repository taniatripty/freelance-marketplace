import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full space-y-12">

        {/* Hero Section */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">
            Build. Hire. Deliver.
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            A modern freelance marketplace connecting clients, freelancers, and admins in one ecosystem.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-base-200 shadow hover:shadow-xl transition">
            <div className="text-2xl mb-2">👨‍💼</div>
            <h2 className="text-xl font-semibold">Client</h2>
            <p className="text-sm text-base-content/60 mt-2">
              Post projects, review proposals, and hire the right talent with confidence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-base-200 shadow hover:shadow-xl transition">
            <div className="text-2xl mb-2">👨‍💻</div>
            <h2 className="text-xl font-semibold">Freelancer</h2>
            <p className="text-sm text-base-content/60 mt-2">
              Discover opportunities, submit proposals, and grow your professional profile.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-base-200 shadow hover:shadow-xl transition">
            <div className="text-2xl mb-2">🛡️</div>
            <h2 className="text-xl font-semibold">Admin</h2>
            <p className="text-sm text-base-content/60 mt-2">
              Manage users, monitor activity, and ensure platform trust and quality.
            </p>
          </div>

        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center">

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Why this platform?</h2>

            <div className="space-y-3 text-base-content/70">
              <p>⚡ Fast project matching system</p>
              <p>🔐 Secure authentication & role-based access</p>
              <p>💼 Real-time job workflow (post → apply → deliver)</p>
              <p>📊 Admin control dashboard for full management</p>
            </div>
          </div>

          <div className="bg-base-200 rounded-2xl p-8 shadow">
            <h3 className="text-xl font-semibold mb-3">Built With Modern Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-base-100 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

        </div>

        {/* Footer line */}
        <div className="text-center text-sm text-base-content/50 pt-6">
          © {new Date().getFullYear()} Freelance Marketplace — Built for real-world scaling.
        </div>

      </div>
    </div>
  );
};

export default AboutUs;