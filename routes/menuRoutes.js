const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");
const jwt = require("jsonwebtoken");

// Middleware to verify token
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Token

    if (!token) {
        return res.status(401).json({ message: " Access token is missing." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

// Get all menu items (public route)
router.get("/", async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Create new menu items (protected route)
router.post("/", verifyToken, async (req, res) => {
    const { name, ingredients, price, vegan_alternative, category } = req.body;

    // Validate input
    if (!name || !ingredients || !price || !category ) {
        return res.status(400).json({ message: "Name, ingredients, price and category are required." });
    }

    try {
        const newMenuItem = new MenuItem({
            name,
            ingredients,
            price,
            vegan_alternative,
            category
        });

        await newMenuItem.save();
        res.status(201).json({ message: "Menu item created successfully!", newMenuItem });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update menu item by ID (protected route)
router.put("/:id", verifyToken, async (req, res) => {
    const { name, ingredients, price, vegan_alternative, category } = req.body;

    // Validate input
    if (!name || !ingredients || !price || !category) {
        return res.status(400).json({ message: "Name, ingredients, price and category are required." });
    }

    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            { name, ingredients, price, vegan_alternative, category },
            { new: true } // Return updated document
        );

        if (!updatedMenuItem) {
            return res.status(404).json({ message: "Menu item not found." });
        }

        res.json({ message: "Menu item updated successfully!", updatedMenuItem });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete menu item by ID (protected route)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!deletedMenuItem) {
            return res.status(404).json({ message: "Menu item not found." });
        }

        res.json({ message: "Menu item deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
