import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

// Configured at build time. Without it the form refuses to submit rather than
// posting credentials to a hardcoded localhost endpoint.
const AUTH_URL = process.env.REACT_APP_AUTH_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!AUTH_URL) {
      setError("Sign-in isn't available on this deployment.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate("/drishyam_home");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-card">
      <div className="login-card-content">
        <span className="login-title">Login</span>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            className="username"
            type="text"
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="username"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error" role="alert">{error}</p>}

          <button type="submit" className="login-button" disabled={busy}>
            {busy ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
