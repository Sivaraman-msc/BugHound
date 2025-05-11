import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/leoTech.png';
import UseAuth from '../hooks/useAuth';
import { HiOutlineMenu } from 'react-icons/hi';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const{logout}=UseAuth()

  return ( 
    <nav className="w-full px-1 bg-gray-700 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between relative">
       <div className="flex flex-row items-center justify-between w-full lg:w-auto">
              <img
                src={logo}
                className="h-18 w-auto object-contain cursor-pointer"
                alt="LeoTech Logo"
              />
              <button className="lg:hidden text-2xl text-white" onClick={() => setIsOpen(!isOpen)}>
                <HiOutlineMenu />
              </button>
            </div>

      <ul className={`${isOpen ? 'flex' : 'hidden'} flex-col lg:flex lg:flex-row items-start lg:items-center gap-4 lg:gap-8 mt-4 lg:mt-0 text-white font-medium text-md lg:text-lg`}>
        <Link to='/dashboard' className="hover:text-blue-500 transition-colors cursor-pointer">Home</Link>
        <Link to='/help' className="hover:text-blue-500 transition-colors cursor-pointer">Help</Link>
        <Link to='/employees' className="hover:text-blue-500 transition-colors cursor-pointer">Employees</Link>
        <Link to='/commentList' className="hover:text-blue-500 transition-colors cursor-pointer">Updates</Link>
        
        <Link to='/bugreport' className="lg:hidden hover:text-blue-500 transition-colors cursor-pointer">Report Bug</Link>
        <Link to='/bugList' className="lg:hidden hover:text-blue-500 transition-colors cursor-pointer">Update Bug</Link>
        <Link to='/createComment' className="lg:hidden hover:text-blue-500 transition-colors cursor-pointer">New Comment</Link>
        <Link to='/commentList' className="lg:hidden hover:text-blue-500 transition-colors cursor-pointer">Comments</Link>
        <Link to='/' onClick={logout} className="hover:text-blue-500 transition-colors cursor-pointer">Logout</Link>
      </ul>
    </nav>
  );
}
