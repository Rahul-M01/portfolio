import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/drishyam_home");
      } else {
        alert("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-card">
        <div className="login-card-content">
            <span class="login-title">Login</span>
            <form class="login-form" onSubmit={handleLogin}>
                    <label for="username">Username</label>
                    <input
                      class="username"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <label for="password">Password</label>
                    <input
                      class="username"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
