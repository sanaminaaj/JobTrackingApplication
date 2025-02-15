import React, { useEffect, useState } from "react";
import "./DisplayJob.css";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function DisplayJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(null); // Initially null to handle async updates
  const collectionJob = collection(db, "jobs");
  const [currentUserId,setCurrentUserId]=useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setIsCompany(userDoc.data().role === "company"); // Boolean assignment
          
          setCurrentUserId(user.uid); // Store logged-in user ID

        } else {
          setIsCompany(false); // Default to "user" if document does not exist

        }
      } else {
        setIsCompany(false); // If no user is logged in
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
      setLoading(false);
      setJobs(
        fetch.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id)); // Deletes job from Firestore
      setJobs(jobs.filter((job) => job.id !== id)); // Removes job from UI
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = async (id) => {};

  return (
    <div>
      <h2>Jobs Portal</h2>
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
                (isCompany && currentUserId === d.postedBy  ? (
                  <div className="buttons">
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="delete"
                    >
                      Delete
                    </button>
                    <button onClick={() => handleEdit(d.id)} className="edit">
                      Edit
                    </button>
                  </div>):"" )}
                {!isCompany?<button className="edit">Apply</button>:""}
            </div>
          );
        })
      )}
    </div>
  );
}
