import React,{useState} from 'react'
import "./Login.css"
import {auth} from "./Firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from "react-toastify";
export default function Login() {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async(e) => {
      e.preventDefault();
          try{
            await signInWithEmailAndPassword(auth,formData.email,formData.password);
            toast.success("login successful", { autoClose: 3000 });
          }
          catch(err){
            console.log("err:"+err);
            toast.error("Error:"+err, { autoClose: 3000 });
            
          }
        
    }
  return (
    <div className='login'>
      <h2>Login</h2>
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
        <button type="submit" className="submit">Login</button>
        <p>Not Registered? <Link to="/register">Register</Link></p>
        <ToastContainer></ToastContainer>
        </form>
    </div>
  )
}
