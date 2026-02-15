import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", { name, email, password });

      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully 🎉");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            required
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <input
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button type="submit">Register</button>
        </form>

        {/* ⭐ Login Navigation */}
        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#2563eb", cursor: "pointer", fontWeight: "bold" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
