
import { useMemo, useState } from "react";
import axiosInstance from "@/UseAxios/axios";
import { Search, CheckCircle2, Ban } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type GigStatus = "pending" | "active" | "suspended" | "deleted";
type FilterStatus = "all" | GigStatus;

type Gig = {
  _id: string;
  title: string;
  category: string;
  price: number;
  deliveryDays: number;
  images: string[];
  sellerName: string;
  sellerEmail: string;
  createdAt: string;
  status: GigStatus;
};

const ManageGigs = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const queryClient = useQueryClient();

  const { data: gigs = [], isLoading } = useQuery<Gig[]>({
    queryKey: ["admin-gigs"] as const,
    queryFn: async () => {
      const res = await axiosInstance.get("/gigs/all");
      return res.data.data as Gig[];
    },
  });

  const filteredGigs = useMemo(() => {
    const q = search.trim().toLowerCase();

    return gigs.filter((gig) => {
      const matchSearch =
        q.length === 0 ||
        gig.title.toLowerCase().includes(q) ||
        gig.category.toLowerCase().includes(q) ||
        gig.sellerName.toLowerCase().includes(q) ||
        gig.sellerEmail.toLowerCase().includes(q);

      const matchStatus = filter === "all" ? true : gig.status === filter;
      return matchSearch && matchStatus;
    });
  }, [gigs, search, filter]);

  const stats = useMemo(
    () => ({
      total: gigs.length,
      pending: gigs.filter((g) => g.status === "pending").length,
      active: gigs.filter((g) => g.status === "active").length,
      suspended: gigs.filter((g) => g.status === "suspended").length,
      deleted: gigs.filter((g) => g.status === "deleted").length,
    }),
    [gigs]
  );

  const statusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "active" | "suspended";
    }) => {
      await axiosInstance.patch(`/gigs/${id}/status`, { status });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-gigs"] });
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading Gigs...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Gigs</h1>
        <p className="text-gray-500 mt-2">
          Review, approve, suspend, or delete freelancer gigs.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard title="Total" value={stats.total} color="text-indigo-600" />
        <StatCard title="Pending" value={stats.pending} color="text-yellow-500" />
        <StatCard title="Active" value={stats.active} color="text-green-600" />
        <StatCard title="Suspended" value={stats.suspended} color="text-amber-600" />
        <StatCard title="Deleted" value={stats.deleted} color="text-red-500" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Gig..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 w-full border rounded-xl p-3"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterStatus)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      <div className="rounded-2xl border bg-white shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Gig</th>
                <th className="text-left">Seller</th>
                <th className="text-left">Category</th>
                <th className="text-left">Price</th>
                <th className="text-left">Status</th>
                <th className="text-left">Created</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredGigs.length > 0 ? (
                filteredGigs.map((gig) => (
                  <tr key={gig._id} className="border-t hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex gap-4 items-center">
                        <img
                          src={gig.images?.[0] || "https://via.placeholder.com/64"}
                          alt={gig.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-semibold">{gig.title}</h3>
                          <p className="text-sm text-gray-500">
                            {gig.deliveryDays} Days
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <h4 className="font-medium">{gig.sellerName}</h4>
                        <p className="text-sm text-gray-500">{gig.sellerEmail}</p>
                      </div>
                    </td>

                    <td>{gig.category}</td>

                    <td className="font-semibold text-indigo-600">${gig.price}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          gig.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : gig.status === "active"
                            ? "bg-green-100 text-green-700"
                            : gig.status === "suspended"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {gig.status}
                      </span>
                    </td>

                    <td>{new Date(gig.createdAt).toLocaleDateString()}</td>

                    <td>
                      <div className="flex flex-wrap justify-center gap-2">
                        {gig.status === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                statusMutation.mutate({
                                  id: gig._id,
                                  status: "active",
                                })
                              }
                              disabled={statusMutation.isPending}
                              className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                            >
                              <CheckCircle2 size={16} />
                              Active
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                statusMutation.mutate({
                                  id: gig._id,
                                  status: "suspended",
                                })
                              }
                              disabled={statusMutation.isPending}
                              className="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                            >
                              <Ban size={16} />
                              Suspended
                            </button>
                          </>
                        )}

                        {gig.status === "active" && (
                          <button
                            type="button"
                            onClick={() =>
                              statusMutation.mutate({
                                id: gig._id,
                                status: "suspended",
                              })
                            }
                            disabled={statusMutation.isPending}
                            className="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                          >
                            <Ban size={16} />
                            Suspended
                          </button>
                        )}

                        {gig.status === "suspended" && (
                          <button
                            type="button"
                            onClick={() =>
                              statusMutation.mutate({
                                id: gig._id,
                                status: "active",
                              })
                            }
                            disabled={statusMutation.isPending}
                            className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                          >
                            <CheckCircle2 size={16} />
                            Active
                          </button>
                        )}

                        {gig.status === "deleted" && (
                          <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-500">
                            No actions available
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500">
                    No gigs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageGigs;

type StatCardProps = {
  title: string;
  value: number;
  color: string;
};

const StatCard = ({ title, value, color }: StatCardProps) => {
  return (
    <div className="rounded-2xl border bg-white shadow p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
};