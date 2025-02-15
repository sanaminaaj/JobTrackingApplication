import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import "./Navbar.css";
import Login from "./Login";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <h2>Job Portal</h2>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/displayJob">Jobs</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Home;
