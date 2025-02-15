import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from "./Register";
import Login from "./Login";
import Job from "./Job";
import DisplayJob from "./DisplayJob";
import Admin from "./Admin";
import Home from "./Home";
function App() {
  return (
    <div>
    <Router>
    <Home /> 

    <Routes>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/job" element={<Job></Job>}></Route>
      <Route path="/displayJob" element={<DisplayJob></DisplayJob>}></Route>
      <Route path="/admin" element={<Admin></Admin>}></Route>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
