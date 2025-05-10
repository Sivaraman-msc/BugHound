import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { GetBugAPI } from '../services/BugService';

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await GetBugAPI();
        setBugs(res);
      } catch (err) {
        console.error("Error fetching bugs:", err);
      }
    };
    fetchBugs();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex bg-gray-100">
        <SideNav />
        <div className="flex-1 p-4 sm:p-8">

          <div className="sm:hidden space-y-4">
            {bugs.length > 0 ? (
              bugs.map((bug) => (
                <div key={bug._id} className="bg-white p-4 rounded shadow">
                  <div className="mb-2 font-semibold text-lg text-red-400">{bug.title}</div>
                  <div className='mb-2'><strong>Status:</strong> {bug.status}</div>
                  <div className='mb-2'><strong>Priority:</strong> {bug.priority}</div>
                  <div className='mb-2'><strong>Assigned To:</strong> {bug.assignedTo?.name || 'Unassigned'}</div>
                  <button
                    onClick={() => navigate(`/bugUpdate/${bug._id}`)}
                    className="w-18 mt-5 p-2 text-white font-semibold rounded shadow-md transition-all duration-300 loginGradientBtn"
                  >
                    Update
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No bugs found.</p>
            )}
          </div>

          <div className="hidden sm:block">
            <table className="min-w-full bg-white rounded shadow overflow-hidden">
              <thead>
                <tr className="bg-gray-200 bg-gray-700 text-white">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Priority</th>
                  <th className="text-left py-3 px-4">Assigned To</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bugs.length > 0 ? (
                  bugs.map((bug) => (
                    <tr key={bug._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{bug.title}</td>
                      <td className="py-3 px-4 capitalize">{bug.status}</td>
                      <td className="py-3 px-4 capitalize">{bug.priority}</td>
                      <td className="py-3 px-4">{bug.assignedTo?.name || 'Unassigned'}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => navigate(`/bugUpdate/${bug._id}`)}
                          className="w-15 p-2 lg:w-20 mx-auto  text-white font-semibold rounded shadow-md transition-all duration-300 loginGradientBtn"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No bugs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
