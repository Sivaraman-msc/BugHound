import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/useAuth";

export const RolebasedRoute = ({ allowedRoute }) => {
  const { user, loading } = UseAuth();
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && !allowedRoute.includes(user.role)) {
      setUnauthorized(true);
    }
  }, [user, loading, allowedRoute]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/');
    return null;
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
        <div className="bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center w-full max-w-md text-white">
          <h2 className="text-2xl font-semibold mb-4">Unauthorized Access</h2>
          <p className="mb-6 text-gray-200">
            You don't have permission to access this page.
          </p>
          <button onClick={() => { setUnauthorized(false); navigate(-1); }} className="px-6 py-2 bg-indigo-500 rounded-lg font-semibold hover:bg-indigo-600 transition-all" >
            Okay
          </button>
        </div>
      </div>
    );
  }
  return <Outlet />;
};
