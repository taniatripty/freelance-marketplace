


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/UseAxios/axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

type User = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: "admin" | "client" | "freelancer";
  createdAt: string;
};

const AllUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/users");
      return res.data.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({
      uid,
      role,
    }: {
      uid: string;
      role: "admin" | "client" | "freelancer";
    }) => {
      const res = await axiosInstance.patch(
        `/auth/users/${uid}/role`,
        { role }
      );

      return res.data;
    },

    onSuccess: () => {
      toast.success("User role updated");

      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },

    onError: () => {
      toast.error("Failed to update role");
    },
  });

  const handleUpdateRole = async (
    user: User,
    role: "admin" | "client"
  ) => {
    const result = await Swal.fire({
      title:
        role === "admin"
          ? "Make Admin?"
          : "Remove Admin?",
      text:
        role === "admin"
          ? `${user.name} will receive administrator access.`
          : `${user.name} will no longer be an administrator.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:
        role === "admin" ? "#4f46e5" : "#dc2626",
      confirmButtonText:
        role === "admin"
          ? "Make Admin"
          : "Remove Admin",
    });

    if (!result.isConfirmed) return;

    updateRoleMutation.mutate({
      uid: user.uid,
      role,
    });
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gradient-to-r from-slate-50 to-slate-100">
              <th className="px-6 py-5 text-left text-xs font-bold uppercase text-slate-500">
                User
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase text-slate-500">
                Email
              </th>

              <th className="px-6 py-5 text-center text-xs font-bold uppercase text-slate-500">
                Role
              </th>

              <th className="px-6 py-5 text-center text-xs font-bold uppercase text-slate-500">
                Joined
              </th>

              <th className="px-6 py-5 text-center text-xs font-bold uppercase text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: User) => (
              <tr
                key={user._id}
                className="group border-b border-slate-100 transition hover:bg-indigo-50/40"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={user.photoURL}
                        className="h-14 w-14 rounded-2xl object-cover ring-2 ring-indigo-100"
                      />

                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {user.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        UID: {user.uid.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {user.email}
                </td>

                <td className="px-6 py-5 text-center">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold capitalize ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : user.role === "freelancer"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-5 text-center text-slate-500">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5 text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() =>
                        handleUpdateRole(
                          user,
                          "client"
                        )
                      }
                      disabled={
                        updateRoleMutation.isPending
                      }
                      className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleUpdateRole(
                          user,
                          "admin"
                        )
                      }
                      disabled={
                        updateRoleMutation.isPending
                      }
                      className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;