import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  NavLink,
  Link,
  Route,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/Signup";
import Dashboard from "./pages/Home/Dashboard.jsx";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Defaults Route*/} <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interview-prep/:sessionId"
            element={<InterviewPrep />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
