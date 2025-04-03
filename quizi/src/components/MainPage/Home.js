import React, { useState, useEffect } from "react";
import "./Home.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
// import authService from "../../services/auth";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home_container">
      <div className="header">
        <div className="logo">Quizi</div>
        <div className="search_container">
          <input
            type="text"
            placeholder="Пошук"
            className="search_input"
          ></input>
          <button className="search_button"></button>
        </div>
        <div className="userControls">
          <button className="addNewQuiz">+</button>
          <button className="userCabinet">UserNickname</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
