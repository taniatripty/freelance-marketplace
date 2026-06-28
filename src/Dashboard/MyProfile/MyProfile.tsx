import useCurrentUser from "@/hooks/UserRoles";
import { Mail, User, Shield, Pencil, MapPin } from "lucide-react";
import { useNavigate } from "react-router";


const MyProfile = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
const navigate=useNavigate()
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow-sm border p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6">

          <img
            src={
              currentUser?.photoURL ||
              "https://i.pravatar.cc/300"
            }
            alt={currentUser?.name}
            className="w-32 h-32 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {currentUser?.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {currentUser?.email}
            </p>
            <div className="flex items-center gap-2 mt-3 text-gray-600">
  <div className="p-1.5 rounded-full bg-indigo-50">
    <MapPin
      size={16}
      className="text-indigo-600"
    />
  </div>

  {currentUser?.city || currentUser?.country ? (
    <span className="text-sm font-medium">
      {currentUser?.city}
      {currentUser?.city &&
        currentUser?.country &&
        ", "}
      {currentUser?.country}
    </span>
  ) : (
    <span className="text-sm text-gray-400">
      Location not added
    </span>
  )}
</div>

            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm capitalize">
              {currentUser?.role}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={18} />
              <span className="font-medium">
                Full Name
              </span>
            </div>

            <p>{currentUser?.name}</p>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={18} />
              <span className="font-medium">
                Email
              </span>
            </div>

            <p>{currentUser?.email}</p>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} />
              <span className="font-medium">
                Role
              </span>
            </div>

            <p className="capitalize">
              {currentUser?.role}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              📅
              <span className="font-medium">
                Joined
              </span>
            </div>

            <p>
              {currentUser?.createdAt
                ? new Date(
                    currentUser.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* BIO */}
        <div className="mt-8 border rounded-xl p-5">
          <h2 className="font-semibold text-lg mb-2">
            About
          </h2>

          <p className="text-gray-600">
            {currentUser?.bio ||
              "No bio added yet."}
          </p>
        </div>

        {/* SKILLS */}
        {currentUser?.skills?.length > 0 && (
          <div className="mt-8 border rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-3">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map(
                (skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-slate-100 text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* BUTTON */}
        <div className="mt-8 flex justify-end">
  <button
    onClick={() => navigate("/dashboard/edit-profile")}
    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
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