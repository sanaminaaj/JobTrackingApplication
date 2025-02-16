import React, {  useEffect, useState } from "react";
import "./DisplayJob.css";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

export default function DisplayJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(null); // Initially null to handle async updates
  const collectionJob = collection(db, "jobs");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setIsCompany(userDoc.data().role === "company"); // Boolean assignment
          setIsUser(userDoc.data().role === "user");
          setCurrentUserId(user.uid); // Store logged-in user ID
        } else {
          setIsCompany(false);
          // Default to "user" if document does not exist
        }
      } else {
        setIsCompany(false);
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  // Debugging: Log whenever isCompany changes
  useEffect(() => {
    console.log("Updated isCompany:", isCompany);
  }, [isCompany]);

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await getDocs(collectionJob);
      setJobs(
        fetch.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    };
  
    const fetchAppliedJobs = async () => {
      if (!currentUserId) return; // 
    
      const q = query(
        collection(db, "applications"),
        where("userId", "==", currentUserId)
      );
    
      const appliedCollection = await getDocs(q);
    
      const validAppliedJobs = [];
    
      for (const docSnap of appliedCollection.docs) {
        const jobId = docSnap.data().jobId;
        const jobDoc = await getDoc(doc(db, "jobs", jobId));
    
        if (jobDoc.exists()) {
          validAppliedJobs.push(jobId);
        } else {
          // Remove application from Firestore if job was deleted
          await deleteDoc(doc(db, "applications", docSnap.id));
        }
      }
    
      setAppliedJobs(validAppliedJobs);
    };
    
    fetchData();
    fetchAppliedJobs();
  }, [currentUserId]); 
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id)); // Deletes job from Firestore
      setJobs(jobs.filter((job) => job.id !== id)); // Removes job from UI
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  const applyForJob = async (d) => {
    if (appliedJobs.includes(d.jobId)) {
      alert("You have already applied for this job.");
      return;
    }
    await addDoc(collection(db, "applications"), {
      userId: currentUserId,
      jobId: d.id,
      company: d.company,  //  Pass company name
      salary: d.salary,    //  Pass salary
      jobTitle: d.jobTitle,
      location: d.location,
      status: "Applied",
    });
    setAppliedJobs([...appliedJobs, d.id]);
    alert("Job Applied Successfully");
  };


  return (
    <div>
      <h2>Jobs Portal</h2>
      {!isCompany && isUser ? (
        <Link to="/applied-jobs">
          <button className="view-applied-btn">View Applied Jobs</button>
        </Link>
      ) : (
        ""
      )}
      {loading ? (
        <h2>loading...</h2>
      ) : (
        jobs.map((d) => {
          return (
            <div className="job" key={d.id}>
              <h2>{d.jobTitle}</h2>

              <div>
                <h3>
                  <b>{d.company}</b>
                </h3>

                <span>Rs.{d.salary}</span>
              </div>
              <div>
                <h5>{d.location}</h5>
                <button className={`location ${d.time}`}>{d.time}</button>
              </div>

              {/* Only render buttons if isCompany is NOT null */}
              {isCompany !== null &&
                (isCompany && currentUserId === d.postedBy ? (
                  <div className="buttons">
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="delete"
                    >
                      Delete
                    </button>

                    
                  </div>
                ) : (
                  ""
                ))}
              {!isCompany && isUser ? (
                <button className="edit" onClick={() => applyForJob(d)} disabled={appliedJobs.includes(d.id)} >
                  Apply
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
