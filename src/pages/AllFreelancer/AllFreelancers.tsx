

// import { useEffect, useState } from "react";
// import axiosInstance from "@/UseAxios/axios";
// import { Link } from "react-router";
// import {
//   ArrowRight,
//   Briefcase,
//   Clock,
//   Globe,
//   Star,
//   User,
// } from "lucide-react";

// type Freelancer = {
//   _id: string;
//   name: string;
//   email: string;
//   title: string;
//   bio: string;
//   skills: string[];
//   languages: string[];
//   experience: string;
//   hourlyRate: number;
//   photoURL?: string;
// };

// const AllFreelancers = () => {
//   const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchFreelancers = async () => {
//       try {
//         setLoading(true);

//         const res = await axiosInstance.get("/freelancer");

//         setFreelancers(res.data?.data || []);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFreelancers();
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className="h-96 rounded-3xl animate-pulse bg-slate-200"
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <section className="bg-slate-50 min-h-screen py-16">

//       <div className="max-w-7xl mx-auto px-5">

//         <div className="text-center mb-14">

//           <h1 className="text-5xl font-bold">
//             Browse Freelancers
//           </h1>

//           <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
//             Discover talented freelancers from different industries.
//             Hire professionals based on their skills, experience,
//             languages, and hourly rate.
//           </p>

//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {freelancers.map((f) => (

//             <div
//               key={f._id}
//               className="group rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
//             >


             

//               <div className="p-6 text-center">

//                 <h2 className="text-xl font-bold">
//                   {f.name}
//                 </h2>

//                 <p className="text-sm text-slate-500 mt-1">
//                   {f.email}
//                 </p>

//                 <p className="mt-3 text-indigo-600 font-semibold">
//                   {f.title}
//                 </p>

//                 <p className="text-sm text-slate-500 mt-3 line-clamp-3 leading-6">
//                   {f.bio}
//                 </p>

//                 {/* Stats */}

//                 <div className="grid grid-cols-3 gap-3 mt-6">

//                   <div className="rounded-xl bg-yellow-50 p-3">

//                     <Star
//                       size={18}
//                       fill="currentColor"
//                       className="mx-auto text-yellow-500"
//                     />

//                     <p className="font-bold mt-1">
//                       5.0
//                     </p>

//                   </div>

//                   <div className="rounded-xl bg-green-50 p-3">

//                     <Clock
//                       size={18}
//                       className="mx-auto text-green-600"
//                     />

//                     <p className="font-bold mt-1">
//                       ${f.hourlyRate}
//                     </p>

//                   </div>

//                   <div className="rounded-xl bg-blue-50 p-3">

//                     <Briefcase
//                       size={18}
//                       className="mx-auto text-blue-600"
//                     />

//                     <p className="font-bold mt-1 text-xs">
//                       {f.experience}
//                     </p>

//                   </div>

//                 </div>

//                 {/* Languages */}

//                 <div className="mt-6 text-left">

//                   <div className="flex items-center gap-2 mb-2">

//                     <Globe
//                       size={16}
//                       className="text-indigo-600"
//                     />

//                     <span className="font-semibold text-sm">
//                       Languages
//                     </span>

//                   </div>

//                   <div className="flex flex-wrap gap-2">

//                     {f.languages?.map((language, index) => (
//                       <span
//                         key={index}
//                         className="rounded-full bg-slate-100 px-3 py-1 text-xs"
//                       >
//                         {language}
//                       </span>
//                     ))}

//                   </div>

//                 </div>

//                 {/* Skills */}

//                 <div className="mt-5 text-left">

//                   <div className="flex items-center gap-2 mb-2">

//                     <User
//                       size={16}
//                       className="text-indigo-600"
//                     />

//                     <span className="font-semibold text-sm">
//                       Skills
//                     </span>

//                   </div>

//                   <div className="flex flex-wrap gap-2">

//                     {f.skills?.slice(0, 5).map((skill, index) => (
//                       <span
//                         key={index}
//                         className="rounded-full bg-indigo-50 text-indigo-600 px-3 py-1 text-xs font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}

//                   </div>

//                 </div>

//                 <Link
//                   to={`/freelancer/${f._id}`}
//                   className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
//                 >
//                   View Profile
//                   <ArrowRight size={18} />
//                 </Link>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </section>
//   );
// };

// export default AllFreelancers;

import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { Link } from "react-router";
import {
  ArrowRight,
  Briefcase,
  Clock,
  Globe,
  Search,
  Star,
  User,
} from "lucide-react";

type Freelancer = {
  _id: string;
  name: string;
  email: string;
  title: string;
  bio: string;
  skills: string[];
  languages: string[];
  experience: string;
  hourlyRate: number;
  photoURL?: string;
};

const AllFreelancers = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFreelancers = async (search = "") => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/freelancer", {
        params: search ? { search } : {},
      });

      setFreelancers(res.data?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const handleSearch = () => {
    fetchFreelancers(searchTerm.trim());
  };

  const handleReset = () => {
    setSearchTerm("");
    fetchFreelancers();
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-96 rounded-3xl animate-pulse bg-slate-200" />
        ))}
      </div>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold">Browse Freelancers</h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Discover talented freelancers from different industries.
            Hire professionals based on their skills, experience,
            languages, and hourly rate.
          </p>

          <div className="mt-8 max-w-2xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by email, title, skills, language..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleSearch}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Search
            </button>

            <button
              onClick={handleReset}
              className="rounded-xl bg-slate-200 px-6 py-3 font-medium text-slate-700 hover:bg-slate-300"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((f) => (
            <div
              key={f._id}
              className="group rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold">{f.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{f.email}</p>
                <p className="mt-3 text-indigo-600 font-semibold">{f.title}</p>
                <p className="text-sm text-slate-500 mt-3 line-clamp-3 leading-6">
                  {f.bio}
                </p>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="rounded-xl bg-yellow-50 p-3">
                    <Star
                      size={18}
                      fill="currentColor"
                      className="mx-auto text-yellow-500"
                    />
                    <p className="font-bold mt-1">5.0</p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3">
                    <Clock size={18} className="mx-auto text-green-600" />
                    <p className="font-bold mt-1">${f.hourlyRate}</p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">
                    <Briefcase size={18} className="mx-auto text-blue-600" />
                    <p className="font-bold mt-1 text-xs">{f.experience}</p>
                  </div>
                </div>

                <div className="mt-6 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={16} className="text-indigo-600" />
                    <span className="font-semibold text-sm">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.languages?.map((language, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-indigo-600" />
                    <span className="font-semibold text-sm">Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.skills?.slice(0, 5).map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-indigo-50 text-indigo-600 px-3 py-1 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/freelancer/${f._id}`}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
                >
                  View Profile
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllFreelancers;