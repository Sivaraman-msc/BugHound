import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBug, FaCommentDots, FaQuestionCircle } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

export default function SideNav() {
  return (
    <aside className="hidden lg:block w-64 bg-black/70 backdrop-blur-md p-6 shadow-lg rounded-r-2xl flex-shrink-0">
      <div className="space-y-6 mt-12 font-medium sticky top-0">
        <Link to='/employees' className="flex items-center gap-3 text-white hover:text-indigo-400">
          <FaUser size={20} /> Employees
        </Link>
        <Link to='/bugreport' className="flex items-center gap-3 text-white hover:text-indigo-400">
          <FaBug size={20} /> Report Bug
        </Link>
        <Link to='/bugList' className="flex items-center gap-3 text-white hover:text-indigo-400">
          <MdUpdate size={20} /> Update Bug
        </Link>
        <Link to='/createComment' className="flex items-center gap-3 text-white hover:text-indigo-400">
          <FaCommentDots size={20} /> New Comment
        </Link>
        <Link to='/commentList' className="flex items-center gap-3 text-white hover:text-indigo-400">
          <AiOutlineEye size={20} /> Comments
        </Link>
        <Link to='/help' className="flex items-center gap-3 text-white hover:text-indigo-400">
          <FaQuestionCircle size={20} /> Help
        </Link>
        <Link to='/' className="flex items-center gap-3 text-white hover:text-red-500">
          <FiLogOut size={20} /> Logout
        </Link>
      </div>
    </aside>
  );
}
