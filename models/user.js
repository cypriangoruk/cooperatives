// Importujemy bibliotekę mongoose
const mongoose = require("mongoose");

// Definicja schematu dla modelu User
const userSchema = new mongoose.Schema({
  name: String, // Pole nazwy użytkownika
  email: String, // Pole adresu email użytkownika
  password: String, // Pole hasła użytkownika
});

// Eksportujemy model User
module.exports = mongoose.model("User", userSchema);
