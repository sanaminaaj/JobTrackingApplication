import React, { useState,useEffect } from "react";
import { collection, addDoc,doc } from "firebase/firestore";
import "./Job.css";
import { useNavigate } from "react-router-dom";
import {  getDoc } from "firebase/firestore";
import { db, auth } from "./Firebase";

const Job = () => {
  
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary,setSalary]=useState("");
  const [location,setLocation]=useState("");
    const [isCompany,setIsCompany]=useState(false);
  
  const [time,setTime]=useState("internship");
  const nav=useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "jobs"), {
      jobTitle,
      company,
      salary,
      location,
      time,
      postedBy:user.uid
    });
    setJobTitle("");
    setCompany("");
    setSalary("");
    setLocation("");
    setTime("internship");
    nav("/displayJob");
  };
useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "company") {
          setIsCompany(true);
        } else {
          alert("Access denied! Only companies can post jobs.");
          nav("/");
        }
      } else {
        alert("Please log in first!");
        nav("/login"); // Redirect to login if not logged in
      }
    };
    checkUserRole();
  },[nav]);
  if (!isCompany) return null; // Don't render if the user is not a company

  return (
    <div className="job-container">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
        <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <select value={time} onChange={(e)=>setTime(e.target.value)} required>
          <option value="internship">internship</option>
          <option value="fulltime">fulltime</option>
          <option value="parttime">parttime</option>
        </select>
        <button type="submit" className="submit">Add Job</button>
      </form>
    </div>
  );
};

export default Job;
