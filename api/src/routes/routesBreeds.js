const express = require('express');
const breeds = express.Router();
const { Temperament, Dog } = require('../db');
const { getAllDogs } = require('../controllers/dogControllers');

breeds.use(express.json());

// Ruta para obtener todos los grupos de razas
breeds.get('/breedGroups' /* http://localhost:3001/breedGroups */, async (req, res) => {
    try {
        const everyDog = await getAllDogs();
        const everyBreedGroup = everyDog?.map((dog) => {
            if (!dog.breed_group) {
                return "No info"; // Retorna "No info" si no hay información de grupo de raza
            } else {
                return dog.breed_group;
            }
        });
        const eachBreedGroup = [...new Set(everyBreedGroup.flat())];
        res.status(200).json(eachBreedGroup.sort()); // Devuelve los grupos de razas únicos ordenados al cliente
    } catch (error) {
        console.log(error, "Error on breeds route");
        res.status(500).json({ error: "Internal server error" });
    }
});

// Ruta para obtener las razas dentro de un grupo específico
breeds.get('/breedGroup' /* http://localhost:3001/breedGroup?breedGroup=Hound */, async (req, res) => {
    const breedGroup = req.query.breedGroup;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (breedGroup === 'all') return true; // Devuelve todas las razas si breedGroup es 'all'
        else if (dog.breed_group !== undefined) {
            return dog.breed_group.toLowerCase().includes(breedGroup.toLowerCase());
        }
    });
    res.status(200).json(dogSearchResult); // Devuelve las razas que pertenecen al grupo especificado
});

module.exports = breeds;
