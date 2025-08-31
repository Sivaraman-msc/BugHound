import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import LeoTech from '../assets/LeoTech.png';

export default function Help() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const showHead = [
    'Sign up', 'Sign in', 'Dashboard', 'Bug Report',
    'Update Bug Status', 'New Comment', 'Comments', 'Data'
  ];

  const showData = [
    { Description: 'Users create an account using a real email address to ensure they receive notifications, and select a role to access features tailored to their responsibilities.', AllowedRole: 'Anyone' },
    { Description: 'Users can log in using email and password; access is granted only if credentials match and a valid cookie is found.', AllowedRole: 'Anyone' },
    { Description: 'Dashboard displays everything at a glance, including graphical representations of bug statuses and role-specific navigation links.', AllowedRole: 'Anyone' },
    { Description: 'Exclusive to Testers, allowing them to report bugs to Developers who receive detailed email notifications; bugs have status and condition fields.', AllowedRole: 'Tester' },
    { Description: 'Developers manage the lifecycle of reported bugs — update status to in-progress or closed; they have read access to all submitted bugs.', AllowedRole: 'Developer' },
    { Description: 'Project Managers can add comments on recently reported bugs, inquire about progress, and notify Testers once resolved.', AllowedRole: 'ProjectManager' },
    { Description: 'After Project Manager posts a comment, Testers and Developers are notified; only Project Manager can delete comments.', AllowedRole: 'Anyone' },
    { Description: 'Displays detailed information about all users, including role, email, and other profile details.', AllowedRole: 'ProjectManager' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 text-white py-10 px-4">
      <div className="w-40 mx-auto mb-10">
        <img src={LeoTech} alt="LeoTech Logo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:px-20">
        {showHead.map((title, index) => {
          const data = showData[index];
          return (
            <div key={index} className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-2">
              <p className="font-bold text-xl mb-2">{title}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-blue-400">Description:</strong> {data.Description}</li>
                <li><strong className="text-blue-400">Allowed Role:</strong> {data.AllowedRole}</li>
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={handleClick} className="px-6 py-3 text-white font-semibold rounded shadow-md loginGradientBtn transition-all duration-300" >
          Back
        </button>
      </div>
    </div>
  );
}
