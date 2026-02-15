const Event = require("../models/Event");
const Registration = require("../models/Registration");

// GET EVENTS with search + filters ⭐
exports.getEvents = async (req, res) => {
  const { search, category, location } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) query.category = category;
  if (location) query.location = location;

  const events = await Event.find(query).sort({ date: 1 });
  res.json(events);
};

// GET SINGLE EVENT
exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};

// REGISTER EVENT ⭐
exports.registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.availableSeats <= 0) {
    return res.status(400).json({ message: "Event full" });
  }

  const existing = await Registration.findOne({
    user: req.user._id,
    event: event._id,
  });

  if (existing) {
    return res.status(400).json({ message: "Already registered" });
  }

  await Registration.create({
    user: req.user._id,
    event: event._id,
  });

  event.availableSeats -= 1;
  await event.save();

  res.json({ message: "Registered successfully" });
};

// CANCEL REGISTRATION
exports.cancelRegistration = async (req, res) => {
  const registration = await Registration.findOne({
    user: req.user._id,
    event: req.params.id,
  });

  if (!registration) {
    return res.status(404).json({ message: "Registration not found" });
  }

  await registration.deleteOne();

  const event = await Event.findById(req.params.id);
  event.availableSeats += 1;
  await event.save();

  res.json({ message: "Registration cancelled" });
};

// MY EVENTS (Dashboard)
exports.getMyEvents = async (req, res) => {
  const registrations = await Registration.find({
    user: req.user._id,
  }).populate("event");

  const events = registrations.map((r) => r.event);
  res.json(events);
};
