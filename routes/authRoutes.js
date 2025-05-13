/* Routes for authentication */

require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import User model
const User = require("../models/user");
