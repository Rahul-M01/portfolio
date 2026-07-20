import React from "react";
import { Navigate } from "react-router-dom";

// NOTE: this is a UI convenience, not a security boundary. Anything rendered
// behind it still ships in the public JS bundle, and a client-side check can
// be bypassed trivially. Real protection has to be enforced server-side by the
// API that serves the data.
//
// Reads an httpOnly session cookie set by the auth endpoint rather than a
// token in localStorage, so the credential isn't readable by injected script.
const ProtectedRoute = ({ children }) => {
  const hasSession =
    typeof document !== "undefined" && document.cookie.includes("session");

  return hasSession ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
