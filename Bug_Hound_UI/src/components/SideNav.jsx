import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaBug, FaCommentDots, FaQuestionCircle } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

export default function SideNav() {
  return (
     <div className="bg-gray-700 w-50 h-120 shadow-lg p-4 hidden md:block">
              <div className="space-y-2 font-bold mt-12">
                <Link to='/employees' className="block text-white hover:text-blue-600 mb-8.5 flex items-center space-x-2"><FaUser /><span>Employees</span></Link>
                <Link to='/bugreport' className="block text-white hover:text-blue-600 mb-8.5 flex items-center space-x-2"><FaBug /><span>Report Bug</span></Link>
                <Link to='/bugList' className="block text-white hover:text-blue-600 mb-8.5 flex items-center space-x-2"><MdUpdate /><span>Update Bug</span></Link>
                <Link to='/createComment' className="block text-white hover:text-blue-600 mb-8.5 flex items-center space-x-2"><FaCommentDots /><span>New Comment</span></Link>
                <Link to='/commentList' className="block text-white hover:text-blue-600 mb-8.5 flex items-center space-x-2"><AiOutlineEye /><span>Comments</span></Link>
                <Link to='/help' className="block text-white hover:text-blue-600 mb-8.5 flex items-center space-x-2"><FaQuestionCircle /><span>Help</span></Link>
                <Link to='/' className="block text-white hover:text-blue-600 mb-8.5 flex items-center space-x-2"><FiLogOut /><span>Logout</span></Link>
              </div>
            </div>
  )
}
