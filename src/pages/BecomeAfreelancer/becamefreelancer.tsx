import { useAuth } from "@/AuthContex/UseAuth";
import axiosInstance from "@/UseAxios/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Canva",
  "Color Grading & Correction",
  "Sound Design & Audio Mixing",
  "Motion Graphics & Compositing",
];

type Category = {
  _id: string;
  name: string;
  icon: string;
};

type PortfolioItem = {
  title: string;
  url: string;
  description: string;
};

const BecomeFreelancer = () => {
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    bio: "",
    languages: "",
    experience: "",
    hourlyRate: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { title: "", url: "", description: "" },
  ]);

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data?.data || []);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  // ---------------- INPUT CHANGE (FIXED TYPE) ----------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- SKILLS ----------------
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  // ---------------- PORTFOLIO ----------------
  const handlePortfolioChange = (
    index: number,
    field: keyof PortfolioItem,
    value: string,
  ) => {
    setPortfolio((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const addProject = () => {
    setPortfolio((prev) => [...prev, { title: "", url: "", description: "" }]);
  };

  const removeProject = (index: number) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      userId: user?.uid,
      title: formData.category, // category becomes title
      bio: formData.bio,
      skills: selectedSkills,
      languages: formData.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
      experience: formData.experience,
      hourlyRate: Number(formData.hourlyRate),
      portfolio: portfolio.filter((p) => p.title || p.url || p.description),
    };

    try {
      setLoading(true);

      const { data } = await axiosInstance.post(
        "/freelancer/become-freelancer",
        payload,
      );

      console.log(data);
      toast.success("Freelancer profile created successfully!");

      // reset form
      setFormData({
        category: "",
        bio: "",
        languages: "",
        experience: "",
        hourlyRate: "",
      });

      setSelectedSkills([]);
      setPortfolio([{ title: "", url: "", description: "" }]);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Become a Freelancer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CATEGORY SELECT */}
          <div>
            <label className="font-medium">Professional Title</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-2"
              required
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg h-24"
            required
          />

          {/* SKILLS */}
          <div>
            <label className="font-medium">Skills</label>

            <div className="flex flex-wrap gap-2 mt-2">
              {SKILL_OPTIONS.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    selectedSkills.includes(skill)
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* LANGUAGES */}
          <input
            type="text"
            name="languages"
            placeholder="Languages (comma separated)"
            value={formData.languages}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* EXPERIENCE */}
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* HOURLY RATE */}
          <input
            type="number"
            name="hourlyRate"
            placeholder="Hourly Rate"
            value={formData.hourlyRate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* PORTFOLIO */}
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
                <div key={index} className="border p-3 rounded-lg space-y-2">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={item.title}
                    onChange={(e) =>
                      handlePortfolioChange(index, "title", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Project URL"
                    value={item.url}
                    onChange={(e) =>
                      handlePortfolioChange(index, "url", e.target.value)
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
                        e.target.value,
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

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeFreelancer;
