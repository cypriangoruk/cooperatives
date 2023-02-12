const Resource = require("../models/resource");

// Funkcja dodająca nowy zasób
const addResource = async (req, res) => {
  // Pobierz dane zasobu z żądania
  const resourceData = req.body;
  // Stwórz nowy zasób na podstawie pobranych danych
  const resource = new Resource(resourceData);
  try {
    // Zapisz nowy zasób w bazie danych
    await resource.save();
    res.status(201).send(resource);
  } catch (e) {
    // Wyslij odpowiedź z nowo utworzonym zasobem
    res.status(400).send(e);
  }
};

// Funkcja aktualizująca zasób
const updateResource = async (req, res) => {
  // Pobierz dane zasobu z żądania
  const resourceData = req.body;
  try {
    // Zaktualizuj istniejący zasób w bazie danych na podstawie jego ID i pobranych danych
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      resourceData,
      { new: true }
    );
    if (!resource) {
      return res.status(404).send();
    }
    // Wyslij odpowiedź z zaktualizowanym zasobem
    res.send(resource);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Funkcja usuwająca zasób
const deleteResource = async (req, res) => {
  try {
    // Usuń zasób o określonym ID z bazy danych
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).send();
    }
    // Wyslij odpowiedź z usuniętym zasobem
    res.send(resource);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { addResource, updateResource, deleteResource };
