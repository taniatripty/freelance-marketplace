import {
  ShieldCheck,
  BadgeDollarSign,
  Clock3,
  Users,
  Headphones,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Freelancers",
    description:
      "Every freelancer goes through profile verification to ensure trust and professionalism.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BadgeDollarSign,
    title: "Secure Payments",
    description:
      "Protected transactions with secure payment processing and milestone-based releases.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock3,
    title: "Fast Delivery",
    description:
      "Hire experts who deliver quality work on time with transparent project tracking.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Users,
    title: "Top Rated Talent",
    description:
      "Discover highly-rated freelancers with proven experience across multiple industries.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available whenever you need assistance.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Quality Guaranteed",
    description:
      "Every completed project is backed by our quality assurance and client satisfaction policy.",
    color: "from-indigo-500 to-violet-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600">
            Why Choose FreelanceHub
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Everything You Need to
            <span className="text-indigo-600">
              {" "}
              Hire & Grow
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            FreelanceHub connects businesses with talented professionals
            worldwide through a secure, reliable, and easy-to-use platform.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >

                {/* Glow */}

                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-100 blur-3xl" />
                </div>

                {/* Icon */}

                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg`}
                >
                  <Icon size={30} />
                </div>

                {/* Content */}

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

                {/* Bottom line */}

                <div className="mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />

              </div>
            );
          })}

        </div>

        {/* Bottom Stats */}

        <div className="mt-24 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-14 text-white shadow-2xl">

          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">

            <div>
              <h3 className="text-4xl font-bold">
                10K+
              </h3>
              <p className="mt-2 text-indigo-100">
                Freelancers
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                25K+
              </h3>
              <p className="mt-2 text-indigo-100">
                Completed Projects
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                4.9★
              </h3>
              <p className="mt-2 text-indigo-100">
                Average Rating
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                99%
              </h3>
              <p className="mt-2 text-indigo-100">
                Client Satisfaction
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}