import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";
// import home from "./components/mainPage/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        {/* <Route path="/home" element={<home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
