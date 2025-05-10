import React, { useEffect, useState } from 'react';
import { getUsersAPI } from '../services/AuthService';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';

export default function DevAndTester() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsersAPI();
        console.log("Full user response from API:", res);
        res.forEach(user => {
          console.log(`User: ${user.name}, Profile: ${user.profile}`);
        });
        setUsers(res);
        setError(false);
      } catch (err) {
        console.error("Error fetching Users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex bg-gray-100">
        <SideNav />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="sm:hidden space-y-4">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user._id} className="bg-white p-4 rounded shadow">
                  {user.profile && (
                    <img src={user.profile} alt={user.name} className="w-16 h-16 rounded-full object-cover mb-2" onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-user.png"; 
                      }}
                    />
                  )}
                  <div className="mb-1 font-semibold text-lg">{user.name}</div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Role:</strong> {user.role}</div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Users not found</p>
            )}

          </div>

          <div className="hidden sm:block">
            <table className="min-w-full bg-white rounded shadow overflow-hidden">
              <thead>
                <tr className=" text-white bg-gray-700">
                  <th className="text-left py-3 px-4">Profile</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                       {user.profile && (
                    <img src={user.profile} alt={user.name} className="w-16 h-16 rounded-full object-cover mb-2" onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-user.png"; 
                      }}
                    />
                  )}
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4 capitalize">{user.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      Users not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
