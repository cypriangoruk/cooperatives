const mongoose = require("mongoose");

// Importujemy schemat do modelu zasobu
const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  tags: [String],
});

// Tworzymy model na podstawie schematu
// Nazwa 'Resource' jest nazwą kolekcji w bazie danych, w której zostaną zapisane dokumenty.
const Resource = mongoose.model("Resource", resourceSchema);

// Eksportujemy utworzony model
module.exports = Resource;
