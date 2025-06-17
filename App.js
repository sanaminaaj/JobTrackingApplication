import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Job from "./Job";
import DisplayJob from "./DisplayJob";
import Admin from "./Admin";
import Home from "./Home";
import AppliedJobs from "./AppliedJob";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job" element={<Job />} />
          <Route path="/displayJob" element={<DisplayJob />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
