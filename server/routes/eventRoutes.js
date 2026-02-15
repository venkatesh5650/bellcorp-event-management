const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getEvents,
  getEventById,
  registerEvent,
  cancelRegistration,
  getMyEvents,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/my-events", protect, getMyEvents);
router.get("/:id", getEventById);

router.post("/register/:id", protect, registerEvent);
router.delete("/cancel/:id", protect, cancelRegistration);

module.exports = router;
