

import axiosInstance from "@/UseAxios/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const FreelancerDetails = () => {
  const { id } = useParams();

  const [freelancer, setFreelancer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const res = await axiosInstance.get(`/freelancer/${id}`);
        setFreelancer(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!freelancer) return <div>Freelancer not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">

              {/* Avatar */}
              <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                {freelancer.name?.charAt(0) || "U"}
              </div>

              <div>
                {/* NAME */}
                <h1 className="text-4xl font-bold">
                  {freelancer.name || "No Name"}
                </h1>

                {/* EMAIL */}
                <p className="text-indigo-100 text-sm mt-1">
                  {freelancer.email || "No Email Provided"}
                </p>

                {/* TITLE */}
                <p className="mt-2 text-lg font-medium">
                  {freelancer.title}
                </p>

                {/* BIO */}
                <p className="mt-2 text-indigo-100 max-w-2xl">
                  {freelancer.bio}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-100 rounded-xl p-5">
                <h3 className="text-sm text-gray-500">Experience</h3>
                <p className="text-2xl font-bold mt-2">
                  {freelancer.experience}
                </p>
              </div>

              <div className="bg-slate-100 rounded-xl p-5">
                <h3 className="text-sm text-gray-500">Hourly Rate</h3>
                <p className="text-2xl font-bold mt-2">
                  ${freelancer.hourlyRate}/hr
                </p>
              </div>

              <div className="bg-slate-100 rounded-xl p-5">
                <h3 className="text-sm text-gray-500">Languages</h3>
                <p className="text-lg font-semibold mt-2">
                  {freelancer.languages?.join(", ")}
                </p>
              </div>
            </div>

            {/* SKILLS */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Skills</h2>

              <div className="flex flex-wrap gap-3">
                {freelancer.skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* PORTFOLIO */}
            {freelancer.portfolio?.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">
                  Portfolio Projects
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {freelancer.portfolio.map((project: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-2xl p-6 hover:shadow-lg transition"
                    >
                      <h3 className="text-xl font-bold">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mt-3">
                        {project.description}
                      </p>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Visit Project
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetails;