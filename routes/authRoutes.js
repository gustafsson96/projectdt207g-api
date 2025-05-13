/* Routes for authentication */

require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import User model
const User = require("../models/user");

// Login route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate user input by ensuring username is a string of at least 3 characters
        if (typeof username !== "string" || username.trim().length < 3) {
            return res.status(400).json({ error: "Username must be at least 3 characters long." });
        }

        // Validate user input by ensuring password is a string of at least 6 characters
        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        // Check if user exists
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Check if password matches hashed password stored in the database
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {

        if (password !== user.password) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }

        // Create JWT token if the password matches
        const payload = { username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful!",
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;