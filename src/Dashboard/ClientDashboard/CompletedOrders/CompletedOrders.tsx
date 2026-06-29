import { useAuth } from "@/AuthContex/UseAuth";
import axiosInstance from "@/UseAxios/axios";
import { CheckCircle2, Clock3, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

type CompletedProject = {
  _id: string;
  gigTitle: string;
  sellerName: string;
  price: number;
  status: string;
  completedAt: string;
  deliveryTime: number;
  gigImage: string[];
};

const CompletedOrders = () => {
  const { user } = useAuth();

  const [projects, setProjects] = useState<CompletedProject[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const loadProjects = async () => {
      try {
        const res = await axiosInstance.get(
          `/orders/buyer/completed/${user.uid}`,
        );

        setProjects(res.data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user]);
  console.log(projects)

  if (loading) {
    return (
      <div className="text-center py-20">Loading completed projects...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Completed Orders</h1>

        <p className="text-gray-500 mt-2">
          Projects successfully completed by freelancers.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-3xl shadow border p-12 text-center">
          <CheckCircle2 className="mx-auto text-green-500" size={60} />

          <h2 className="text-2xl font-bold mt-4">No Completed Projects</h2>

          <p className="text-gray-500 mt-2">
            Your completed projects will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-3xl border shadow-sm hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={project.gigImage?.[0]}
                alt={project.gigTitle}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-sm font-bold">{project.gigTitle}</h2>

                    <p className="text-gray-500 mt-1">
                      Seller • {project.sellerName}
                    </p>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                    Completed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <DollarSign size={18} />

                      <span className="font-medium">Price</span>
                    </div>

                    <p className="mt-2 text-lg font-bold">${project.price}</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-orange-600">
                      <Clock3 size={18} />

                      <span className="font-medium">Delivery</span>
                    </div>

                    <p className="mt-2 text-lg font-bold">
                      {project.deliveryTime} Days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedOrders;
