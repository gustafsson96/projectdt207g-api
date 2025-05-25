// Load environment variables from .env
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Conntect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Connection error: ', err));

// Simple API welcome message (root route)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my project API :-)" });
});

// API roures
app.use("/admin", authRoutes);
app.use("/menu", menuRoutes);
app.use("/reservation", reservationRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});