# ⭐ Bellcorp Event Management Application

A full-stack Event Management platform built using the **MERN Stack** that allows users to explore events, register securely, and manage their participation through a responsive dashboard.

This project was developed as part of the **Bellcorp Engineering Assignment**, focusing on scalable architecture, clean UI/UX, and real-world application design.

---

## 🚀 Live Demo

Frontend: **[Add your deployed frontend link]**  
Backend API: **[Add your deployed backend link]**

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js (Hooks + Functional Components)
- React Router DOM
- Axios
- React Hot Toast (Non-blocking notifications)
- Responsive CSS (Mobile + Desktop)

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs Password Hashing
- REST API Architecture

### Database
- MongoDB with Mongoose ODM

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT-based protected routes
- Secure password encryption

### 📅 Event Discovery
- Browse dynamic event listings
- Debounced search functionality
- Filter by category and location
- Responsive grid layout

### 🎟️ Event Registration
- Register and cancel events
- Seat availability tracking
- Backend validation for duplicate registrations
- Industry-style toast notifications

### 📊 User Dashboard
- View registered events
- Upcoming vs Past event categorization
- Summary cards UI

### 📱 Responsive UI
- Mobile-friendly navbar with hamburger menu
- Modern card-based layout
- Clean and minimal UX

---

## 🧱 Project Structure

```
root/
├── server/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── client/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js
```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd bellcorp-event-management

### 2️⃣ Backend Setup
```
cd server
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend:
npm run dev

```

### 3️⃣ Frontend Setup

```
cd client
npm install
npm start
```

### 🧪 API Example
Protected route example:

```
POST /api/events/register/:id
Authorization: Bearer <TOKEN>

```

### 🧠 Engineering Highlights

- Debounced search implemented to reduce API calls.
- Modular backend architecture (controllers, routes, middleware).
- Non-blocking toast notifications for better UX.
- Responsive grid-based UI design.
- Secure JWT authentication flow.

### 🎥 Project Walkthrough

Video Demo Link: [Add your Google Drive or YouTube link]

### 📌 Future Improvements

- Admin panel for event management
- Pagination / Infinite scroll
- Image upload support
- Real-time seat updates

### 👨‍💻 Author

Venkatesh Karthan
MERN Stack Developer passionate about building scalable web applications.
