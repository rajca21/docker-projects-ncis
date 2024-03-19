const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');

const Favorite = require('./models/favorite');
const Character = require('./models/character');
const { application } = require('express');

const app = express();

app.use(bodyParser.json());

app.get('/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json({
      favorites: favorites,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.post('/favorites', async (req, res) => {
  const favType = req.body.type;
  const favName = req.body.name;
  const favUrl = req.body.url;

  try {
    if (favType !== 'episode' && favType !== 'character') {
      throw new Error('"type" should be "episode" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error('Favorite exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});


app.post('/characters', async (req, res) => {
  const charName = req.body.name;
  const charStatus = req.body.status;
  const charSpecies = req.body.species;
  const charGender = req.body.gender;
  const charOrigin = req.body.origin;
  const charLocation = req.body.location;
  const charImage = req.body.image;
  const charCreated = req.body.created;
  const charUrl = req.body.url;

  try {
    // Provera postojanja lika
    const existingChar = await Character.findOne({ name: charName });
    if (existingChar) {
      throw new Error('Character exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  // Kreiranje novog lika
  const character = new Character({
    name: charName,
    status: charStatus,
    species: charSpecies,
    gender: charGender,
    origin: charOrigin,
    location: charLocation,
    image: charImage,
    created: charCreated,
    url: charUrl,
  });

  try {
    // Čuvanje lika u bazi podataka
    await character.save();
    res
      .status(201)
      .json({ message: 'Character saved!', character: character.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.status(200).json({ characters: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/episodes', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/episode');
    res.status(200).json({ episodes: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

mongoose.connect(
  'mongodb://mongodb:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);




