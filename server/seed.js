require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const events = [
  {
    name: "React Conference",
    organizer: "Bellcorp",
    location: "Hyderabad",
    date: new Date("2026-03-01"),
    description: "Learn advanced React concepts.",
    capacity: 50,
    availableSeats: 50,
    category: "Tech",
  },
  {
    name: "Startup Networking",
    organizer: "Innovators Hub",
    location: "Bangalore",
    date: new Date("2026-03-05"),
    description: "Meet startup founders.",
    capacity: 30,
    availableSeats: 30,
    category: "Business",
  },
  {
    name: "AI Workshop",
    organizer: "Tech Minds",
    location: "Hyderabad",
    date: new Date("2026-03-10"),
    description: "Hands-on AI session.",
    capacity: 40,
    availableSeats: 40,
    category: "Tech",
  },
  {
    name: "Design Meetup",
    organizer: "Creative Club",
    location: "Chennai",
    date: new Date("2026-03-15"),
    description: "UI/UX discussions.",
    capacity: 25,
    availableSeats: 25,
    category: "Design",
  },
];

// ⭐ duplicate more events automatically
const generateMoreEvents = () => {
  let more = [];
  for (let i = 1; i <= 16; i++) {
    more.push({
      name: `Tech Event ${i}`,
      organizer: "Bellcorp",
      location: i % 2 === 0 ? "Hyderabad" : "Bangalore",
      date: new Date(`2026-04-${i + 1}`),
      description: "Professional tech event.",
      capacity: 20 + i,
      availableSeats: 20 + i,
      category: i % 2 === 0 ? "Tech" : "Business",
    });
  }
  return more;
};

const seedData = async () => {
  try {
    await connectDB();

    await Event.deleteMany();
    await Event.insertMany([...events, ...generateMoreEvents()]);

    console.log("🌱 Events Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
