import React, { useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook


  const handleLogin = async () => {
    const payload = { email, password };

    try {

      const response = await axios.post("/students/login", payload);

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);

      //alert("Login successful! Redirecting...");
      navigate("/student");
      // Replace with actual redirection logic
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-500 to-teal-600 items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-black-800 mb-6">Student Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-600 mb-1">
            Email ID
          </label>
          <input
            type="email"
            id="identifier"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-teal-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
