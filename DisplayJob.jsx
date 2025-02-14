import React, { useEffect, useState } from 'react'
import { db } from "./Firebase";
import { collection, getDocs} from "firebase/firestore";
export default function DisplayJob() {
    const [jobs,setJobs]=useState([]);
    const collectionJob=collection(db,"jobs");
    useEffect(()=>{
        const fetchData=async()=>{
            const fetch=await getDocs(collectionJob);
            setJobs(fetch.docs.map((doc)=>({
                ...doc.data(),id:doc.id
            })))
        }
        fetchData();
        console.log(jobs);
    },[])
  return (
    <div>
      
    </div>
  )
}
