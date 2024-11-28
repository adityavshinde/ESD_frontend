import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ name, email }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg">
            Welcome, {name} ({email})
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="bg-teal-500 text-white p-2 rounded hover:bg-orange-600"
          >
            Logout
          </button>
        </div>
      </nav>
  );
};

export default Navbar;