import axios from "axios";

const API = axios.create({
  baseURL: "https://bellcorp-event-management-api.onrender.com",
});

export default API;
