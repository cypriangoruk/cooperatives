const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

// Importujemy schemat User z pliku models/user

// Tworzymy endpoint POST, który pozwala na dodanie nowego użytkownika
router.post("/", (req, res) => {
  // Tworzymy nowy obiekt użytkownika na podstawie danych przesłanych w żądaniu
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Zapisujemy nowego użytkownika do bazy danych
  user.save((err) => {
    if (err) {
      // Jeśli wystąpi błąd, zwracamy kod błędu 500 i wiadomość błędu
      res.status(500).send(err);
    } else {
      // W przeciwnym razie zwracamy utworzonego użytkownika
      res.send(user);
    }
  });
});

// Tworzymy endpoint GET, który pozwala na pobranie wszystkich użytkowników
router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      // Jeśli wystąpi błąd, zwracamy kod błędu 500 i wiadomość błędu
      return res.status(500).send(err);
    }
    // W przeciwnym razie zwracamy pobranych użytkowników
    return res.send(users);
  });
});

// Funkcja addUser tworzy nowy obiekt typu User na podstawie danych z requestu i zapisuje go do bazy danych.
const addUser = async (req, res) => {
  // Tworzenie nowego obiektu typu User na podstawie danych z requestu
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    // Zapisywanie nowego użytkownika do bazy danych
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = addUser;

// Funkcja updateUser aktualizuje dane użytkownika w bazie danych na podstawie identyfikatora użytkownika i danych z requestu.
const updateUser = async (req, res) => {
  // Tablica z nazwami pola, które chcemy zaktualizować
  const updates = Object.keys(req.body);
  // Tablica z dozwolonymi nazwami pól do zaktualizowania
  const allowedUpdates = ["name", "email", "password"];
  // Sprawdzenie, czy wszystkie pola, które chcemy zaktualizować, są dozwolone
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    // Jeśli nie wszystkie pola są dozwolone, wysyłamy odpowiedź z błędem
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // Wyszukanie użytkownika na podstawie identyfikatora i aktualizacja danych
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      // Jeśli użytkownik o podanym identyfikatorze nie zostanie znaleziony, wysyłamy odpowiedź z kodem 404
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  addUser,
  updateUser,
};

// Eksportujemy nasz router, aby można było go użyć w pliku app.js
module.exports = router;
