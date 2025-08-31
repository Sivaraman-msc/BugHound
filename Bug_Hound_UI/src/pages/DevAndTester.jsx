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
        setUsers(res || []);
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

  if (loading) return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 text-white">
      <NavBar />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-6 overflow-auto">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="sm:hidden space-y-4">
            {users.length > 0 ? users.map(user => (
              <div key={user._id} className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-2">
                <img src={user.profile || '/default-user.png'} alt={user.name} className="w-16 h-16 rounded-full object-cover" onError={(e) => { e.target.src = '/default-user.png'; }} />
                <div className="font-semibold text-lg">{user.name}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>Role:</strong> {user.role}</div>
              </div>
            )) : (
              <p className="text-center text-gray-400">Users not found</p>
            )}
          </div>

          <div className="hidden sm:block">
            <table className="min-w-full bg-black/50 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
              <thead>
                <tr className="text-left text-white bg-gray-700">
                  <th className="px-4 py-3">Profile</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map(user => (
                  <tr key={user._id} className="hover:bg-black/20">
                    <td className="px-4 py-3">
                      <img src={user.profile || '/default-user.png'} alt={user.name} className="w-12 h-12 rounded-full object-cover" onError={(e) => { e.target.src = '/default-user.png'; }} />
                    </td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3 capitalize">{user.role}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-400">
                      Users not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
