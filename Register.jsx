import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./Firebase";

import "./Register.css";
import { toast,ToastContainer } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"user"
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const userCredential=await createUserWithEmailAndPassword(auth,formData.email,formData.password);
      const user=userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        role: formData.role,  // 'company' or 'job-seeker'
      });
      setFormData({email:"",password:"",role:"user"})
      toast.success("successful", { autoClose: 3000 });
    }
    catch(err){
      console.log("err:"+err);
      toast.error("Error:"+err, { autoClose: 3000 });

    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <select onChange={handleChange} name="role" value={formData.role}>
          <option value="user">User</option>
          <option value="company">Company</option>
        </select>
        
        <button type="submit" className="submit">Sign Up</button>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
