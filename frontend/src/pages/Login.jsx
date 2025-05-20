import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import api from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log('api',axi);
      // console.log(api/token);
      const res = await api.post("/api/token/", { username, password },{ withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("ACCESS_TOKEN", res.data.access);
        localStorage.setItem("REFRESH_TOKEN", res.data.refresh);
        handleSuccess("Login Successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500)
      } else {
        localStorage.clear();
        handleError("Login Failed!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      handleError(error);
      localStorage.clear();
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
          >
            Login
          </button>
          <span className="block text-sm text-center text-gray-600 mt-4">
            Doesn't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 transition"
            >
              Register
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
