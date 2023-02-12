const jwt = require("jsonwebtoken"); // importuj bibliotekę do tworzenia i sprawdzania tokenów JWT
const User = require("../models/user"); // importuj model użytkownika z pliku user.js

module.exports = async (req, res, next) => {
  try {
    // Pobierz token z nagłówka Authorization
    const token = req.header("Authorization").replace("Bearer ", "");
    // Zweryfikuj token z użyciem tajnego klucza (process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Wyszukaj użytkownika po ID (decoded._id) i sprawdź czy token jest na liście tokenów użytkownika ('tokens.token': token)
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // Jeśli użytkownik nie został znaleziony, rzuć błąd
    if (!user) {
      throw new Error();
    }

    // Dodaj użytkownika i token do obiektu żądania
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    // Jeśli wystąpi jakikolwiek błąd (np. nieprawidłowy token), zwróć kod 401 Unauthorized z komunikatem
    res.status(401).send({ error: "Please authenticate." });
  }
};
