import { useEffect, useState } from "react";
import axiosInstance from "@/UseAxios/axios";

type Freelancer = {
  _id: string;
  title: string;
  bio: string;
  skills: string[];
  languages: string[];
  experience: string;
  hourlyRate: number;
};

const AllFreelancers = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(false); // ✅ FIXED

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/freelancer");

        console.log("API RESPONSE:", res.data);

        setFreelancers(res.data?.data || []); // ✅ SAFE ACCESS
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading freelancers...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        All Freelancers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((f) => (
          <div
            key={f._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {f.title}
            </h2>

            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {f.bio}
            </p>

            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <p>
                💰{" "}
                <span className="font-medium">
                  ${f.hourlyRate}/hr
                </span>
              </p>
              <p>🧠 {f.experience}</p>
              <p>🌍 {f.languages?.join(", ")}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {f.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFreelancers;