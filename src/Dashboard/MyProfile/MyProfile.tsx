
import useCurrentUser from "@/hooks/UserRoles";
import { Mail, MapPin, Pencil, Shield, User } from "lucide-react";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex justify-center py-20">Loading Profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white rounded-2xl shadow-sm border p-5 sm:p-6 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={currentUser?.photoURL || "https://i.pravatar.cc/300"}
            alt={currentUser?.name}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2"
          />

          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">{currentUser?.name}</h1>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">{currentUser?.email}</p>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">{currentUser?.phone}</p>
            
            <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-gray-600">
              <div className="rounded-full bg-indigo-50 p-1.5">
                <MapPin size={16} className="text-indigo-600" />
              </div>

              {currentUser?.city || currentUser?.country ? (
                <span className="text-sm font-medium">
                  {currentUser?.city}
                  {currentUser?.city && currentUser?.country && ", "}
                  {currentUser?.country}
                </span>
              ) : (
                <span className="text-sm text-gray-400">
                  Location not added
                </span>
              )}
            </div>

            <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm capitalize">
              {currentUser?.role}
            </span>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10">
          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={18} className="text-indigo-600" />
              <span className="font-medium">Full Name</span>
            </div>

            <p className="text-gray-700">{currentUser?.name}</p>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={18} className="text-indigo-600" />
              <span className="font-medium">Email</span>
            </div>

            <p className="text-gray-700">{currentUser?.email}</p>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} className="text-indigo-600" />
              <span className="font-medium">Role</span>
            </div>

            <p className="text-gray-700 capitalize">{currentUser?.role}</p>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📅</span>
              <span className="font-medium">Joined</span>
            </div>

            <p className="text-gray-700">
              {currentUser?.createdAt
                ? new Date(currentUser.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* BIO */}
        <div className="mt-6 sm:mt-8 border rounded-xl p-4 sm:p-5">
          <h2 className="font-semibold text-base sm:text-lg mb-2">About</h2>

          <p className="text-gray-600 text-sm sm:text-base">
            {currentUser?.bio || "No bio added yet."}
          </p>
        </div>

        {/* SKILLS */}
        {currentUser?.skills?.length > 0 && (
          <div className="mt-6 sm:mt-8 border rounded-xl p-4 sm:p-5">
            <h2 className="font-semibold text-base sm:text-lg mb-3">Skills</h2>

            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-gray-700 text-xs sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* BUTTON */}
        <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
          <button
            onClick={() => navigate("/dashboard/edit-profile")}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;