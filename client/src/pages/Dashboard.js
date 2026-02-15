import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/events/my-events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const today = new Date();

  const upcoming = events.filter((e) => new Date(e.date) > today);

  const past = events.filter((e) => new Date(e.date) < today);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* ⭐ Summary Cards */}
      <div className="summary">
        <div className="summary-card">
          <h3>{events.length}</h3>
          <p>Total Registered</p>
        </div>

        <div className="summary-card">
          <h3>{upcoming.length}</h3>
          <p>Upcoming Events</p>
        </div>

        <div className="summary-card">
          <h3>{past.length}</h3>
          <p>Past Events</p>
        </div>
      </div>

      {/* ⭐ Upcoming Events */}
      <h3>Upcoming Events</h3>
      {upcoming.map((e) => (
        <div key={e._id} className="event-card">
          <strong>{e.name}</strong>
          <p>{new Date(e.date).toDateString()}</p>
        </div>
      ))}

      {/* ⭐ Past Events */}
      <h3>Past Events</h3>
      {past.map((e) => (
        <div key={e._id} className="event-card">
          <strong>{e.name}</strong>
          <p>{new Date(e.date).toDateString()}</p>
        </div>
      ))}
    </div>
  );
}
