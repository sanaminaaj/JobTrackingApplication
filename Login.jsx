import React,{useState} from 'react'
import "./Login.css"
import {auth,db} from "./Firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc,getDoc} from "firebase/firestore"
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const nav=useNavigate();
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
            const user = auth.currentUser;
            if (user) {
              const userDoc = await getDoc(doc(db, "users", user.uid));
              if (userDoc.exists() && userDoc.data().role === "company") {
                nav("/admin")
              }
              else if(userDoc.exists() && userDoc.data().role === "user"){
                nav("/displayJob");
              }
            }
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
