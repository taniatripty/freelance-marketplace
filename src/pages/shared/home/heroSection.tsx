
import { ArrowRight, Shield, Zap, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 p-6 ">
        {/* Top Badge */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-600">
              10,000+ Freelancers Ready to Work
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Build Your Dream
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10">Team in Minutes</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 sm:h-4 bg-blue-100 -rotate-1" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Access a curated network of top-tier developers, designers, and creative professionals. 
              Quality talent, vetted and ready.
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <Shield className="text-blue-600" size={20} />
                <span className="text-sm font-medium text-slate-700">Payment Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-amber-500" size={20} />
                <span className="text-sm font-medium text-slate-700">Quick Hiring</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-emerald-600" size={20} />
                <span className="text-sm font-medium text-slate-700">98% Success Rate</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/allfreelancer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-white font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-200"
              >
                Browse Talent
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/becomefreelancer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-8 py-4 text-slate-700 font-semibold hover:border-slate-900 hover:text-slate-900 transition-all"
              >
                Join as Freelancer
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 sm:mt-10 text-sm text-slate-500">
              <p>No credit card required • Free to browse • Hire in minutes</p>
            </div>
          </div>

          {/* Right Column - Image & Stats (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="Professional team collaborating"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Active Now</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                              <img
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                alt=""
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                              />
                            ))}
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-slate-900">847</p>
                            <p className="text-xs text-slate-500">Professionals</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-green-600">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm font-semibold">Live</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Category Badge */}
              <div className="hidden lg:block absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Total Talent</p>
                    <p className="text-xl font-bold text-slate-900">10,000+</p>
                  </div>
                </div>
              </div>

              {/* Bottom Stats Bar */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 sm:p-5 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">25K+</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Projects Done</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 sm:p-5 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">150+</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Categories</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 sm:p-5 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">98%</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </section>
  );
}