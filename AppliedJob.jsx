import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./DisplayJob.css";
export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          setIsAdmin(role === "admin");
          setUserId(user.uid);
          fetchAppliedJobs(role, user.uid);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAppliedJobs = async (role, userId) => {
    let q;
    if (role === "admin") {
      q = collection(db, "applications"); // Admin sees all applications
    } else {
      q = query(collection(db, "applications"), where("userId", "==", userId)); // User sees only their applied jobs
    }

    const appliedCollection = await getDocs(q);
    const jobsData = await Promise.all(
      appliedCollection.docs.map(async (docSnap) => {
        const jobData = docSnap.data();
        const jobRef = await getDoc(doc(db, "jobs", jobData.jobId));
        return { id: docSnap.id, ...jobRef.data(), applicationId: docSnap.id };
      })
    );

    setAppliedJobs(jobsData);
    setLoading(false);
  };

  const handleWithdraw = async (applicationId) => {
    await deleteDoc(doc(db, "applications", applicationId));
    setAppliedJobs(appliedJobs.filter((job) => job.applicationId !== applicationId));
    alert("Application Withdrawn Successfully!");
  };

  return (
    <div>
      <h2>{isAdmin ? "All Applied Jobs" : "My Applied Jobs"}</h2>
      {loading ? <h2>Loading...</h2> : 
        appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <div key={job.jobId} className="job">
              <h3>{job.jobTitle}</h3>
              <h4>{job.company}</h4>
              <div><span>{job.location}</span>    <p style={{color: "black"}}>Rs. {job.salary}</p>
              </div>
              {!isAdmin && (
                <button onClick={() => handleWithdraw(job.applicationId)} className="view-applied-btn">Withdraw</button>
              )}
            </div>
          ))
        ) : (
          <h3 style={{marginTop:"30px"}}>No applied jobs found.</h3>
        )}
    </div>
  );
}
