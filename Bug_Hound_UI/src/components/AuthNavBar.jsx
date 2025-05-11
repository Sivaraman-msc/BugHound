import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/leoTech.png';
import { HiOutlineMenu } from 'react-icons/hi';

export default function AuthNavBar({ variant = 'login' }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isLogin = variant === 'login';
  const oppositeRoute = isLogin ? '/signup' : '/';
  const oppositeLabel = isLogin ? 'SignUp' : 'SignIn';

  return (
    <nav className="w-full px-4 bg-gray-700 shadow-md flex flex-col lg:flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-between w-full lg:w-auto">
        <img
          src={logo}
          className="h-18 w-auto object-contain cursor-pointer"
          alt="LeoTech Logo"
        />
        <button className="lg:hidden text-white text-2xl" onClick={toggleMenu}>
          <HiOutlineMenu />
        </button>
      </div>

     <ul className={`
  ${isOpen ? 'absolute left-3 w-30 top-15 ml-60 bg-gray-700 shadow-md p-4 rounded-md z-50 flex flex-col' : 'hidden'}
  lg:flex lg:static lg:flex-row lg:items-center 
  gap-4 lg:gap-8 mt-4 lg:mt-0 text-white font-medium text-md lg:text-lg
`}>
        <li className="hover:text-blue-500 transition-colors cursor-pointer">
          <Link to={oppositeRoute}>{oppositeLabel}</Link>
        </li>
        <li className="hover:text-blue-500 transition-colors cursor-pointer"><Link to='/help'>Help</Link></li>
      </ul>
    </nav>
  );
}
