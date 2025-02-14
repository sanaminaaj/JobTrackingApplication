import React, { useState } from "react";
import { db } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Job.css";

const Job = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary,setSalary]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "jobs"), {
      jobTitle,
      company,
      salary
    });
    setJobTitle("");
    setCompany("");
    setSalary("");
  };

  return (
    <div className="job-container">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
        <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />

        <button type="submit" className="submit">Add Job</button>
      </form>
    </div>
  );
};

export default Job;
