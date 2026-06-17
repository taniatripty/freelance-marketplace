// import { Link } from "react-router-dom";

// export default function Hero() {
//   return (
//     <section className="bg-slate-50">
//       <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:justify-between">
//         {/* Left Content */}
//         <div className="max-w-2xl">
//           <h1 className="text-xl font-bold leading-tight text-slate-900 md:text-6xl">
//             Find the Perfect
//             <span className="text-blue-600"> Freelancer </span>
//             for Your Project
//           </h1>

//           <p className="mt-6 text-lg text-slate-600">
//             Connect with skilled developers, designers, writers, and marketers.
//             Hire top talent or start earning as a freelancer today.
//           </p>

//           {/* Search Box */}
//           <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//             <input
//               type="text"
//               placeholder="Search services..."
//               className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
//             />

//             <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
//               Search
//             </button>
//           </div>

//           {/* CTA Buttons */}
//           <div className="mt-8 flex gap-4">
//             <Link
//               to="/jobs"
//               className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
//             >
//               Find Work
//             </Link>

//             <Link
//               to="/register"
//               className="rounded-lg border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
//             >
//               Become a Freelancer
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="mt-10 flex flex-wrap gap-8">
//             <div>
//               <h3 className="text-2xl font-bold text-slate-900">10K+</h3>
//               <p className="text-slate-600">Freelancers</p>
//             </div>

//             <div>
//               <h3 className="text-2xl font-bold text-slate-900">5K+</h3>
//               <p className="text-slate-600">Projects Completed</p>
//             </div>

//             <div>
//               <h3 className="text-2xl font-bold text-slate-900">98%</h3>
//               <p className="text-slate-600">Client Satisfaction</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side Image */}
//         <div className=" ">
//           <img
//             src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//             alt="Freelancers working"
//             className="w-full max-w-2xl rounded-2xl shadow-xl"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid min-h-[600px] grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          
          {/* Left Side */}
          <div className="flex flex-col justify-center p-10 lg:p-16">
            <span className="mb-4 w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
              🚀 Trusted by 10,000+ Freelancers
            </span>

            <h1 className="text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
              Hire Top Talent
              <br />
              For Any Project
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Connect with expert developers, designers, writers,
              and marketers from around the world. Build your team
              and launch faster.
            </p>

            {/* Search */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="flex-1 rounded-xl border border-slate-200 px-5 py-4 outline-none focus:border-blue-500"
              />

              <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
                Search
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/jobs"
                className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Find Work
              </Link>

              <Link
                to="/becomefreelancer"
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
              >
                Become a Freelancer
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              <div>
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-slate-500">Freelancers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">25K+</h3>
                <p className="text-slate-500">Projects</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">98%</h3>
                <p className="text-slate-500">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="h-full">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Freelancers"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}