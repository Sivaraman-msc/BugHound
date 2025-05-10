import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Help() {
    const navigate=useNavigate()

    const handleClick=()=>{
        navigate(-1)
    }
  const showHead = [
    'Sign up', 'Sign in', 'Dashboard', 'Bug Report',
    'Update Bug Status', 'New Comment', 'Comments', 'Data'
  ];

  const showData = [
    { Description: ' users create an account using a real email address to ensure they receive email notifications, and they select a role (like Developer, Tester, or Project Manager) to access features tailored to their responsibilities within the system. ', AllowedRole: 'Anyone' },
    { Description: 'Users can log in using just their email and password; access is granted only if their credentials match and a valid cookie is found, ensuring that only previously authorized users can enter the system.', AllowedRole: 'Anyone' },
    { Description: 'The dashboard serves as the central hub, displaying everything at a glance, including graphical representations of bug statuses and conditions, while also providing role-specific navigation links, ensuring users only access what’s relevant to their role.',AllowedRole: 'Anyone' },
    { Description: 'This feature is exclusive to the Tester role, allowing them to report bugs directly to Developers, who receive detailed email notifications upon submission; each bug is tracked with two key dependencies, status (open, closed, in-progress) and condition (high, critical, low) to clearly define its state and urgency.',  AllowedRole: 'Tester' },
    { Description: 'Assigned to the Developer role, this feature allows developers to manage the lifecycle of reported bugs — once a bug is received from a Tester, they update its status to in-progress, and upon resolution, mark it as closed; developers can perform PATCH operations to update statuses and have read access to all submitted bug reports.', AllowedRole: 'Developer' },
    { Description: 'Designed for the Project Manager role, this feature allows managers to add comments on recently reported bugs — they can inquire about progress from Developers and, once resolved, notify Testers with a follow-up comment indicating the bug has been fixed.', AllowedRole: 'ProjectManager' },
    { Description: 'Once the Project Manager posts a comment, both Testers and Developers are notified — they can view the comments either through email or directly on the Comments page, while only the Project Manager has the authority to delete any comment if needed.', AllowedRole: 'Anyone' },
    { Description: 'This section holds detailed information about all users or employees, primarily displaying the personal data they provided during sign-up, including their role, email, and other relevant profile details.', AllowedRole: 'ProjectManager' }
  ];

  return (
    <>
    <div className='bg-gray-100 min-h-screen'>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-20'>
        {showHead.map((title, index) => {
          const data = showData[index]; 
          return (
            <div key={index} className='bg-white p-6 shadow-md rounded-lg'>
              <p className='font-bold text-md lg:text-xl mb-2'>{title}</p>
              <ul className='list-none lg:p-2 lg:ml-5'>
                <li className='lg:p-3'><strong className='text-blue-700'>Description</strong> : {data.Description}</li>
                <li className='lg:p-3 text-gray-700'><strong className='text-blue-700'>Allowed Role</strong> : {data.AllowedRole}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
     <button className='w-15 p-2 ml-34 lg:ml-158 lg:w-20 mx-auto  text-white font-semibold rounded shadow-md mt-6 transition-all duration-300 loginGradientBtn' onClick={handleClick}>Back</button>
    </>
  );
}
