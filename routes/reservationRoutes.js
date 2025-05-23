const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const verifyToken = require("../middleware/verifyToken")

// Create a new table reservation (public route)
router.post("/", async (req, res) => {
    const { name, email, partySize, dateTime, specialRequest } = req.body;

    // Validate input
    if (!name || !email || !partySize || !dateTime) {
        return res.status(400).json({ error: 'Required fields are missing.' });
    }

    try {
        const newReservation = new Reservation({
            name,
            email,
            partySize,
            dateTime,
            specialRequest
        });

        await newReservation.save();
        res.status(201).json({ message: "Reservation created successfully.", newReservation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to view 

module.exports = router;