import useCurrentUser from "@/hooks/UserRoles";

const DashboardHeader = () => {
  const { data } = useCurrentUser();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border">
      <h1 className="text-3xl font-bold">
        Welcome back, {data?.name}
      </h1>

      <p className="text-gray-500 mt-2 capitalize">
        {data?.role} Dashboard
      </p>
    </div>
  );
};

export default DashboardHeader;