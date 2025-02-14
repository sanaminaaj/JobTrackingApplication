
import React, { useState } from "react";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "./Firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User Registered!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out!");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isRegister ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </button>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Auth;
