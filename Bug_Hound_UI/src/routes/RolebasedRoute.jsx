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
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (!user) {
    navigate('/');
    return null;
  }

  if (unauthorized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">Unauthorized Access</h2>
          <p className="mb-6 text-gray-600">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => {
              setUnauthorized(false);
              navigate(-1); 
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Okay
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};
