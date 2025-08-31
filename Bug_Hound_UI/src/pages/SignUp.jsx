import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import UseAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFom } from "../utils/Yup";
import { SignupAPI } from "../services/AuthService";
import AuthNavBar from "../components/AuthNavBar";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    profile: null,
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { login, user } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpFom),
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setFormdata((prev) => ({ ...prev, profile: files[0] }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async () => {
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
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <>
      <AuthNavBar variant="signup" />
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="hidden md:flex flex-col justify-center items-center text-white px-10 w-1/2">
          <h1 className="text-4xl font-bold mb-4">Create Your Account!</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Register to report bugs, track corrections and updates, leave comments, and monitor bug status in real-time with BugHound.
          </p>
        </div>

        <div className="flex flex-1 justify-center items-center px-6 py-12">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-gray-600 font-semibold mb-1 tracking-wide">
                Name
              </label>
              <input type="text" {...register("name")} name="name" value={formdata.name} onChange={handleChange} placeholder="Your full name" className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition duration-300" />
              {errors.name?.message && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <label className="block text-gray-600 font-semibold mb-1 tracking-wide">
                Email
              </label>
              <input type="email" {...register("email")} name="email" value={formdata.email} onChange={handleChange} placeholder="email@example.com" className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition duration-300" />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <label className="block text-gray-600 font-semibold mb-1 tracking-wide">
                Password
              </label>
              <div className="relative mb-4">
                <input type={visible ? "text" : "password"} {...register("password")} name="password" autoComplete="off" value={formdata.password} onChange={handleChange} placeholder="********" className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition duration-300" />
                <button type="button" onClick={() => setVisible(!visible)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" >
                  {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <label className="block text-gray-600 font-semibold mb-1 tracking-wide">
                Role
              </label>
              <select {...register("role")} name="role" value={formdata.role} onChange={handleChange} className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 mb-4" >
                <option value="">Select role</option>
                <option value="Tester">Tester</option>
                <option value="Developer">Developer</option>
                <option value="ProjectManager">Project Manager</option>
              </select>
              {errors.role?.message && (
                <p className="text-red-500">{errors.role.message}</p>
              )}

              <label className="block text-gray-600 font-semibold mb-1 tracking-wide">
                Profile Image
              </label>
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="profile" className="cursor-pointer px-2 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all" >
                    Choose File
                  </label>
                  <span className="text-sm text-gray-600">
                    {formdata?.profile?.name || "No file chosen"}
                  </span>
                </div>
                <input id="profile" type="file" {...register("profile")} name="profile" onChange={handleChange} className="hidden" accept="image/*" />
              </div>
              {errors.profile?.message && (
                <p className="text-red-500">{errors.profile.message}</p>
              )}

              <button type="submit" className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300 bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90" >
                Sign Up
              </button>

              {error && <p className="text-red-600 p-2 rounded mb-3">{error}</p>}
              {message && (
                <p className="text-green-600 p-2 rounded mb-3">{message}</p>
              )}

              <Link to="/" className="block text-sm text-blue-600 mt-4 text-center hover:underline" >
                Already have an account? Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
