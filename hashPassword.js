// File to hash passwords before storing in MongoDB Atlas manually
const bcrypt = require("bcryptjs");

const plainPassword = "password";
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});