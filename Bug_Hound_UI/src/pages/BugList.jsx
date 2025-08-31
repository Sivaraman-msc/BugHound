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
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 text-white">
        <SideNav />
        <main className="flex-1 p-8 sm:p-12 overflow-y-auto space-y-8">

          <div className="sm:hidden space-y-4">
            {bugs.length > 0 ? (
              bugs.map(bug => (
                <div key={bug._id} className="bg-black/50 backdrop-blur-md rounded-2xl p-4 shadow-md">
                  <div className="mb-2 font-semibold text-lg text-indigo-400">{bug.title}</div>
                  <div className='mb-1'><strong>Status:</strong> {bug.status}</div>
                  <div className='mb-1'><strong>Priority:</strong> {bug.priority}</div>
                  <div className='mb-1'><strong>Assigned To:</strong> {bug.assignedTo?.name || 'Unassigned'}</div>
                  <button onClick={() => navigate(`/bugUpdate/${bug._id}`)} className="w-full mt-3 p-2 text-white font-semibold rounded shadow-md loginGradientBtn" >
                    Update
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-white/70">No bugs found.</p>
            )}
          </div>

          <div className="hidden sm:block">
            <div className="bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-md">
              <table className="min-w-full text-white">
                <thead>
                  <tr className="bg-black/70">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Priority</th>
                    <th className="text-left py-3 px-4">Assigned To</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bugs.length > 0 ? (
                    bugs.map(bug => (
                      <tr key={bug._id} className="border-b border-white/20 hover:bg-black/40">
                        <td className="py-3 px-4">{bug.title}</td>
                        <td className="py-3 px-4 capitalize">{bug.status}</td>
                        <td className="py-3 px-4 capitalize">{bug.priority}</td>
                        <td className="py-3 px-4">{bug.assignedTo?.name || 'Unassigned'}</td>
                        <td className="py-3 px-4">
                          <button onClick={() => navigate(`/bugUpdate/${bug._id}`)} className="w-full p-2 text-white font-semibold rounded shadow-md loginGradientBtn" >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-white/70">No bugs found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
