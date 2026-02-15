import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h3 style={styles.logo}>Bellcorp Events</h3>

      {/* ⭐ Hamburger Button */}
      <div style={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* ⭐ Links */}
      <div className={`nav-links ${open ? "show" : ""}`} style={styles.links}>
        <Link style={styles.link} to="/">
          Events
        </Link>
        <Link style={styles.link} to="/dashboard">
          Dashboard
        </Link>

        {!token ? (
          <Link style={styles.link} to="/login">
            Login
          </Link>
        ) : (
          <span
            style={{ ...styles.link, cursor: "pointer", color: "#f87171" }}
            onClick={handleLogout}
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#111",
    color: "white",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "relative",
  },

  logo: {
    margin: 0,
    fontWeight: "600",
  },

  hamburger: {
    fontSize: "22px",
    cursor: "pointer",
    display: "none",
  },

  links: {
    display: "flex",
    gap: "15px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },

  showMenu: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "10px",
  },
};
