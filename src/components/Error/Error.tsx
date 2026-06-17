import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-md">

        {/* Icon */}
        <div className="text-6xl mb-4">⚠️</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-500 mb-2">
          Oops! Something went wrong
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or an unexpected error occurred.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;