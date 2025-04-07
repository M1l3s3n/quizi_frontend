import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Home from "./components/MainPage/Home";
import Creater from "./components/CreaterPage/Creater";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create_quiz" element={<Creater />} />
      </Routes>
    </Router>
  );
}

export default App;