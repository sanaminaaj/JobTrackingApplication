import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <h1>Find Your Dream Job</h1>
      <p>Explore opportunities, apply easily, and track your applications.</p>
      <button onClick={() => window.location.href = "/displayJob"} className="explore-btn">Browse Jobs</button>
    </div>
  );
};

export default Hero;
