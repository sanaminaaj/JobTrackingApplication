import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <div className="features-container">
      <h2>Why Use Our Job Portal?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>🔍 Find Jobs</h3>
          <p>Explore thousands of job opportunities across different fields.</p>
        </div>
        <div className="feature-card">
          <h3>📤 Apply Easily</h3>
          <p>Submit applications with just one click.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Track Applications</h3>
          <p>Monitor your job application status in real-time.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
