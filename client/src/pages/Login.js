import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ⭐ Normal Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🎉");

      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  // ⭐ DEMO LOGIN FUNCTION
  const handleDemoLogin = async () => {
    try {
      // 👉 Replace with demo user you created in LIVE DB
      const demoCredentials = {
        email: "demo@bellcorp.com",
        password: "demo123",
      };

      const res = await API.post("/auth/login", demoCredentials);

      localStorage.setItem("token", res.data.token);
      toast.success("Demo login successful 🚀");

      navigate("/");
    } catch (err) {
      toast.error("Demo account not found");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {/* ⭐ DEMO LOGIN BUTTON */}
        <button
          onClick={handleDemoLogin}
          style={{
            background: "#10b981",
            marginTop: "10px",
          }}
        >
          Demo Login
        </button>

        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
