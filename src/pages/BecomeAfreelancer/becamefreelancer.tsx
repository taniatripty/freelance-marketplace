

// import { useAuth } from "@/AuthContex/UseAuth";
// import { useState } from "react";

// const SKILL_OPTIONS = [
//   "React",
//   "Next.js",
//   "Node.js",
//   "Express",
//   "MongoDB",
//   "TypeScript",
//   "JavaScript",
//   "Firebase",
//   "Tailwind CSS",
//   "Redux",
//   "UI/UX",
//   "Figma",
// ];

// const BecomeFreelancer = () => {
//   const { user } = useAuth();

//   const [formData, setFormData] = useState({
//     userId: user?.uid || "",
//     title: "",
//     bio: "",
//     languages: "",
//     experience: "",
//     hourlyRate: "",
//     portfolio: "",
//   });

//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

//   // ========================
//   // Handle normal inputs
//   // ========================
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ========================
//   // Toggle Skills
//   // ========================
//   const toggleSkill = (skill: string) => {
//     setSelectedSkills((prev) =>
//       prev.includes(skill)
//         ? prev.filter((s) => s !== skill)
//         : [...prev, skill]
//     );
//   };

//   // ========================
//   // Submit
//   // ========================
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       userId: formData.userId,
//       title: formData.title,
//       bio: formData.bio,

//       // skills (array)
//       skills: selectedSkills,

//       // languages (array)
//       languages: formData.languages
//         .split(",")
//         .map((l) => l.trim())
//         .filter(Boolean),

//       experience: formData.experience,
//       hourlyRate: Number(formData.hourlyRate),

//       // portfolio (array)
//       portfolio: formData.portfolio
//         .split("\n")
//         .map((p) => p.trim())
//         .filter(Boolean),
//     };

//     console.log("Freelancer Payload:", payload);

//     // axios.post("/api/freelancers", payload)
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Become a Freelancer
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Title */}
//           <input
//             type="text"
//             name="title"
//             placeholder="Professional Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//             required
//           />

//           {/* Bio */}
//           <textarea
//             name="bio"
//             placeholder="Bio"
//             value={formData.bio}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg h-24"
//             required
//           />

//           {/* ================= SKILLS ================= */}
//           <div>
//             <label className="font-medium">Skills</label>

//             <div className="flex flex-wrap gap-2 mt-2">
//               {SKILL_OPTIONS.map((skill) => (
//                 <button
//                   type="button"
//                   key={skill}
//                   onClick={() => toggleSkill(skill)}
//                   className={`px-3 py-1 rounded-full border text-sm transition
//                     ${
//                       selectedSkills.includes(skill)
//                         ? "bg-indigo-600 text-white border-indigo-600"
//                         : "bg-white text-gray-700"
//                     }`}
//                 >
//                   {skill}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Languages */}
//           <input
//             type="text"
//             name="languages"
//             placeholder="Languages (comma separated)"
//             value={formData.languages}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />

//           {/* Experience */}
//           <input
//             type="text"
//             name="experience"
//             placeholder="Experience (e.g. 2 years)"
//             value={formData.experience}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />

//           {/* Hourly Rate */}
//           <input
//             type="number"
//             name="hourlyRate"
//             placeholder="Hourly Rate"
//             value={formData.hourlyRate}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />

//           {/* Portfolio */}
//           <textarea
//             name="portfolio"
//             placeholder="Portfolio links (one per line)"
//             value={formData.portfolio}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg h-24"
//           />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Submit Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BecomeFreelancer;

import { useAuth } from "@/AuthContex/UseAuth";
import { useState } from "react";

const SKILL_OPTIONS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "JavaScript",
  "Firebase",
  "Tailwind CSS",
  "Redux",
  "UI/UX",
  "Figma",
];

type PortfolioItem = {
  title: string;
  url: string;
  description: string;
};

const BecomeFreelancer = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    userId: user?.uid || "",
    title: "",
    bio: "",
    languages: "",
    experience: "",
    hourlyRate: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // ✅ FIXED: portfolio as object array
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { title: "", url: "", description: "" },
  ]);

  // ========================
  // Handle inputs
  // ========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ========================
  // Skills toggle
  // ========================
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  // ========================
  // Portfolio handlers
  // ========================
  const handlePortfolioChange = (
    index: number,
    field: keyof PortfolioItem,
    value: string
  ) => {
    const updated = [...portfolio];
    updated[index][field] = value;
    setPortfolio(updated);
  };

  const addProject = () => {
    setPortfolio([
      ...portfolio,
      { title: "", url: "", description: "" },
    ]);
  };

  const removeProject = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  // ========================
  // Submit
  // ========================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      userId: formData.userId,
      title: formData.title,
      bio: formData.bio,

      skills: selectedSkills,

      languages: formData.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),

      experience: formData.experience,
      hourlyRate: Number(formData.hourlyRate),

      // ✅ FIXED PORTFOLIO
      portfolio: portfolio.filter(
        (p) => p.title || p.url || p.description
      ),
    };

    console.log("Freelancer Payload:", payload);

    // axios.post("/api/freelancers", payload)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Become a Freelancer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Professional Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg h-24"
            required
          />

          {/* ================= SKILLS ================= */}
          <div>
            <label className="font-medium">Skills</label>

            <div className="flex flex-wrap gap-2 mt-2">
              {SKILL_OPTIONS.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 rounded-full border text-sm transition
                    ${
                      selectedSkills.includes(skill)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700"
                    }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <input
            type="text"
            name="languages"
            placeholder="Languages (comma separated)"
            value={formData.languages}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* Experience */}
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g. 2 years)"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* Hourly Rate */}
          <input
            type="number"
            name="hourlyRate"
            placeholder="Hourly Rate"
            value={formData.hourlyRate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* ================= PORTFOLIO (FIXED) ================= */}
          <div>
            <div className="flex justify-between items-center">
              <label className="font-medium">Portfolio</label>

              <button
                type="button"
                onClick={addProject}
                className="text-sm text-indigo-600"
              >
                + Add Project
              </button>
            </div>

            <div className="space-y-3 mt-2">
              {portfolio.map((item, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-lg space-y-2"
                >
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={item.title}
                    onChange={(e) =>
                      handlePortfolioChange(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Project URL"
                    value={item.url}
                    onChange={(e) =>
                      handlePortfolioChange(
                        index,
                        "url",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded"
                  />

                  <textarea
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handlePortfolioChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded"
                  />

                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeFreelancer;