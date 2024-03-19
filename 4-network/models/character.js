const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  name: String,
  status: String,
  species: String,
  gender: String,
  origin: {
    name: String,
    url: String,
  },
  location: {
    name: String,
    url: String,
  },
  image: String,
  created: Date,
  url: String,
});

const Character = model('Character', characterSchema);

module.exports = Character;
