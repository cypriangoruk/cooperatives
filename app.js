const express = require("express");
const app = express();
const port = Number(process.env.PORT) || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userController = require("./controllers/user");
const authController = require("./controllers/auth");
const resourceController = require("./controllers/resource");

// Łączenie z bazą danych MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/projekt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Wiadomość w konsoli po ustanowieniu połączenia z bazą danych
db.once("open", () => {
  console.log("Połączenie z bazą danych MongoDB ustanowione!");
});

// Użycie middleware'u body-parser
app.use(bodyParser.json());
app.post("/resources", resourceController.addResource);
app.patch("/resources/:id", resourceController.updateResource);
app.delete("/resources/:id", resourceController.deleteResource);

// Endpoint dla strony głównej
app.get("/", (req, res) => {
  res.send("Strona działa!");
});

// Użycie kontrolerów dla endpointów
app.use("/users", userController);
app.use("/auth", authController);

// Uruchomienie serwera na wybranym porcie
app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie: ${port}!`);
});
