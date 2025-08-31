import React, { useState, useEffect } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseAuth from "../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginForm } from "../utils/Yup";
import { LoginAPI } from "../services/AuthService";
import AuthNavBar from "../components/AuthNavBar";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const { login, user } = UseAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginForm),
  });

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const res = await LoginAPI(formdata);
      await login(res.user);
      setMessage("Login Successful!");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <>
      <AuthNavBar variant="login" />
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="hidden md:flex flex-col justify-center items-center text-white px-10 w-1/2">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Report bugs seamlessly, track corrections and updates,
            collaborate with comments, and stay updated on bug status in real-time
          </p>
        </div>

        <div className="flex flex-1 justify-center items-center px-6 py-12">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <input type={visible ? "text" : "password"} {...register("password")}
                  name="password" autoComplete="off" value={formdata.password} onChange={handleChange} placeholder="********" className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition duration-300" />
                <button type="button" onClick={() => setVisible(!visible)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" >
                  {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button type="submit" className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300 bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90" >
                Login
              </button>
              {error && (
                <p className=" text-red-600 p-2 rounded mb-3">{error}</p>
              )}
              {message && (
                <p className=" text-green-600 p-2 rounded mb-3">
                  {message}
                </p>
              )}

              <Link to="/signup" className="block text-sm text-blue-600 mt-4 text-center hover:underline" >
                Don't have an account? SignUp
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
