require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const menuItem = require("./models/menuItem");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conntect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Connection error: ', err));

// Routes


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});