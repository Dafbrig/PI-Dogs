const express = require('express');
const temperaments = express.Router();
const { Temperament } = require('../db');
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getAllDogs } = require('../controllers/dogControllers');

temperaments.use(express.json());

// Ruta para obtener todos los temperamentos existentes
temperaments.get('/temperament', async (req, res) => {
    const allData = await axios.get(URL);
    try {
        let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        // Set para obtener valores únicos
        let eachTemperament = [...new Set(everyTemperament.flat())];
        eachTemperament.forEach(async el => {
            if (el) { // Si existe el temperamento
                await Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });
        eachTemperament = await Temperament.findAll();
        res.status(200).json(eachTemperament);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Ruta para obtener perros por temperamento
temperaments.get('/dog/', async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (temperament === 'all') return everyDog;
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase());
        }
    });
    res.status(200).json(dogSearchResult);
});

// Ruta para agregar un nuevo temperamento
temperaments.post('/temperament/:temperament', async (req, res) => {
    try {
        const newTemperament = req.params.temperament;
        const postedTemp = await Temperament.create({
            name: newTemperament,
        });
        res.status(201).json(postedTemp);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = temperaments;