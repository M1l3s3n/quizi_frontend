import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [action, setAction] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authService.handle_login(username, password);
    if (response) {
      navigate("/home");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.handle_signup(username, password);
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.error("error:", error);
    }
  };


  const signupLink = () => {
    setAction("active");
  };

  const loginLink = () => {
    setAction("");
  };


  return (
    <div className="container">
      <div className="image_box">
        <img src="/images/image.png" className="loginImage" />
      </div>

      <div className="form_container">
        <div className="logo_box">
          <h1 className="logo_name">Quizi</h1>
        </div>
        <div className={`wrapper ${action}`}>
          <div className="form_box login">
            <h2>Sign In</h2>
            <form id="logForm" onSubmit={handleLogin}>
              <input
                type="text"
                id="log_username"
                placeholder="Login"
                className="customInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                id="log_password"
                placeholder="Password"
                className="customInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="block">
                <button type="submit" className="submitBtn">
                  Sign in
                </button>
                <div className="signup_link">
                  New to Quizi?{" "}
                  <button
                    type="button"
                    onClick={signupLink}
                    className="signupBtn"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="form_box signup">
            <h2>Sign Up</h2>
            <form id="regForm" onSubmit={handleSignup}>
              <input
                type="text"
                id="username"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="block">
                <button type="submit" className="submitBtn">
                  Sign up
                </button>
                <div className="login_link">
                  Already with Quizi?{" "}
                  <button
                    type="button"
                    onClick={loginLink}
                    className="loginBtn"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
