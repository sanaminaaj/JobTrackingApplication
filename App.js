import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from "./Register";
import Login from "./Login";
import Job from "./Job";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/register" element={<Register></Register>}>
      </Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/job" element={<Job></Job>}></Route>
    </Routes>
    </Router>

  );
}

export default App;
