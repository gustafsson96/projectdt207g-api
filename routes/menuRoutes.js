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