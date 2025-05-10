import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import UseAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFom } from '../utils/Yup';
import { SignupAPI } from '../services/AuthService';
import AuthNavBar from '../components/AuthNavBar';

export default function SignUp() {
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    profile: null,
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();
  const { login, user } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpFom),
  });

  const passVisible = () => {
    setvisible(!visible)
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile') {
      setFormdata((prev) => ({ ...prev, profile: files[0] }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = async () => {
    try {
      const res = await SignupAPI(formdata);
      console.log("Signup successful:", res);

      await login(res.user);

      setMessage("Signup Successful!");
      setError(false);
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Signup Error");
      setError("Invalid Credentials");
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
      <AuthNavBar variant="signup" />
      <div className="min-h-screen flex justify-end items-center px-6 py-10 loginBackground">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
          <form onSubmit={handleSubmit(handleClick)}>
            {error && <p className="text-red-600">{error}</p>}
            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Name</label>
            <input
              type="text"
              {...register('name')}
              name="name"
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition-all duration-300"
            />
            <p className="text-red-600">{errors.name?.message}</p>

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Email</label>
            <input
              type="email"
              {...register('email')}
              name="email"
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition-all duration-300"
            />
            <p className="text-red-600">{errors.email?.message}</p>

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Password</label>
            <div className="relative mb-4">
              <input
                type={visible ? "text" : "password"}
                {...register("password")}
                name="password"
                autoComplete='off'
                value={formdata.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition duration-300"
              />
              <button
                type="button"
                onClick={passVisible}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
              >
                {visible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password?.message && <p className="text-red-500">{errors.password.message}</p>}

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Role</label>
            <select
              {...register('role')}
              name="role"
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 mb-4"
            >
              <option value="">Select role</option>
              <option value="Tester">Tester</option>
              <option value="Developer">Developer</option>
              <option value="ProjectManager">Project Manager</option>
            </select>
            <p className="text-red-600">{errors.role?.message}</p>

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Image</label>
            <input
              type="file"
              {...register('profile')}
              name="profile"
              onChange={handleChange}
              className="mb-4"
            />
            <p className="text-red-600">{errors.profile?.message}</p>

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300 loginGradientBtn"
            >
              SignUp
            </button>
            {message && <p className="mt-3 text-center text-green-600">{message}</p>}

            <Link
              to="/"
              className="block text-sm text-blue-600 mt-4 text-center hover:underline"
            >
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
