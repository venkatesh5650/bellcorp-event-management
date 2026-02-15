import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

import API from "../services/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // ⭐ Fetch Events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await API.get(
        `/events?search=${search}&category=${category}&location=${location}`,
      );
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [search, category, location]);

  // ⭐ Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchEvents]);

  const handleRegister = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/events/register/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Registered successfully 🎉");

      fetchEvents(); // refresh seats
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="events-wrapper">
      <div style={{ padding: "20px" }}>
        <h1>Events</h1>
        <div className="filter-bar">
          {/* Search */}
          <input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
          </select>

          {/* Location Filter */}
          <select onChange={(e) => setLocation(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <hr />

        {/* Event List */}
        <div className="events-grid">
          {events.map((event) => (
            <div className="card" key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.location}</p>
              <p>{new Date(event.date).toDateString()}</p>
              <p>Seats Left: {event.availableSeats}</p>
              <button
                disabled={event.availableSeats === 0}
                onClick={() => handleRegister(event._id)}
              >
                {event.availableSeats === 0 ? "Sold Out" : "Register"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
