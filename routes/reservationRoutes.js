const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const verifyToken = require("../middleware/verifyToken")

// Create a new table reservation (public route)
router.post("/", async (req, res) => {
    const { name, email, partySize, dateTime, specialRequest } = req.body;

    // Validate input
    if (!name || !email || !partySize || !dateTime) {
        return res.status(400).json({ message: 'Required fields are missing.' });
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

// Route to view reservations (protected)
router.get("/", verifyToken, async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ dateTime: 1 }); // Sort reservations in ascending order
        res.json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete reservation by ID (protected route)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        res.json({ message: "Reservation deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;