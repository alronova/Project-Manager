import React, { use } from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import api from "../api";

const Register = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [b_of, setB_of] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

      const handleSubmit = async (e) => {
      e.preventDefault();

    try {
      const res = await api.post("/api/user/register/", { username, fullName, email, b_of, password });
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("ACCESS_TOKEN", res.data.access);
        localStorage.setItem("REFRESH_TOKEN", res.data.refresh);
        handleSuccess("Registration Successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        localStorage.clear();
        handleError("Registration Failed!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      localStorage.clear();
      handleError(err);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            autoFocus
            value={fullName}
            placeholder="Enter your Name..."
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            autoFocus
            value={email}
            placeholder="Enter your Email..."
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="username"
            name="username"
            value={username}
            placeholder="Enter your Username..."
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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
            value={password}
            placeholder="Enter your Password..."
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="b_of"
            className="block text-sm font-medium text-gray-700"
          >
            Batch of
          </label>
          <input
            type="number"
            name="b_of"
            value={b_of}
            placeholder="Enter your Batch(XX)..."
            onChange={(e) => setB_of(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          Signup
        </button>
        <span className="block text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  )
}

export default Register
