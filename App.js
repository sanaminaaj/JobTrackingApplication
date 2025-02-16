import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from "./Register";
import Login from "./Login";
import Job from "./Job";
import DisplayJob from "./DisplayJob";
import Admin from "./Admin";
import Home from "./Home";
import AppliedJobs from "./AppliedJob";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";

function App() {
  return (
      <div>
        <Router>

        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job" element={<Job />} />
          <Route path="/displayJob" element={<DisplayJob />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
        </Routes>
        </Router>
      </div>
  );
}

export default App;
