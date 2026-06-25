import useCurrentUser from "@/hooks/UserRoles";


const DashboardHome = () => {
  const { data: currentUser, isLoading } =
    useCurrentUser();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {currentUser?.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Role:{" "}
          <span className="font-semibold capitalize">
            {currentUser?.role}
          </span>
        </p>
      </div>

      {/* BUYER DASHBOARD */}
      {currentUser?.role === "client" && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Buyer Overview
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Orders"
              value="0"
            />

            <StatCard
              title="Completed Orders"
              value="0"
            />

            <StatCard
              title="Pending Orders"
              value="0"
            />

            <StatCard
              title="Reviews Given"
              value="0"
            />
          </div>
        </>
      )}

      {/* SELLER DASHBOARD */}
      {currentUser?.role === "freelancer" && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Seller Overview
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="My Gigs"
              value="0"
            />

            <StatCard
              title="Orders"
              value="0"
            />

            <StatCard
              title="Completed Orders"
              value="0"
            />

            <StatCard
              title="Total Earnings"
              value="$0"
            />
          </div>
        </>
      )}

      {/* ADMIN DASHBOARD */}
      {currentUser?.role === "admin" && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Admin Overview
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Users"
              value="0"
            />

            <StatCard
              title="Sellers"
              value="0"
            />

            <StatCard
              title="Gigs"
              value="0"
            />

            <StatCard
              title="Revenue"
              value="$0"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;

/* ---------------------------------- */
/* Stat Card Component */
/* ---------------------------------- */

type StatCardProps = {
  title: string;
  value: string | number;
};

const StatCard = ({
  title,
  value,
}: StatCardProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
};